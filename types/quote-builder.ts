export interface QuoteServiceOption {
  id: string;
  name: string;
  description: string;
  type: 'Included' | 'Optional';
  defaultSelected: boolean;
}

export interface QuoteTurnaroundOptions {
  calculations: string[];
  drawings: string[];
  availability: string[];
}

export interface QuoteBuilderData {
  projectTitle: string;
  projectClient: string;
  projectLocation: string;
  projectType: string;
  projectStage: string;
  projectRequired: string;
  projectDocs: string;
  targetStart: string;
  scopeNeeded: string;
  services: QuoteServiceOption[];
  includedTags: string[];
  excludedTags: string[];
  turnaroundOptions: QuoteTurnaroundOptions;
}
