'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../hooks/useProfile';

export default function Overview() {
  const router = useRouter();
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  const firstName = profile?.fullName?.split(' ')[0] || 'User';
  const fullName = profile?.fullName || 'User';
  const specialisms = profile?.professional?.specialisms?.join(' · ') || 'Engineer';

  return (
    <section className="view active" id="overview">
      <div className="ov-hero">
        <div className="ov-hero-copy">
          <div className="label eyebrow">Engineer dashboard · Thursday 17 September</div>
          <h1>Good morning,<br/><em>{firstName}.</em></h1>
          <p>Three active projects are moving. Five new requests are waiting to be reviewed.</p>
          <div className="ov-hero-actions">
            <button className="primary" onClick={() => router.push('/opportunities')}>Review opportunities <span>→</span></button>
            <button className="secondary" onClick={() => router.push('/projects')}>Open projects</button>
          </div>
        </div>
        <div className="ov-hero-panel">
          <div className="ov-status-top"><span className="status-dot"></span><span>LIVE MATCHING</span><span className="mono">UPDATED 2M AGO</span></div>
          <div className="ov-match-ring"><strong>98<small>%</small></strong><span>top match</span></div>
          <div className="ov-match-info"><div className="label">NEW OPPORTUNITY</div><h3>Victorian Terrace<br/>Rear Dormer Loft</h3><p>N1 · 1.2 mi away · Building Control ready</p><button className="link-btn" onClick={() => router.push('/opportunities/detail')}>Review &amp; quote →</button></div>
        </div>
      </div>

      <div className="ov-metrics">
        <article><div className="label">New opportunities</div><strong>05</strong><span>2 high-match requests</span><i>↗</i></article>
        <article><div className="label">Quotes</div><strong>02</strong><span>awaiting client response</span><i>→</i></article>
        <article><div className="label">Active projects</div><strong>03</strong><span>2 delivery · 1 sign-off</span><i>→</i></article>
        <article><div className="label">Profile completeness</div><strong>96<small>%</small></strong><span>4 actions remaining</span><i>↗</i></article>
      </div>

      <section className="ov-section ov-work">
        <div className="ov-section-head"><div><div className="label eyebrow">Current work</div><h2>Active projects</h2></div><button className="link-btn" onClick={() => router.push('/projects')}>View all projects →</button></div>
        <div className="ov-project-grid">
          <article className="ov-project featured">
            <div className="ov-project-visual visual-dormer"><span>N16</span><b>01</b></div>
            <div className="ov-project-body"><div className="ov-project-meta"><span>IN DELIVERY</span><span className="mono">68% COMPLETE</span></div><h3>Rear Dormer Loft</h3><p>Calculations · drawings · Building Control</p><div className="ov-progress"><span style={{width: '68%'}}></span></div><button className="link-btn" onClick={() => router.push('/projects')}>Open project →</button></div>
          </article>
          <article className="ov-project">
            <div className="ov-project-visual visual-extension"><span>ISLINGTON</span><b>02</b></div>
            <div className="ov-project-body"><div className="ov-project-meta"><span>IN DELIVERY</span><span className="mono">42% COMPLETE</span></div><h3>Rear Extension</h3><p>Steel sizing · padstones · revisions</p><div className="ov-progress"><span style={{width: '42%'}}></span></div><button className="link-btn" onClick={() => router.push('/projects')}>Open project →</button></div>
          </article>
          <article className="ov-project">
            <div className="ov-project-visual visual-signoff"><span>N7</span><b>03</b></div>
            <div className="ov-project-body"><div className="ov-project-meta"><span>SIGN-OFF</span><span className="mono">92% COMPLETE</span></div><h3>Two-storey Extension</h3><p>Final package · client review</p><div className="ov-progress"><span style={{width: '92%'}}></span></div><button className="link-btn" onClick={() => router.push('/projects')}>Open project →</button></div>
          </article>
        </div>
      </section>

      <div className="ov-lower-grid">
        <section className="ov-section ov-opps">
          <div className="ov-section-head"><div><div className="label eyebrow">Platform matching</div><h2>Worth a look</h2></div><button className="link-btn" onClick={() => router.push('/opportunities')}>All opportunities →</button></div>
          <article className="ov-opportunity">
            <div className="ov-opportunity-score"><strong>98</strong><span>% MATCH</span></div>
            <div className="ov-opportunity-main"><div className="label">LOFT CONVERSION · N1 · 42M AGO</div><h3>Victorian Terrace Rear Dormer Loft Conversion</h3><p>Twin steel ridge beams, dormer trimmer details and floor joist upgrade calculations.</p><div className="ov-opportunity-facts"><span>£950–£1,400 estimated</span><span>2 documents</span><span>Building Control ready</span></div></div>
            <button className="primary" onClick={() => router.push('/opportunities/detail')}>Review &amp; quote</button>
          </article>
          <article className="ov-opportunity compact">
            <div className="ov-opportunity-score"><strong>91</strong><span>% MATCH</span></div>
            <div className="ov-opportunity-main"><div className="label">REAR EXTENSION · N16 · 3H AGO</div><h3>Ground Floor Rear Kitchen Extension &amp; RSJ</h3><p>4.5m load-bearing spine wall and chimney breast removal.</p></div>
            <button className="secondary" onClick={() => router.push('/opportunities/detail')}>Review →</button>
          </article>
        </section>

        <aside className="ov-aside">
          <div className="ov-attention">
            <div className="ov-aside-head"><div><div className="label eyebrow">Today</div><h3>Needs attention</h3></div><span>03</span></div>
            <button onClick={() => router.push('/quotes')}><span><b>Quotes awaiting response</b><small>Client decisions pending</small></span><strong>02 →</strong></button>
            <button onClick={() => router.push('/messages')}><span><b>Unread messages</b><small>Sarah Jenkins + 1</small></span><strong>02 →</strong></button>
            <button onClick={() => router.push('/profile')}><span><b>Profile completeness</b><small>Finish remaining details</small></span><strong>96% →</strong></button>
          </div>
          <div className="ov-trust-card">
            <div className="label">SENM VERIFIED</div><strong>{fullName}</strong><p>{specialisms}<br/>£2M professional indemnity</p><div><span className="status-dot"></span>Available this week</div><button className="link-btn" onClick={() => router.push('/profile')}>Manage profile →</button>
          </div>
        </aside>
      </div>
    </section>
  );
}
