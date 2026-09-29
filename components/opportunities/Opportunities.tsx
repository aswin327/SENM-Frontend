'use client';

import { useRouter } from 'next/navigation';
import { opportunitiesData } from '@/data/opportunities';
import type { Opportunity } from '@/types/opportunity';

export default function Opportunities() {
  const router = useRouter();

  return (
    <section className="view active" id="opportunities">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Supply-side opportunities</div>
          <h1>Projects matched to you</h1>
          <p>Review relevant project requests and decide which ones you want to quote.</p>
        </div>
        <button className="secondary" type="button">Update availability</button>
      </div>
      
      <div className="filters">
        <input className="search" placeholder="Search project, postcode or client" />
        <select className="filter">
          <option>All project types</option>
          <option>Loft conversion</option>
          <option>Extension</option>
          <option>Survey</option>
          <option>New build</option>
        </select>
        <select className="filter">
          <option>All stages</option>
          <option>Planning</option>
          <option>Building Control</option>
          <option>Survey</option>
        </select>
        <select className="filter">
          <option>All matches</option>
          <option>90%+</option>
          <option>80%+</option>
        </select>
        <select className="filter">
          <option>Best match</option>
          <option>Newest</option>
          <option>Closest</option>
        </select>
      </div>

      <div className="opportunity-grid">
        {opportunitiesData.map((opp: Opportunity) => (
          <article key={opp.id} className="opportunity-card-grid">
            <div className="opportunity-card-top">
              <span className="match">{opp.matchScore}% MATCH</span>
              <span className="mono">{opp.timeAgo}</span>
            </div>
            <div className="opportunity-card-type">{opp.type} · {opp.locationCode}</div>
            <h3>{opp.title}</h3>
            <p className="opportunity-card-client">{opp.clientStatus}</p>
            <div className="opportunity-card-facts">
              <div><span>Typical fee</span><strong>{opp.typicalFee}</strong></div>
              <div><span>Documents</span><strong>{opp.documentsCount}</strong></div>
            </div>
            <p className="opportunity-card-brief">{opp.brief}</p>
            <div className="opportunity-card-footer">
              <span className="mono">{opp.statusBadge}</span>
              <div>
                <button className="link-btn danger-link" type="button">Decline</button>
                <button 
                  className="primary" 
                  onClick={() => router.push('/opportunities/detail')}
                  type="button"
                >
                  {opp.statusBadge === 'VIEWED' ? 'Review' : 'View opportunity'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
