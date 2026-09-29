/* eslint-disable @next/next/no-img-element */
'use client';
import type { Profile } from '@/types/profile';

interface ProfileIdentityProps {
  data: Profile;
}

export function ProfileIdentity({ data }: ProfileIdentityProps) {
  const [firstName, ...remainingName] = data.displayName.trim().split(/\s+/);
  const lastName = remainingName.join(' ');

  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">01</div>
        <h2>Profile identity</h2>
        <p>Set the information clients see first. Keep this concise; the public profile pulls the strongest signals from these fields.</p>
      </div>
      
      <div className="profile-cover-grid">
        <div className="profile-visual profile-image-editor">
          <img alt="Recent residential structural project" id="profileHeroImage" src={data.heroImage} />
          <div className="profile-image-controls">
            <label className="eyebrow">PROFILE / HERO IMAGE</label>
            <input aria-label="Profile hero image URL" id="profileHeroImageUrl" defaultValue={data.heroImage} />
            <button className="secondary" type="button">Update image</button>
          </div>
        </div>
        <div className="profile-identity">
          <div className="profile-avatar">{data.avatarInitials}</div>
          <div className="identity-copy">
            <div className="eyebrow">IStructE Verified · {data.baseLocation}</div>
            <h2>
              <span id="previewDisplayName">{firstName}</span>{' '}
              {lastName && <em id="previewDisplayInitial">{lastName}</em>}
            </h2>
            <p>
              <span id="previewTitle">{data.professionalTitle}</span> · <span id="previewCompany">{data.company}</span>
            </p>
            <div className="credential-row">
              {data.credentials.map((cred) => (
                <span key={cred.id} className="credential">{cred.title} · {cred.verified ? 'VERIFIED' : 'UNVERIFIED'}</span>
              ))}
              <span className="credential">{data.insurance.coverAmount} PI · {data.insurance.verified ? 'VERIFIED' : 'UNVERIFIED'}</span>
            </div>
            <div className="identity-stats">
              <span><b>1.4mi</b> away</span>
              <span><b>{data.yearsOfExperience} yrs</b> experience</span>
              <span className="status green">{data.availability}</span>
            </div>
          </div>
          <div className="profile-completion">
            <div>
              <span className="label muted">Profile completeness</span>
              <strong className="mono">{data.completionPercentage}%</strong>
            </div>
            <div className="progress">
              <span style={{ width: `${data.completionPercentage}%` }}></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid2 profile-main-grid">
        <div className="card">
          <div className="section-title">
            <h2>Profile details</h2>
            <span>ENGINEER SUPPLIED · EDITABLE</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Display name</label>
              <input id="profileDisplayName" defaultValue={data.displayName} />
            </div>
            <div className="field">
              <label>Professional title</label>
              <input id="profileTitle" defaultValue={data.professionalTitle} />
            </div>
            <div className="field">
              <label>Company / practice</label>
              <input id="profileCompany" defaultValue={data.company} />
            </div>
            <div className="field">
              <label>Base location</label>
              <input defaultValue={data.baseLocation} />
            </div>
            <div className="field">
              <label>Years of experience</label>
              <input min="0" type="number" defaultValue={data.yearsOfExperience} />
            </div>
            <div className="field">
              <label>On SENM since</label>
              <input defaultValue={data.onSENMSince} />
            </div>
            <div className="field full">
              <label>Professional summary</label>
              <textarea rows={7} defaultValue={data.summary}></textarea>
            </div>
          </div>
        </div>
        <aside>
          <div className="rail">
            <div className="rail-head">
              <h3>Public at a glance</h3>
              <span>PREVIEW</span>
            </div>
            <div className="list">
              <div className="list-row">
                <span>Typical response</span>
                <b>{data.typicalResponse}</b>
              </div>
              <div className="list-row">
                <span>Availability</span>
                <select className="inline-select" defaultValue={data.availability}>
                  <option>Available this week</option>
                  <option>Available next week</option>
                  <option>Currently unavailable</option>
                </select>
              </div>
              <div className="list-row">
                <span>Coverage</span>
                <b>Islington · {data.coverageRadiusMiles}mi</b>
              </div>
              <div className="list-row">
                <span>Accreditation</span>
                <b>{data.credentials.map(c => c.title).join(', ')}</b>
              </div>
              <div className="list-row">
                <span>Calculations</span>
                <b>{data.calculationStandard}</b>
              </div>
            </div>
          </div>
          <div className="rail">
            <div className="rail-head">
              <h3>Trust signals</h3>
              <span>SENM VERIFIED · READ ONLY</span>
            </div>
            <div className="trust-big">
              <strong>4.9</strong>
              <span>★★★★★</span>
              <small>42 verified reviews</small>
            </div>
            <div className="mini-metrics">
              <div>
                <b>{data.matchScore}%</b>
                <span>Match score</span>
              </div>
              <div>
                <b>{data.similarProjects}</b>
                <span>Similar projects</span>
              </div>
              <div>
                <b>{data.localProjects}</b>
                <span>Local projects</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
