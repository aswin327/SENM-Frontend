'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quoteBuilderData } from '@/data/quote-builder';

export default function QuoteBuilder() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const setStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitQuote = () => {
    alert("Quote submitted!");
    router.push('/quotes');
  };

  return (
    <section className="view active" id="quote-builder">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Opportunity · {quoteBuilderData.projectLocation} · Fixed-price quote</div>
          <h1>Prepare your quote</h1>
          <p>{quoteBuilderData.projectTitle} · {quoteBuilderData.projectClient}</p>
        </div>
        <div className="head-actions">
          <button className="secondary" onClick={() => router.push('/opportunities')} type="button">Save &amp; exit</button>
        </div>
      </div>
      <div className="quote-shell">
        <div aria-label="Quote builder steps" className="quote-stepper" role="tablist">
          <button className={`quote-step ${currentStep === 1 ? 'active' : ''}`} onClick={() => setStep(1)} type="button"><span>01</span><strong>Services</strong><small>Scope</small></button>
          <button className={`quote-step ${currentStep === 2 ? 'active' : ''}`} onClick={() => setStep(2)} type="button"><span>02</span><strong>Price</strong><small>Fixed fee</small></button>
          <button className={`quote-step ${currentStep === 3 ? 'active' : ''}`} onClick={() => setStep(3)} type="button"><span>03</span><strong>Included</strong><small>Deliverables</small></button>
          <button className={`quote-step ${currentStep === 4 ? 'active' : ''}`} onClick={() => setStep(4)} type="button"><span>04</span><strong>Excluded</strong><small>Boundaries</small></button>
          <button className={`quote-step ${currentStep === 5 ? 'active' : ''}`} onClick={() => setStep(5)} type="button"><span>05</span><strong>Turnaround</strong><small>Timing</small></button>
          <button className={`quote-step ${currentStep === 6 ? 'active' : ''}`} onClick={() => setStep(6)} type="button"><span>06</span><strong>Review</strong><small>Submit</small></button>
        </div>

        {currentStep === 1 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div className="card">
                <div className="section-title"><h2>Services required</h2><span>CLIENT GENERATED</span></div>
                <p className="small muted">Select the structural services you are pricing for this project.</p>
                <div className="service-list">
                  {quoteBuilderData.services.map(s => (
                    <label key={s.id} className={`service-row ${s.defaultSelected ? 'checked' : ''}`}>
                      <input defaultChecked={s.defaultSelected} type="checkbox"/>
                      <span><strong>{s.name}</strong><small>{s.description}</small></span>
                      <b>{s.type}</b>
                    </label>
                  ))}
                </div>
                <div className="quote-actions">
                  <button className="secondary" onClick={() => setStep(6)} type="button">Save draft</button>
                  <button className="primary" onClick={() => setStep(2)} type="button">Continue to price →</button>
                </div>
              </div>
              <aside>
                <div className="rail">
                  <div className="rail-head"><h3>Project scope</h3><span>{quoteBuilderData.projectLocation}</span></div>
                  <div className="data-stack">
                    <div><span>Project</span><strong>{quoteBuilderData.projectType}</strong></div>
                    <div><span>Stage</span><strong>{quoteBuilderData.projectStage}</strong></div>
                    <div><span>Required</span><strong>{quoteBuilderData.projectRequired}</strong></div>
                    <div><span>Documents</span><strong>{quoteBuilderData.projectDocs}</strong></div>
                  </div>
                </div>
                <div className="rail"><div className="rail-head"><h3>Quote principle</h3></div><p className="small">SENM presents your quote as a fixed-price, itemised offer. Only services you include will be shown to the client.</p></div>
              </aside>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div className="card">
                <div className="section-title"><h2>Set your fixed price</h2><span>ENGINEER SUPPLIED</span></div>
                <p className="small muted">Enter the amount the client will see for each selected service.</p>
                <div className="price-editor">
                  {quoteBuilderData.services.filter(s => s.defaultSelected).map((s, i) => (
                    <div key={s.id} className="price-editor-row">
                      <div><strong>{s.name}</strong><small>{s.description}</small></div>
                      <div className="money"><span>£</span><input defaultValue={[650, 700, 150][i] || 0}/></div>
                    </div>
                  ))}
                </div>
                <div className="total-bar"><span>Client-facing fixed price</span><strong>£1,500</strong></div>
                <div className="quote-actions"><button className="secondary" onClick={() => setStep(1)} type="button">← Back</button><button className="primary" onClick={() => setStep(3)} type="button">Continue to included →</button></div>
              </div>
              <aside>
                <div className="quote-preview"><div className="label eyebrow">Client quote</div><h3>Hughes &amp; Partners Ltd</h3><p className="small muted">James Hughes · CEng · MIStructE</p><div className="preview-total">£1,500</div><div className="small muted">Fixed price · no hidden costs</div><div className="preview-lines">
                  <div><span>Calculations</span><strong>£650</strong></div><div><span>Drawings</span><strong>£700</strong></div><div><span>Building Control</span><strong>£150</strong></div>
                </div></div>
              </aside>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div className="card">
                <div className="section-title"><h2>What’s included</h2><span>CLIENT-FACING</span></div>
                <p className="small muted">Be explicit about what the fixed price covers.</p>
                <div className="form-grid">
                  <div className="field full"><label>Included services &amp; deliverables</label><textarea defaultValue={`Eurocode structural calculations for the proposed loft conversion.\nStructural drawings suitable for Building Control submission.\nBuilding Control liaison and submission.\nReasonable revisions to the structural package until sign-off.`} /></div>
                </div>
                <div className="quick-tags">
                  {quoteBuilderData.includedTags.map(tag => <button key={tag} type="button">{tag}</button>)}
                </div>
                <div className="quote-actions"><button className="secondary" onClick={() => setStep(2)} type="button">← Back</button><button className="primary" onClick={() => setStep(4)} type="button">Continue to exclusions →</button></div>
              </div>
              <aside>
                <div className="rail"><div className="rail-head"><h3>Client sees</h3><span>PREVIEW</span></div><div className="preview-copy">A clear list of deliverables attached to the £1,500 fixed price.</div></div>
                <div className="rail"><div className="rail-head"><h3>Tip</h3></div><p className="small">Keep scope concrete. Avoid vague terms such as “full structural service” where a specific deliverable can be named.</p></div>
              </aside>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div className="card">
                <div className="section-title"><h2>What’s not included</h2><span>CLIENT-FACING</span></div>
                <p className="small muted">Define exclusions so the fixed price has a clear boundary.</p>
                <div className="form-grid">
                  <div className="field full"><label>Exclusions</label><textarea defaultValue={`Site survey unless specifically selected.\nPlanning application fees.\nSpecialist surveys, testing or opening-up works.\nChanges to the agreed design brief after calculations have commenced.\nAdditional site visits outside the agreed scope.`} /></div>
                </div>
                <div className="quick-tags">
                  {quoteBuilderData.excludedTags.map(tag => <button key={tag} type="button">{tag}</button>)}
                </div>
                <div className="quote-actions"><button className="secondary" onClick={() => setStep(3)} type="button">← Back</button><button className="primary" onClick={() => setStep(5)} type="button">Continue to turnaround →</button></div>
              </div>
              <aside>
                <div className="rail"><div className="rail-head"><h3>Scope control</h3></div><p className="small">If the client requests work outside this scope after award, the project can be discussed separately before any additional work begins.</p></div>
              </aside>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div className="card">
                <div className="section-title"><h2>Turnaround &amp; availability</h2><span>ENGINEER SUPPLIED</span></div>
                <div className="form-grid">
                  <div className="field">
                    <label>Initial calculations</label>
                    <select>
                      {quoteBuilderData.turnaroundOptions.calculations.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Drawing package</label>
                    <select>
                      {quoteBuilderData.turnaroundOptions.drawings.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Start availability</label>
                    <select>
                      {quoteBuilderData.turnaroundOptions.availability.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Typical response</label><input defaultValue="Within 24 hours"/></div>
                  <div className="field full"><label>Additional timing note</label><textarea defaultValue="Timescales begin once complete architectural information and the agreed scope have been received." /></div>
                </div>
                <div className="callout"><strong>Current availability</strong><br/><span className="small">Available for new projects this week · typical response within 24 hours.</span></div>
                <div className="quote-actions"><button className="secondary" onClick={() => setStep(4)} type="button">← Back</button><button className="primary" onClick={() => setStep(6)} type="button">Review quote →</button></div>
              </div>
              <aside>
                <div className="rail"><div className="rail-head"><h3>Project timing</h3><span>CLIENT TARGET</span></div><div className="data-stack"><div><span>Target start</span><strong>{quoteBuilderData.targetStart}</strong></div><div><span>Scope needed</span><strong>{quoteBuilderData.scopeNeeded}</strong></div></div></div>
              </aside>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="quote-panel active">
            <div className="quote-grid">
              <div>
                <div className="card">
                  <div className="section-title"><h2>Review before submitting</h2><span>FINAL CHECK</span></div>
                  <div className="review-check"><span className="review-icon">✓</span><div><strong>Services selected</strong><p>Structural calculations, structural drawings and Building Control support.</p></div><button className="link-btn" onClick={() => setStep(1)} type="button">Edit</button></div>
                  <div className="review-check"><span className="review-icon">✓</span><div><strong>Fixed price</strong><p>£1,500 itemised across the selected services.</p></div><button className="link-btn" onClick={() => setStep(2)} type="button">Edit</button></div>
                  <div className="review-check"><span className="review-icon">✓</span><div><strong>Scope defined</strong><p>Included deliverables and exclusions are clearly stated.</p></div><button className="link-btn" onClick={() => setStep(3)} type="button">Edit</button></div>
                  <div className="review-check"><span className="review-icon">✓</span><div><strong>Turnaround confirmed</strong><p>Initial calculations within 5 working days of complete information.</p></div><button className="link-btn" onClick={() => setStep(5)} type="button">Edit</button></div>
                </div>
                <div className="card"><div className="section-title"><h2>Additional note to client</h2><span>OPTIONAL</span></div><textarea style={{width: '100%', minHeight: '95px', border: '1px solid var(--border-dark)', padding: '10px'}} defaultValue="Thanks for the opportunity. I’ll review the supplied architectural information in detail once the project is awarded and confirm any points requiring clarification." /></div>
                <div className="quote-actions final-actions"><button className="secondary" onClick={() => setStep(5)} type="button">← Back</button><button className="primary" onClick={submitQuote} type="button">Submit fixed-price quote · £1,500</button></div>
              </div>
              <aside>
                <div className="quote-preview"><div className="label eyebrow">Client-facing quote</div><h3>Hughes &amp; Partners Ltd</h3><p className="small muted">James Hughes · CEng · MIStructE</p><div className="preview-total">£1,500</div><div className="status green">FIXED PRICE · NO HIDDEN COSTS</div><div className="preview-section"><strong>Includes</strong><p>Calculations · Drawings · Building Control support · Revisions until sign-off</p></div><div className="preview-section"><strong>Turnaround</strong><p>Initial calculations within 5 working days of complete information.</p></div></div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
