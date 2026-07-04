import { soqlQuery, parseAccountName, DEAD_STAGES_SQL } from "./sf-client";
import type { SFR } from "./sfr-types";

// ── Anthropic tool definitions (JSON Schema) ──────────────────────────────────

export const toolDefinitions = [
  {
    name: "list_opportunities",
    description:
      "List and filter active Agentforce SFRs (Specialist Forecast Records) from Salesforce, sorted and aggregated. Use for pipeline questions, top deals, and filtered lists.",
    input_schema: {
      type: "object" as const,
      properties: {
        min_amount: { type: "number", description: "Min forecast amount USD (default 200000)" },
        max_amount: { type: "number", description: "Max forecast amount USD" },
        forecast_status: {
          type: "array",
          items: { type: "string", enum: ["Commit", "Best Case", "Pipeline", "Omitted"] },
        },
        fiscal_quarter: { type: "string", description: "e.g. 'FY27 Q2'" },
        fiscal_year: { type: "string", description: "e.g. 'FY27'" },
        top_deal_only: { type: "boolean" },
        approved_budget_only: { type: "boolean" },
        close_before: { type: "string", description: "ISO date e.g. 2026-07-31" },
        close_after: { type: "string", description: "ISO date e.g. 2026-01-01" },
        account_name: { type: "string", description: "Partial account name filter" },
        sort_by: { type: "string", enum: ["amount", "close_date", "stage"] },
        limit: { type: "number", description: "Max records (default 20, max 100)" },
      },
    },
  },
  {
    name: "get_deal_details",
    description:
      "Get all fields for one specific Agentforce deal including narrative context, blockers, next steps, use cases. Use when the user asks about a named deal or account.",
    input_schema: {
      type: "object" as const,
      properties: {
        identifier: {
          type: "string",
          description: "SAF-XXXXXXXX, Salesforce record Id, or partial account name",
        },
      },
      required: ["identifier"],
    },
  },
  {
    name: "search_opportunities",
    description:
      "Full-text search across Agentforce SFR narrative fields. Use for keyword/topic searches across deal notes, use cases, challenges.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search term or phrase" },
        min_amount: { type: "number", description: "Min amount filter" },
        limit: { type: "number", description: "Max results (default 10)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_pipeline_stats",
    description:
      "Aggregated pipeline metrics grouped by a dimension. Use for overview, totals, distribution questions.",
    input_schema: {
      type: "object" as const,
      properties: {
        group_by: {
          type: "string",
          enum: ["forecast_status", "stage", "fiscal_quarter", "competitor"],
          description: "Grouping dimension (default: forecast_status)",
        },
        fiscal_year: { type: "string", description: "e.g. 'FY27'" },
        min_amount: { type: "number", description: "Min amount (default 200000)" },
      },
    },
  },
];

// ── Tool implementations ───────────────────────────────────────────────────────

async function listOpportunities(input: Record<string, unknown>) {
  const minAmount = (input.min_amount as number) ?? 200_000;
  const limit = Math.min((input.limit as number) ?? 20, 100);

  const conditions: string[] = [
    `RecordType.Name = 'Agentforce'`,
    `ForecastAmount__c >= ${minAmount}`,
    `ForecastStage__c NOT IN (${DEAD_STAGES_SQL})`,
  ];

  if (input.max_amount) conditions.push(`ForecastAmount__c <= ${input.max_amount}`);
  if (input.forecast_status && Array.isArray(input.forecast_status) && input.forecast_status.length) {
    conditions.push(`ForecastStatus__c IN (${input.forecast_status.map((s: string) => `'${s}'`).join(", ")})`);
  }
  if (input.fiscal_quarter) conditions.push(`FiscalQuarter__c = '${input.fiscal_quarter}'`);
  if (input.fiscal_year) conditions.push(`FiscalYear__c = '${input.fiscal_year}'`);
  if (input.top_deal_only) conditions.push(`TOP_Deal__c = true`);
  if (input.approved_budget_only) conditions.push(`Approved_Budget__c = true`);
  if (input.close_before) conditions.push(`ForecastCloseDate__c <= ${input.close_before}`);
  if (input.close_after) conditions.push(`ForecastCloseDate__c >= ${input.close_after}`);
  if (input.account_name) conditions.push(`Account__c LIKE '%${input.account_name}%'`);

  const sortMap: Record<string, string> = {
    amount: "ForecastAmount__c DESC",
    close_date: "ForecastCloseDate__c ASC",
    stage: "ForecastStage__c ASC",
  };
  const orderBy = sortMap[(input.sort_by as string) ?? "amount"] ?? "ForecastAmount__c DESC";

  const soql = `SELECT Id, Name, Account__c, ForecastAmount__c, ForecastStage__c, ForecastStatus__c, ForecastCloseDate__c, FiscalQuarter__c, FiscalYear__c, TOP_Deal__c, Approved_Budget__c, Competitive_Status__c, Data_Cloud_Use_Case__c, Customer_Use_Case__c FROM SpecialistForecast__c WHERE ${conditions.join(" AND ")} ORDER BY ${orderBy} LIMIT ${limit}`;

  const result = await soqlQuery<SFR>(soql);
  const records = result.records.map((r) => ({
    ...r,
    parsed_account_name: parseAccountName(r.Account__c),
  }));
  const total_amount = records.reduce((s, r) => s + (r.ForecastAmount__c ?? 0), 0);
  return { records, count: records.length, total_amount };
}

