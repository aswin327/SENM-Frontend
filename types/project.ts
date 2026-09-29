export type ProjectStatus = 'Completed' | 'Ongoing';
export type ProjectService = 'Site survey' | 'Structural drawings' | 'Full package';

export interface ProjectGalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface ProfileProject {
  id: string;
  title: string;
  projectType: ProjectService | string;
  status: ProjectStatus | string;
  location: string;
  postcode: string;
  yearCompleted: string;
  planningAuthority: string;
  projectValue: string;
  existingArea: string;
  proposedArea: string;
  buildingType: string;
  structuralSystems: string;
  summary: string;
  clientBrief: string;
  structuralScope: string;
  outcomeNotes: string;
  gallery: ProjectGalleryImage[];
}
