export interface ActiveProjectCard {
  id: string;
  status: string;
  location: string;
  title: string;
  scope: string;
}

export interface PipelineProject {
  id: string;
  title: string;
  stage: string;
  nextAction: string;
  client: string;
}
