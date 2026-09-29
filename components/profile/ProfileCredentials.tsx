'use client';
import type { Profile } from '@/types/profile';

interface ProfileCredentialsProps {
  data: Profile;
}

export function ProfileCredentials({ data }: ProfileCredentialsProps) {
  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">03</div>
        <h2>Credentials &amp; coverage</h2>
        <p>Keep verification separate from editable coverage and availability. SENM-verified credentials remain read-only.</p>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">03 · Credentials &amp; verification</div>
          <h2>Professional credentials</h2>
        </div>
        <p>Engineer credentials are displayed publicly, while evidence and verification status are controlled by SENM.</p>
      </div>
      <div className="grid2">
        <div className="card">
          <div className="section-title">
            <h2>Accreditations</h2>
            <span>SENM VERIFIED · READ ONLY</span>
          </div>
          <div className="verification-grid">
            {data.credentials.map((cred) => (
              <div key={cred.id} className="verify-item">
                <b>{cred.title}</b>
                <span>{cred.organization}</span>
                <strong>{cred.verified ? 'Verified' : 'Pending'}</strong>
              </div>
            ))}
          </div>
          <div className="field" style={{ marginTop: '18px' }}>
            <label>Additional professional memberships</label>
            <input placeholder="Add membership or qualification" />
          </div>
        </div>
        <div className="card">
          <div className="section-title">
            <h2>Professional indemnity</h2>
            <span>SENM VERIFIED · READ ONLY</span>
          </div>
          <div className="insurance-editor">
            <div>
              <span className="eyebrow">CURRENT COVER</span>
              <strong>{data.insurance.coverAmount}</strong>
              <small>{data.insurance.type}</small>
            </div>
            <div>
              <span className={`status ${data.insurance.verified ? 'green' : 'amber'}`}>
                {data.insurance.verified ? 'Verified' : 'Pending'}
              </span>
              <button className="secondary" type="button">Request verification update</button>
            </div>
          </div>
          <p className="field-help">Insurance evidence and verification cannot be edited directly in the public profile editor.</p>
        </div>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">04 · Coverage &amp; access</div>
          <h2>Where you work</h2>
        </div>
        <p>Coverage and availability are engineer-supplied fields used by SENM to match projects.</p>
      </div>
      <div className="coverage-panel card">
        <div className="coverage-map">
          <div className="map-grid"></div>
          <div className="map-ring ring-outer"></div>
          <div className="map-ring ring-inner"></div>
          <div className="map-pin">{data.avatarInitials}</div>
          <span className="map-label l1">Highbury</span>
          <span className="map-label l2">Angel</span>
          <span className="map-label l3">Hoxton</span>
          <span className="map-label l4">Clerkenwell</span>
          <span className="map-label l5">Holloway</span>
        </div>
        <div className="coverage-details">
          <div className="section-title">
            <h3>Coverage settings</h3>
            <span>ENGINEER SUPPLIED · EDITABLE</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Coverage base</label>
              <input defaultValue={data.baseLocation} />
            </div>
            <div className="field">
              <label>Coverage radius</label>
              <div className="unit-input">
                <input type="number" defaultValue={data.coverageRadiusMiles} />
                <span>miles</span>
              </div>
            </div>
            <div className="field">
              <label>Typical response</label>
              <select defaultValue={data.typicalResponse}>
                <option>Within 24 hours</option>
                <option>Within 48 hours</option>
              </select>
            </div>
            <div className="field">
              <label>Survey availability</label>
              <select defaultValue={data.surveyAvailability}>
                <option>Usually within the week</option>
                <option>By appointment</option>
              </select>
            </div>
            <div className="field full">
              <label>Coverage description</label>
              <textarea rows={5} defaultValue={data.coverageDescription}></textarea>
            </div>
            <div className="field full">
              <label>Districts / areas served</label>
              <textarea rows={3} defaultValue={data.districtsServed.join(', ')}></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
