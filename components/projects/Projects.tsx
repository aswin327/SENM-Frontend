'use client';

import { useRouter } from 'next/navigation';
import { activeProjectCards, pipelineProjects } from '@/data/active-projects';
import type { ActiveProjectCard, PipelineProject } from '@/types/active-project';

export default function Projects() {
  const router = useRouter();

  return (
    <section className="view active" id="projects">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Delivery</div>
          <h1>Projects</h1>
          <p>Manage active work after a quote has been awarded.</p>
        </div>
        <div className="head-actions">
          <button className="secondary" type="button">Filter projects</button>
          <button className="primary" onClick={() => router.push('/profile')} type="button">+ Add project</button>
        </div>
      </div>
      
      <div aria-label="Active projects" className="project-grid projects-page-grid">
        {activeProjectCards.map((project: ActiveProjectCard) => (
          <article key={project.id} className="project-card">
            <div aria-hidden="true" className="project-thumb"></div>
            <div className="pcopy">
              <div className="label">{project.status} · {project.location}</div>
              <h3>{project.title}</h3>
              <div className="small muted">{project.scope}</div>
              <div className="project-card-action">
                <button 
                  className="link-btn" 
                  onClick={() => router.push('/projects/workspace')}
                  type="button"
                >
                  Open project →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="section-title" style={{marginTop: '28px'}}>
        <h2>Project pipeline</h2>
        <span className="mono">{pipelineProjects.length} ACTIVE</span>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Stage</th>
            <th>Next action</th>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pipelineProjects.map((pipeline: PipelineProject) => (
            <tr key={pipeline.id}>
              <td className="table-title">{pipeline.title}</td>
              <td>{pipeline.stage}</td>
              <td>{pipeline.nextAction}</td>
              <td>{pipeline.client}</td>
              <td>
                <button 
                  className="link-btn" 
                  onClick={() => router.push('/projects/workspace')}
                  type="button"
                >
                  Open →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
