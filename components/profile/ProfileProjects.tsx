'use client';
import { useState } from 'react';
import type { ProfileProject } from '@/types/project';

interface ProfileProjectsProps {
  projects: ProfileProject[];
}

export function ProfileProjects({ projects }: ProfileProjectsProps) {
  const [currentProject, setCurrentProject] = useState<string>(projects[0]?.id || '1');

  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">04</div>
        <h2>Project portfolio</h2>
        <p>Build each project as its own record. Complete the detail fields that give SENM enough substance for project pages, search visibility and client proof.</p>
      </div>
      <div className="project-step-intro">
        <strong>One project at a time</strong>
        <span>Add the project story, technical scope, location, completion details and gallery images. You can return to any project without losing the others.</span>
      </div>
      <div className="project-step-shell">
        <div aria-label="Projects" className="project-selector" role="tablist">
          {projects.map((project, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            const isActive = currentProject === project.id;
            return (
              <button 
                key={project.id}
                type="button" 
                role="tab" 
                className={`project-selector-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentProject(project.id)}
              >
                <span className="project-selector-num">{numStr}</span>
                <span>{project.title}</span>
              </button>
            );
          })}
        </div>
        <div className="project-editor-stage">
          {projects.map((project, index) => {
            const numStr = (index + 1).toString().padStart(2, '0');
            if (currentProject !== project.id) return null;
            
            return (
              <article key={project.id} className="project-editor-card profile-project-card active">
                <div className="project-editor-top">
                  <div>
                    <div className="eyebrow">PROJECT {numStr} · ENGINEER SUPPLIED</div>
                    <h3 className="project-live-title">{project.title}</h3>
                  </div>
                  <button className="link-btn delete-action" type="button">Delete project</button>
                </div>
                <div className="form-grid project-core-grid">
                  <div className="field full">
                    <label>Project title</label>
                    <input defaultValue={project.title} />
                  </div>
                  <div className="field">
                    <label>Project type / service</label>
                    <select defaultValue={project.projectType}>
                      <option>Site survey</option>
                      <option>Structural drawings</option>
                      <option>Full package</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Project status</label>
                    <select defaultValue={project.status}>
                      <option>Completed</option>
                      <option>Ongoing</option>
                    </select>
                  </div>
                  <div className="field"><label>Location</label><input defaultValue={project.location} /></div>
                  <div className="field"><label>Postcode</label><input defaultValue={project.postcode} /></div>
                  <div className="field"><label>Year completed</label><input defaultValue={project.yearCompleted} /></div>
                  <div className="field"><label>Planning authority</label><input defaultValue={project.planningAuthority} /></div>
                  <div className="field"><label>Project value</label><input defaultValue={project.projectValue} /></div>
                  <div className="field"><label>Existing area</label><input defaultValue={project.existingArea} /></div>
                  <div className="field"><label>Proposed area</label><input defaultValue={project.proposedArea} /></div>
                  <div className="field"><label>Building type</label><input defaultValue={project.buildingType} /></div>
                  <div className="field"><label>Structural systems / methods</label><input defaultValue={project.structuralSystems} /></div>
                  <div className="field full"><label>Project summary</label><textarea rows={4} defaultValue={project.summary}></textarea></div>
                  <div className="field full"><label>Client brief / problem</label><textarea rows={5} defaultValue={project.clientBrief}></textarea></div>
                  <div className="field full"><label>Structural scope / solution</label><textarea rows={6} defaultValue={project.structuralScope}></textarea></div>
                  <div className="field full"><label>Outcome / completion notes</label><textarea rows={4} defaultValue={project.outcomeNotes}></textarea></div>
                </div>
                <div className="project-gallery-editor">
                  <div className="gallery-editor-head">
                    <div>
                      <label>PROJECT GALLERY</label>
                      <span>Multiple images · 16:9 · add captions and descriptive alt text</span>
                    </div>
                    <button className="secondary" type="button">+ Add image</button>
                  </div>
                  <div className="gallery-editor-list">
                    {project.gallery.map((img) => (
                      <div key={img.id} className="gallery-editor-item">
                        <div className="gallery-preview">
                          <img alt={img.caption} src={img.url} />
                        </div>
                        <div className="gallery-fields">
                          <div className="field">
                            <label>Image URL · 16:9</label>
                            <input defaultValue={img.url} />
                          </div>
                          <div className="field">
                            <label>Caption / alt text</label>
                            <input defaultValue={img.caption} />
                          </div>
                        </div>
                        <button aria-label="Delete image" className="icon-remove" title="Delete image" type="button">×</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="project-seo-note">Tip: detailed, specific project information helps SENM build a useful project record for clients and search. Write naturally; do not keyword-stuff.</div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="center-action">
        <button className="secondary" type="button">+ Add another project</button>
      </div>
    </div>
  );
}
