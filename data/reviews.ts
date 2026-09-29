import type { Review, ReviewStats } from '@/types/review';

export const reviewStats: ReviewStats = {
  averageRating: '4.9',
  totalReviews: 42,
  speedRating: '4.9',
  communicationRating: '4.9',
  valueRating: '4.6'
};

export const reviews: Review[] = [
  {
    id: 'rev-1',
    clientName: 'Sarah J.',
    projectType: 'Loft conversion',
    location: 'Islington',
    date: 'Mar 2026',
    rating: 5,
    comment: 'Drawings passed building control first time. Fast, clear, and exactly what we needed.'
  },
  {
    id: 'rev-2',
    clientName: 'David K.',
    projectType: 'Rear extension',
    location: 'Highbury',
    date: 'Feb 2026',
    rating: 5,
    comment: 'James explained everything in plain terms and gave us a fixed quote within a day of the survey. Would use again.'
  },
  {
    id: 'rev-3',
    clientName: 'James P.',
    projectType: 'New build',
    location: 'Angel',
    date: 'Jan 2026',
    rating: 5,
    comment: 'Handled the structural sign-off for our new build without any fuss. Communication was excellent from start to finish.'
  },
  {
    id: 'rev-4',
    clientName: 'Amina R.',
    projectType: 'Survey',
    location: 'Holloway',
    date: 'Nov 2025',
    rating: 4,
    comment: 'Good value and responsive throughout, though the final report took a couple of days longer than quoted.'
  }
];
