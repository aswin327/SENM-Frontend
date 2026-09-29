'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { workspaceData } from '@/data/workspace';

export default function ProjectWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section className="view active" id="project-workspace">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Project workspace · awarded</div>
          <h1>{workspaceData.title}</h1>
          <p>{workspaceData.clientInfo}</p>
        </div>
        <div className="head-actions">
          <button className="secondary" onClick={() => router.push('/projects')} type="button">← Projects</button>
          <button className="primary" onClick={() => setActiveTab('communication')} type="button">Message client</button>
        </div>
      </div>
      <div className="workspace-statusbar">
        <div>
          <span className="status green">{workspaceData.statusBadge}</span>
          <span className="mono">{workspaceData.progressPercent}% COMPLETE</span>
        </div>
        <div className="workspace-next">
          <span>Next action</span><strong>{workspaceData.nextAction}</strong>
          <button className="link-btn" onClick={() => setActiveTab('delivery')} type="button">Open →</button>
        </div>
      </div>
      <div className="workspace-tabs" role="tablist" aria-label="Project workspace">
        <button className={`workspace-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')} type="button">Overview</button>
        <button className={`workspace-tab ${activeTab === 'scope' ? 'active' : ''}`} onClick={() => setActiveTab('scope')} type="button">Scope</button>
        <button className={`workspace-tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')} type="button">Documents <span>{workspaceData.documents.length}</span></button>
        <button className={`workspace-tab ${activeTab === 'communication' ? 'active' : ''}`} onClick={() => setActiveTab('communication')} type="button">Communication <span>{workspaceData.messages.length}</span></button>
        <button className={`workspace-tab ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')} type="button">Delivery</button>
      </div>

      {activeTab === 'overview' && (
        <div className="workspace-panel active">
          <div className="workspace-grid">
            <div>
              <div className="card">
                <div className="section-title"><h2>Project overview</h2><span>CLIENT GENERATED</span></div>
                <div className="data-grid">
                  <div className="data-cell"><div className="label">Property</div><div className="value">{workspaceData.overview.property}</div></div>
                  <div className="data-cell"><div className="label">Project type</div><div className="value">{workspaceData.overview.projectType}</div></div>
                  <div className="data-cell"><div className="label">Stage</div><div className="value">{workspaceData.overview.stage}</div></div>
                  <div className="data-cell"><div className="label">Required scope</div><div className="value">{workspaceData.overview.requiredScope}</div></div>
                  <div className="data-cell"><div className="label">Target completion</div><div className="value">{workspaceData.overview.targetCompletion}</div></div>
                  <div className="data-cell"><div className="label">Quote</div><div className="value">{workspaceData.overview.quote}</div></div>
                </div>
              </div>
              <div className="card">
                <div className="section-title"><h2>Delivery timeline</h2><span>PROJECT STATUS</span></div>
                <div className="timeline">
                  {workspaceData.timeline.map(t => (
                    <div key={t.id} className={`timeline-item ${t.state}`}>
                      <b>{t.title}</b><span>{t.statusText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <aside>
              <div className="rail">
                <div className="rail-head"><h3>Project status</h3><span>{workspaceData.progressPercent}%</span></div>
                <div className="status-list">
                  <button className="status-choice active" type="button">IN PROGRESS</button>
                  <button className="status-choice" type="button">CLIENT REVIEW</button>
                  <button className="status-choice" type="button">BUILDING CONTROL</button>
                  <button className="status-choice" type="button">REVISION REQUIRED</button>
                  <button className="status-choice" type="button">READY FOR SIGN-OFF</button>
                  <button className="status-choice" type="button">COMPLETED</button>
                </div>
              </div>
              <div className="rail">
                <div className="rail-head"><h3>Client</h3></div>
                <strong>{workspaceData.clientInfo.split('·')[0].trim()}</strong>
                <p className="small muted">Active project</p>
                <button className="secondary" onClick={() => setActiveTab('communication')} type="button">Open conversation</button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {activeTab === 'scope' && (
        <div className="workspace-panel active">
          <div className="card">
            <div className="section-title"><h2>Agreed scope</h2><span>QUOTE · {workspaceData.overview.quote}</span></div>
            <div className="scope-list">
              {workspaceData.scope.map(s => (
                <div key={s.id}><b>{s.title}</b><span>{s.description}</span></div>
              ))}
            </div>
            <div className="callout"><strong>Scope boundary</strong><br/><span className="small muted">Any material change to the brief or additional site visit should be agreed with the client before work proceeds.</span></div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="workspace-panel active">
          <div className="card">
            <div className="section-title"><h2>Project documents</h2><button className="secondary" type="button">+ Add document</button></div>
            <div className="document-list">
              {workspaceData.documents.map(d => (
                <div key={d.id} className="document-row">
                  <div className="doc-type">{d.type}</div>
                  <div><b>{d.title}</b><span>{d.meta}</span></div>
                  <span className={`status ${d.statusState === 'CURRENT' ? 'green' : ''}`}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'communication' && (
        <div className="workspace-panel active">
          <div className="card">
            <div className="section-title"><h2>Project communication</h2><span>CONTEXTUAL</span></div>
            <div className="conversation compact">
              <div className="conversation-body">
                {workspaceData.messages.map(m => (
                  <div key={m.id} className={`bubble ${m.isMe ? 'me' : ''}`}>{m.text}</div>
                ))}
              </div>
              <div className="composer">
                <input placeholder="Write a project message…"/>
                <button className="primary" type="button">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="workspace-panel active">
          <div className="card">
            <div className="section-title"><h2>Delivery stages</h2><span>ENGINEER CONTROLLED</span></div>
            <div className="delivery-stages">
              {workspaceData.deliveryStages.map(d => (
                <button key={d.id} className={`delivery-stage ${d.state}`} type="button">
                  <span>{d.stepNum}</span><b>{d.title}</b><small>{d.meta}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
