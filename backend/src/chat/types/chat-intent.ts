export type ChatIntent = 'EMPLOYEE_LOCATION' | 'UNKNOWN';

export type ChatEntities = {
  employeeName?: string;
};

export type IntentResult = {
  intent: ChatIntent;
  entities: ChatEntities;
};

export type ChatResponse = {
  answer: string;
  debug?: Record<string, unknown>;
};

