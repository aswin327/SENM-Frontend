export interface ReviewStats {
  averageRating: string;
  totalReviews: number;
  speedRating: string;
  communicationRating: string;
  valueRating: string;
}

export interface Review {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
}
