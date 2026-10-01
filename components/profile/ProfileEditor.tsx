'use client';
import { useState, useEffect } from 'react';
import { ProfileStepper } from './ProfileStepper';
import { ProfileIdentity } from './ProfileIdentity';
import { ProfileExpertise } from './ProfileExpertise';
import { ProfileCredentials } from './ProfileCredentials';
import { ProfileProjects } from './ProfileProjects';
import { ProfilePricing } from './ProfilePricing';
import { ProfileFaq } from './ProfileFaq';
import { ProfileReviews } from './ProfileReviews';

import { profileData as fallbackData } from '@/data/profile';
import { profileProjects } from '@/data/projects';
import { reviews, reviewStats } from '@/data/reviews';

import { useProfile } from '../../hooks/useProfile';
import type { Profile } from '@/types/profile';
import { toast } from 'react-hot-toast';

export default function ProfileEditor() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { profile, isLoading, isError, updateProfileAsync } = useProfile();
  const [localData, setLocalData] = useState<Profile>(fallbackData);

  useEffect(() => {
    if (profile) {
      // Map Pricing
      const updatedPricingServices = fallbackData.pricingServices.map((service) => {
        if (service.name === 'Site survey' && profile.pricing?.siteSurvey) {
          return { ...service, priceFrom: profile.pricing.siteSurvey.minimumPrice ?? service.priceFrom, priceTo: profile.pricing.siteSurvey.maximumPrice ?? service.priceTo };
        }
        if (service.name === 'Structural drawings' && profile.pricing?.drawings) {
          return { ...service, priceFrom: profile.pricing.drawings.minimumPrice ?? service.priceFrom, priceTo: profile.pricing.drawings.maximumPrice ?? service.priceTo };
        }
        if (service.name === 'Full package' && profile.pricing?.fullPackage) {
          return { ...service, priceFrom: profile.pricing.fullPackage.minimumPrice ?? service.priceFrom, priceTo: profile.pricing.fullPackage.maximumPrice ?? service.priceTo };
        }
        return service;
      });

      setLocalData({
        ...fallbackData,
        displayName: profile.fullName || 'N/A',
        contactPhone: profile.phone || 'N/A',
        contactEmail: profile.email || 'N/A',
        baseLocation: profile.coverageAreas?.[0]?.postcodeOrRegion || 'N/A',
        yearsOfExperience: profile.professional?.yearsOfExperience ?? fallbackData.yearsOfExperience,
        specialisms: profile.professional?.specialisms || fallbackData.specialisms,
        summary: profile.bio || fallbackData.summary,
        pricingServices: updatedPricingServices,
      });
    }
  }, [profile]);

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = async () => {
    try {
      // Collect values from the DOM for demonstration purposes since existing components use uncontrolled inputs (defaultValue)
      const fullName = (document.getElementById('profileDisplayName') as HTMLInputElement)?.value || localData.displayName;
      const bio = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || localData.summary;
      
      await updateProfileAsync({
        fullName,
        bio,
      });
      toast.success('Profile saved successfully');
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  if (isLoading) {
    return (
      <section className="view active" id="profile">
        <div className="page-head animate-pulse">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96"></div>
          </div>
        </div>
        <div className="profile-editor-note animate-pulse mt-8">
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="grid2 profile-main-grid animate-pulse mt-8">
          <div className="card h-64 bg-gray-100 rounded"></div>
          <aside>
            <div className="rail h-48 bg-gray-100 rounded mb-4"></div>
            <div className="rail h-48 bg-gray-100 rounded"></div>
          </aside>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="view active" id="profile">
        <div className="p-8 text-center text-red-600 bg-red-50 border border-red-200 rounded mt-8 mx-8">
          <h2 className="text-lg font-semibold mb-2">Failed to load profile data</h2>
          <p>Please try refreshing the page or logging in again.</p>
        </div>
      </section>
    );
  }

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


      {currentStep === 1 && <ProfileIdentity data={localData} />}
      {currentStep === 2 && <ProfileExpertise data={localData} />}
      {currentStep === 3 && <ProfileCredentials data={localData} />}
      {currentStep === 4 && <ProfileProjects projects={profileProjects} />}
      {currentStep === 5 && <ProfilePricing data={localData} />}
      {currentStep === 6 && <ProfileFaq data={localData} />}
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
            else handleSave();
          }}
        >
          {currentStep === 7 ? 'SAVE PROFILE →' : 'Continue →'}
        </button>
      </div>
    </section>
  );
}
