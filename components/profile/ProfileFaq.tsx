'use client';
import type { Profile } from '@/types/profile';

interface ProfileFaqProps {
  data: Profile;
}

export function ProfileFaq({ data }: ProfileFaqProps) {
  return (
    <div className="profile-step-panel active">
      <div className="profile-step-heading">
        <div className="eyebrow">06</div>
        <h2>FAQs &amp; contact</h2>
        <p>Answer the questions clients ask most often and make sure your contact details are current.</p>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">10 · FAQs</div>
          <h2>Questions homeowners often ask</h2>
        </div>
        <p>Maintain the answers shown on your public engineer profile.</p>
      </div>
      <div className="faq-editor">
        {data.faqs.map((faq, index) => {
          const numStr = (index + 1).toString().padStart(2, '0');
          return (
            <div key={faq.id} className="faq-edit-row">
              <span>{numStr}</span>
              <div className="field">
                <label>Question</label>
                <input defaultValue={faq.question} />
              </div>
              <div className="field">
                <label>Answer</label>
                <textarea rows={5} defaultValue={faq.answer}></textarea>
              </div>
              <button className="link-btn" type="button">Remove</button>
            </div>
          );
        })}
      </div>
      <div className="center-action">
        <button className="secondary" type="button">+ Add FAQ</button>
      </div>
      <div className="profile-section-heading">
        <div>
          <div className="eyebrow">11 · Direct contact</div>
          <h2>How clients can reach you</h2>
        </div>
        <p>These contact details are displayed on the public profile.</p>
      </div>
      <div className="card">
        <div className="form-grid">
          <div className="field">
            <label>Email address</label>
            <input type="email" defaultValue={data.contactEmail} />
          </div>
          <div className="field">
            <label>Phone number</label>
            <input defaultValue={data.contactPhone} />
          </div>
          <div className="field full">
            <label>Contact call-to-action</label>
            <input defaultValue={data.contactCta} />
          </div>
        </div>
      </div>
    </div>
  );
}
