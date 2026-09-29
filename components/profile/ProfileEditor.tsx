'use client';
import { useState } from 'react';
import { ProfileStepper } from './ProfileStepper';
import { ProfileIdentity } from './ProfileIdentity';
import { ProfileExpertise } from './ProfileExpertise';
import { ProfileCredentials } from './ProfileCredentials';
import { ProfileProjects } from './ProfileProjects';
import { ProfilePricing } from './ProfilePricing';
import { ProfileFaq } from './ProfileFaq';
import { ProfileReviews } from './ProfileReviews';

import { profileData } from '@/data/profile';
import { profileProjects } from '@/data/projects';
import { reviews, reviewStats } from '@/data/reviews';

export default function ProfileEditor() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <section className="view active" id="profile">
      <div className="page-head">
        <div>
          <div className="label eyebrow">Engineer profile · editable</div>
          <h1>Your SENM profile</h1>
          <p>Manage every engineer-supplied detail clients use for matching, trust, comparison and quoting.</p>
        </div>
      </div>

      <ProfileStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />

      <div className="profile-editor-note">
        <strong>EDITABLE PROFILE</strong>
        <span>Anything marked <b>ENGINEER SUPPLIED</b> can be changed here. SENM-verified credentials, insurance and verified reviews remain read-only and are maintained through verification.</span>
      </div>

      {currentStep === 1 && <ProfileIdentity data={profileData} />}
      {currentStep === 2 && <ProfileExpertise data={profileData} />}
      {currentStep === 3 && <ProfileCredentials data={profileData} />}
      {currentStep === 4 && <ProfileProjects projects={profileProjects} />}
      {currentStep === 5 && <ProfilePricing data={profileData} />}
      {currentStep === 6 && <ProfileFaq data={profileData} />}
      {currentStep === 7 && <ProfileReviews reviews={reviews} stats={reviewStats} />}

      <div className="profile-step-actions">
        <button 
          className="secondary" 
          id="profileBack" 
          type="button" 
          onClick={handleBack}
          disabled={currentStep === 1}
          style={{ opacity: currentStep === 1 ? 0.5 : 1 }}
        >
          ← Back
        </button>
        <div className="profile-step-status" id="profileStepStatus">STEP {currentStep} OF 7</div>
        <button 
          className="primary" 
          id="profileNext" 
          type="button" 
          onClick={() => {
            if (currentStep < 7) handleNext();
            else alert('Profile Saved!');
          }}
        >
          {currentStep === 7 ? 'SAVE PROFILE →' : 'Continue →'}
        </button>
      </div>
    </section>
  );
}
