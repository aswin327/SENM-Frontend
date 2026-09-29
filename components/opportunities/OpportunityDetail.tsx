'use client';

import { useRouter } from 'next/navigation';

export default function OpportunityDetail() {
  const router = useRouter();

  return (
    <section className="view active" id="opportunity-detail">
      <div className="page-head">
        <div>
          <div className="label eyebrow">New opportunity · N16</div>
          <h1>Victorian Terrace Rear Dormer Loft Conversion</h1>
          <p>98% match · 1.2 mi away · Highbury, N5</p>
        </div>
        <div className="head-actions">
          <button className="secondary">Not interested</button>
          <button className="primary" onClick={() => router.push('/quotes/builder')}>Submit a quote</button>
        </div>
      </div>
      <div className="detail-grid">
        <div>
          <div className="detail-visual">
            <span className="visual-annotation ann1">N16 · SITE / PLAN REFERENCE</span>
            <span className="visual-annotation ann2">DORMER / RIDGE BEAM</span>
            <span className="visual-annotation ann3">BUILDING CONTROL</span>
          </div>
          <div className="card">
            <div className="section-title"><h2>Project overview</h2><span className="mono">CLIENT GENERATED</span></div>
            <div className="data-grid">
              <div className="data-cell"><div className="label">Property</div><div className="value">Victorian terrace</div></div>
              <div className="data-cell"><div className="label">Approx. area</div><div className="value">Not provided</div></div>
              <div className="data-cell"><div className="label">Project type</div><div className="value">Loft conversion</div></div>
              <div className="data-cell"><div className="label">Stage</div><div className="value">Building Control</div></div>
              <div className="data-cell"><div className="label">Target start</div><div className="value">April</div></div>
              <div className="data-cell"><div className="label">Required scope</div><div className="value">Calcs + drawings</div></div>
            </div>
          </div>
          <div className="card">
            <div className="section-title"><h2>Client requirement</h2><span className="mono">CLIENT GENERATED</span></div>
            <p>Planning consent approved from Islington Council. Twin steel ridge beams, trimmer details for the dormer roof, and floor joist upgrade calculations are required before April 15th.</p>
            <div className="callout"><strong>Documents supplied</strong><br/><span className="small muted">2 architectural PDFs · planning consent information available</span></div>
          </div>
          <div className="card">
            <div className="section-title"><h2>Why this matches you</h2><span className="mono">PLATFORM CALCULATED</span></div>
            <div className="data-grid">
              <div className="data-cell"><div className="label">Specialism</div><div className="value">Loft conversions</div></div>
              <div className="data-cell"><div className="label">Coverage</div><div className="value">Within 1.2mi</div></div>
              <div className="data-cell"><div className="label">Similar projects</div><div className="value">31</div></div>
              <div className="data-cell"><div className="label">Local projects</div><div className="value">14</div></div>
              <div className="data-cell"><div className="label">Experience</div><div className="value">18 years</div></div>
              <div className="data-cell"><div className="label">Availability</div><div className="value">This week</div></div>
            </div>
          </div>
        </div>
        <aside>
          <div className="rail">
            <div className="rail-head"><h3>Commercial information</h3></div>
            <div className="small muted">Client budget</div>
            <div style={{fontFamily: 'var(--display)', fontSize: '23px', color: 'var(--navy)', fontWeight: '600', margin: '3px 0 12px'}}>Not provided</div>
            <p className="small">Set your own fixed price when submitting the quote. SENM does not invent or expose a client budget where one has not been supplied.</p>
          </div>
          <div className="rail">
            <div className="rail-head"><h3>Your profile</h3><span>VERIFIED</span></div>
            <div className="checklist">
              <div className="check">MIStructE · CEng</div>
              <div className="check">£2M professional indemnity</div>
              <div className="check">Typical response within 24h</div>
              <div className="check">Eurocode calculations</div>
            </div>
          </div>
          <div className="rail">
            <button className="primary" onClick={() => router.push('/quotes/builder')} style={{width: '100%'}}>Prepare fixed-price quote →</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
