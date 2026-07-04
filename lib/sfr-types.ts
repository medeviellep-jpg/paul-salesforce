export interface SFR {
  Id: string;
  Name: string;
  Account__c: string | null;
  parsed_account_name?: string;
  ForecastAmount__c: number | null;
  ForecastStage__c: string | null;
  ForecastStatus__c: string | null;
  ForecastCloseDate__c: string | null;
  FiscalQuarter__c: string | null;
  FiscalYear__c: string | null;
  TOP_Deal__c: boolean;
  Field_Product_Lead__c: string | null;
  Data_Cloud_Use_Case__c: string | null;
  Customer_Use_Case__c: string | null;
  Solution_Overview__c: string | null;
  ForecastNotes__c: string | null;
  Specialist_Sales_Notes__c: string | null;
  Compelling_Event__c: string | null;
  Decision_Criteria__c: string | null;
  Top_Priorities__c: string | null;
  Approved_Budget__c: boolean;
  ROI_Business_Case_Completed__c: boolean;
  Challenges__c: string | null;
  Red_Flags__c: string | null;
  Competitive_Status__c: string | null;
  Primary_Competitor__c: string | null;
  Current_System__c: string | null;
  Next_Steps__c: string | null;
  Next_Action__c: string | null;
  Date_to_Revisit__c: string | null;
  Mutual_Close_Plan__c: string | null;
  Business_Case_ROI__c: string | null;
  Approved_Budget__c_bool?: boolean;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export type SSEEvent =
  | { type: "text_delta"; text: string }
  | { type: "tool_use"; tool_name: string; status: "running" | "done" }
  | { type: "error"; message: string }
  | { type: "done" };
