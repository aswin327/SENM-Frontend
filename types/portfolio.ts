export interface PortfolioItem {
  _id: string;
  imageUrl: string;
  fileName: string;
  uploadedAt: string;
}

export interface PortfolioUploadResponse {
  message: string;
  portfolioItem: PortfolioItem;
}
