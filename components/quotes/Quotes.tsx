'use client';

import { useRouter } from 'next/navigation';
import { quoteMetrics, quoteSummaries } from '@/data/quotes';
import type { QuoteSummary } from '@/types/quote';

export default function Quotes() {
  const router = useRouter();

  return (
    <section className="view active" id="quotes">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Commercial activity</div>
          <h1>Your quotes</h1>
          <p>Track submitted, awarded and draft quotes.</p>
        </div>
        <div className="head-actions">
          <button className="secondary" onClick={() => router.push('/opportunities')} type="button">Find opportunities</button>
          <button className="primary" onClick={() => router.push('/quotes/builder')} type="button">+ Add quote</button>
        </div>
      </div>

      <div className="metrics">
        <div className="metric">
          <div className="label muted">Drafts</div>
          <div className="metric-value">{quoteMetrics.draftsCount}</div>
          <div className="metric-note">{quoteMetrics.draftsNote}</div>
        </div>
        <div className="metric">
          <div className="label muted">Submitted</div>
          <div className="metric-value">{quoteMetrics.submittedCount}</div>
          <div className="metric-note">{quoteMetrics.submittedNote}</div>
        </div>
        <div className="metric">
          <div className="label muted">Awarded</div>
          <div className="metric-value">{quoteMetrics.awardedCount}</div>
          <div className="metric-note success">{quoteMetrics.awardedNote}</div>
        </div>
        <div className="metric">
          <div className="label muted">Average response</div>
          <div className="metric-value">{quoteMetrics.avgResponseTime}</div>
          <div className="metric-note">{quoteMetrics.avgResponseNote}</div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Quote</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          {quoteSummaries.map((quote: QuoteSummary) => {
            let statusClass = 'status';
            if (quote.statusCode === 'AWARDED') statusClass += ' green';
            if (quote.statusCode === 'DRAFT') statusClass += ' amber';

            return (
              <tr key={quote.id}>
                <td>
                  <div className="table-title">{quote.projectTitle}</div>
                  <div className="tiny muted">{quote.projectDetails}</div>
                </td>
                <td className="mono">{quote.quoteAmount}</td>
                <td>{quote.submittedDate}</td>
                <td><span className={statusClass}>{quote.status}</span></td>
                <td>
                  {quote.statusCode === 'AWARDED' ? (
                    <button className="link-btn" onClick={() => router.push('/projects')} type="button">Open project</button>
                  ) : quote.statusCode === 'DRAFT' ? (
                    <button className="link-btn" onClick={() => router.push('/quotes/builder')} type="button">Continue</button>
                  ) : (
                    <button className="link-btn" type="button">View quote →</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
