'use client';
import type { Review, ReviewStats } from '@/types/review';

interface ProfileReviewsProps {
  reviews: Review[];
  stats: ReviewStats;
}

export function ProfileReviews({ reviews, stats }: ProfileReviewsProps) {
  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">07</div>
        <h2>Review &amp; publish</h2>
        <p>Check the client-facing profile before saving. Verified reviews remain read-only; this step is for final quality control.</p>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">09 · Reviews</div>
          <h2>Client reviews</h2>
        </div>
        <p>Reviews and ratings are generated from verified SENM projects and cannot be edited by the engineer.</p>
      </div>
      <div className="reviews-profile-grid">
        <div className="review-summary card">
          <strong>{stats.averageRating}</strong>
          <div className="stars">★★★★★</div>
          <span>Based on {stats.totalReviews} verified reviews</span>
          <div className="rating-row"><label>Speed of quote</label><b>{stats.speedRating}</b></div>
          <div className="rating-row"><label>Communication</label><b>{stats.communicationRating}</b></div>
          <div className="rating-row"><label>Value for money</label><b>{stats.valueRating}</b></div>
          <div className="read-only-badge">SENM VERIFIED · READ ONLY</div>
        </div>
        <div className="review-list-profile">
          {reviews.map(review => (
            <article key={review.id} className="review-card">
              <div className="review-meta">
                <b>{review.clientName}</b>
                <span>{review.projectType} · {review.location} · {review.date}</span>
                <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
              <p>“{review.comment}”</p>
            </article>
          ))}
        </div>
      </div>
      <div className="profile-footer-cta">
        <div>
          <div className="eyebrow">PUBLIC PROFILE</div>
          <h2>Check the public experience before publishing</h2>
          <p>Preview the client-facing profile and make sure your identity, capability, coverage, project history, pricing and contact details are accurate.</p>
        </div>
        <div className="profile-edit-actions">
          <button className="secondary" type="button">Preview public profile</button>
          <button className="link-btn white-link" type="button">SAVE PROFILE CHANGES →</button>
        </div>
      </div>
    </div>
  );
}