async function getDealDetails(input: Record<string, unknown>) {
  const identifier = input.identifier as string;
  let condition: string;

  if (identifier.startsWith("SAF-") || /^[a-zA-Z0-9]{15,18}$/.test(identifier)) {
    const field = identifier.startsWith("SAF-") ? "Name" : "Id";
    condition = `${field} = '${identifier}'`;
  } else {
    condition = `Account__c LIKE '%${identifier}%' AND ForecastStage__c NOT IN (${DEAD_STAGES_SQL})`;
  }

  const soql = `SELECT Id, Name, Account__c, ForecastAmount__c, ForecastStage__c, ForecastStatus__c, ForecastCloseDate__c, FiscalQuarter__c, FiscalYear__c, TOP_Deal__c, Field_Product_Lead__c, Data_Cloud_Use_Case__c, Customer_Use_Case__c, Solution_Overview__c, ForecastNotes__c, Specialist_Sales_Notes__c, Compelling_Event__c, Decision_Criteria__c, Top_Priorities__c, Approved_Budget__c, ROI_Business_Case_Completed__c, Challenges__c, Red_Flags__c, Competitive_Status__c, Primary_Competitor__c, Current_System__c, Next_Steps__c, Next_Action__c, Date_to_Revisit__c, Mutual_Close_Plan__c, Business_Case_ROI__c FROM SpecialistForecast__c WHERE RecordType.Name = 'Agentforce' AND ${condition} ORDER BY ForecastAmount__c DESC LIMIT 1`;

  const result = await soqlQuery<SFR>(soql);
  if (!result.records.length) return { error: `No Agentforce SFR found: "${identifier}"` };
  const r = result.records[0];
  return { ...r, parsed_account_name: parseAccountName(r.Account__c) };
}

async function searchOpportunities(input: Record<string, unknown>) {
  const query = (input.query as string).replace(/'/g, "\\'");
  const minAmount = (input.min_amount as number) ?? 200_000;
  const limit = (input.limit as number) ?? 10;

  const soql = `SELECT Id, Name, Account__c, ForecastAmount__c, ForecastStage__c, ForecastStatus__c, ForecastCloseDate__c, FiscalQuarter__c, Customer_Use_Case__c, Data_Cloud_Use_Case__c, ForecastNotes__c, Challenges__c, Next_Steps__c FROM SpecialistForecast__c WHERE RecordType.Name = 'Agentforce' AND ForecastAmount__c >= ${minAmount} AND ForecastStage__c NOT IN (${DEAD_STAGES_SQL}) AND (ForecastNotes__c LIKE '%${query}%' OR Customer_Use_Case__c LIKE '%${query}%' OR Next_Steps__c LIKE '%${query}%' OR Solution_Overview__c LIKE '%${query}%' OR Challenges__c LIKE '%${query}%' OR Account__c LIKE '%${query}%') ORDER BY ForecastAmount__c DESC LIMIT ${limit}`;

  const result = await soqlQuery<SFR>(soql);
  const records = result.records.map((r) => ({ ...r, parsed_account_name: parseAccountName(r.Account__c) }));
  return { records, count: records.length };
}

async function getPipelineStats(input: Record<string, unknown>) {
  const groupBy = (input.group_by as string) ?? "forecast_status";
  const fiscalYear = (input.fiscal_year as string) ?? "FY27";
  const minAmount = (input.min_amount as number) ?? 200_000;

  const fieldMap: Record<string, string> = {
    forecast_status: "ForecastStatus__c",
    stage: "ForecastStage__c",
    fiscal_quarter: "FiscalQuarter__c",
    competitor: "Primary_Competitor__c",
  };
  const groupField = fieldMap[groupBy];

  const soql = `SELECT ${groupField}, COUNT(Id) cnt, SUM(ForecastAmount__c) total FROM SpecialistForecast__c WHERE RecordType.Name = 'Agentforce' AND FiscalYear__c = '${fiscalYear}' AND ForecastAmount__c >= ${minAmount} AND ForecastStage__c NOT IN (${DEAD_STAGES_SQL}) GROUP BY ${groupField} ORDER BY SUM(ForecastAmount__c) DESC`;

  const result = await soqlQuery<Record<string, unknown>>(soql);
  const groups = result.records.map((r) => ({
    key: (r[groupField] as string) ?? "Unknown",
    count: r["cnt"] as number,
    total_amount: (r["total"] as number) ?? 0,
  }));
  const grand_total = groups.reduce((s, g) => s + g.total_amount, 0);
  return { groups, grand_total, group_by: groupBy, fiscal_year: fiscalYear };
}

export async function executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case "list_opportunities":  return listOpportunities(input);
    case "get_deal_details":    return getDealDetails(input);
    case "search_opportunities":return searchOpportunities(input);
    case "get_pipeline_stats":  return getPipelineStats(input);
    default:                    return { error: `Unknown tool: ${name}` };
  }
}
