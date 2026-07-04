const SF_INSTANCE_URL = process.env.SALESFORCE_INSTANCE_URL ?? "";
const SF_CLIENT_ID = process.env.SALESFORCE_CLIENT_ID ?? "";
const SF_CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET ?? "";
const SF_API_VERSION = "v64.0";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export function parseAccountName(html: string | null): string {
  if (!html) return "Unknown Account";
  const match = html.match(/>([^<]+)<\/a>/);
  return match ? match[1].trim() : html;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: SF_CLIENT_ID,
    client_secret: SF_CLIENT_SECRET,
  });

  const res = await fetch(`${SF_INSTANCE_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Salesforce auth failed (${res.status}): ${err}`);
  }

  const data = await res.json() as { access_token: string; expires_in?: number };
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in ?? 3600) * 1000 - 60_000;
  return cachedToken;
}

export async function soqlQuery<T = Record<string, unknown>>(
  query: string
): Promise<{ records: T[]; totalSize: number }> {
  const token = await getAccessToken();
  const url = `${SF_INSTANCE_URL}/services/data/${SF_API_VERSION}/query?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`SOQL failed (${res.status}): ${err.slice(0, 300)}`);
  }

  return res.json() as Promise<{ records: T[]; totalSize: number }>;
}

export const DEAD_STAGES = [
  "Dead - Duplicate",
  "Dead - Lost",
  "Dead - No Decision",
  "Dead",
  "08 - Closed",
];

export const DEAD_STAGES_SQL = DEAD_STAGES.map((s) => `'${s}'`).join(", ");
