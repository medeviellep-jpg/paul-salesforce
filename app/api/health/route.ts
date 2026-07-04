export const dynamic = "force-dynamic";

export async function GET() {
  const configured = !!(
    process.env.SALESFORCE_INSTANCE_URL &&
    process.env.SALESFORCE_CLIENT_ID &&
    process.env.SALESFORCE_CLIENT_SECRET &&
    process.env.ANTHROPIC_API_KEY
  );
  return Response.json({ status: "ok", configured });
}
