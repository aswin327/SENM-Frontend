'use client';
import type { Profile } from '@/types/profile';

interface ProfileExpertiseProps {
  data: Profile;
}

export function ProfileExpertise({ data }: ProfileExpertiseProps) {
  const allSpecialisms = [
    'Loft Conversions',
    'Extensions',
    'Surveys',
    'Load-bearing walls',
    'Party Wall Matters',
    'New Builds',
    'Foundation Design',
    'Basement Projects',
    'Building Control'
  ];

  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">02</div>
        <h2>Expertise &amp; service capability</h2>
        <p>Define the work you are set up to deliver. These fields support matching and explain your capability to clients.</p>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">02 · Specialisms &amp; service capability</div>
          <h2>What you specialise in</h2>
        </div>
        <p>These fields feed matching and help clients understand the work you are set up to deliver.</p>
      </div>
      <div className="grid2">
        <div className="card">
          <div className="section-title">
            <h2>Specialisms</h2>
            <span>ENGINEER SUPPLIED · EDITABLE</span>
          </div>
          <div className="editable-tags">
            {allSpecialisms.map((spec) => (
              <label key={spec}>
                <input type="checkbox" defaultChecked={data.specialisms.includes(spec)} /> {spec}
              </label>
            ))}
          </div>
          <div className="field" style={{ marginTop: '18px' }}>
            <label>Structural systems / methods</label>
            <textarea 
              placeholder="Add the structural systems and methods you regularly work with" 
              rows={4}
              defaultValue={data.structuralSystems.join(' · ')}
            />
          </div>
        </div>
        <div className="card">
          <div className="section-title">
            <h2>Delivery capability</h2>
            <span>ENGINEER SUPPLIED · EDITABLE</span>
          </div>
          <div className="form-grid">
            <div className="field">
              <label>Building control support</label>
              <select defaultValue={data.buildingControlSupport}>
                <option>Full submission support</option>
                <option>Submission support</option>
                <option>Calculations only</option>
              </select>
            </div>
            <div className="field">
              <label>Calculation standard</label>
              <input defaultValue={data.calculationStandard} />
            </div>
            <div className="field">
              <label>Typical response</label>
              <select defaultValue={data.typicalResponse}>
                <option>Within 24 hours</option>
                <option>Within 48 hours</option>
                <option>2–3 working days</option>
              </select>
            </div>
            <div className="field">
              <label>Survey availability</label>
              <select defaultValue={data.surveyAvailability}>
                <option>Usually within the week</option>
                <option>Next week</option>
                <option>By appointment</option>
              </select>
            </div>
            <div className="field full">
              <label>Service description</label>
              <textarea rows={5} defaultValue="I work directly with homeowners and their builders from initial survey through to building control sign-off."></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
