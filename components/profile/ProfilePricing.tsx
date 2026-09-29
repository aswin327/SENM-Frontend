'use client';
import type { Profile } from '@/types/profile';

interface ProfilePricingProps {
  data: Profile;
}

export function ProfilePricing({ data }: ProfilePricingProps) {
  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">05</div>
        <h2>Pricing &amp; delivery</h2>
        <p>Set the commercial information clients see before they request a fixed-price quote, then define your standard delivery commitments.</p>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">06 · Pricing</div>
          <h2>Pricing by service</h2>
        </div>
        <p>Set the typical ranges clients see before requesting a fixed, itemised quote.</p>
      </div>
      <div className="pricing-editor-grid">
        {data.pricingServices.map((service) => (
          <div key={service.id} className="price-editor-card">
            <div className="section-title">
              <h3>{service.name}</h3>
              <span>ENGINEER SUPPLIED · EDITABLE</span>
            </div>
            <div className="price-range">
              <div>
                <label>From</label>
                <div className="money">
                  <span>£</span><input defaultValue={service.priceFrom} type="number" />
                </div>
              </div>
              <div className="range-dash">–</div>
              <div>
                <label>To</label>
                <div className="money">
                  <span>£</span><input defaultValue={service.priceTo} type="number" />
                </div>
              </div>
            </div>
            <div className="field">
              <label>What's included</label>
              <textarea rows={4} defaultValue={service.inclusions.join('\n')}></textarea>
            </div>
          </div>
        ))}
      </div>
      <div className="card pricing-policy-editor">
        <div className="section-title">
          <h2>Pricing policy</h2>
          <span>ENGINEER SUPPLIED · EDITABLE</span>
        </div>
        <div className="form-grid">
          <div className="field">
            <label>Quote model</label>
            <select defaultValue={data.quoteModel}>
              <option>Fixed-price, itemised</option>
              <option>Fixed-price</option>
              <option>Scope dependent</option>
            </select>
          </div>
          <div className="field">
            <label>Hidden costs</label>
            <select defaultValue={data.hiddenCosts}>
              <option>No hidden costs</option>
              <option>Additional costs may apply</option>
            </select>
          </div>
          <div className="field full">
            <label>Client-facing pricing note</label>
            <textarea rows={3} defaultValue={data.pricingNote}></textarea>
          </div>
        </div>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">07 · Standard inclusions</div>
          <h2>What is included as standard</h2>
        </div>
        <p>Control the standard service commitments shown on your public profile.</p>
      </div>
      <div className="card">
        <div className="editable-check-grid">
          {data.standardInclusions.map((inclusion, idx) => (
            <label key={idx}>
              <input type="checkbox" defaultChecked /> {inclusion}
            </label>
          ))}
        </div>
        <div className="field" style={{ marginTop: '18px' }}>
          <label>Additional standard inclusion</label>
          <input placeholder="Add another included service" />
        </div>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">08 · How I work</div>
          <h2>From first enquiry to project sign-off</h2>
        </div>
        <p>Set the four stages and client-facing descriptions for your typical process.</p>
      </div>
      <div className="workflow-editor">
        {data.workflow.map((stage, index) => {
          const numStr = (index + 1).toString().padStart(2, '0');
          return (
            <div key={stage.id}>
              <span>{numStr}</span>
              <div className="field">
                <label>Stage</label>
                <input defaultValue={stage.stageName} />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea rows={4} defaultValue={stage.description}></textarea>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
