'use client';

interface ProfileStepperProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export function ProfileStepper({ currentStep, setCurrentStep }: ProfileStepperProps) {
  const steps = [
    { num: '01', title: 'Identity', desc: 'Name, company & summary' },
    { num: '02', title: 'Expertise', desc: 'Specialisms & capability' },
    { num: '03', title: 'Credentials', desc: 'Verification & coverage' },
    { num: '04', title: 'Projects', desc: 'Portfolio & galleries' },
    { num: '05', title: 'Pricing', desc: 'Fees & delivery' },
    { num: '06', title: 'FAQs', desc: 'Questions & contact' },
    { num: '07', title: 'Review', desc: 'Preview & publish' }
  ];

  return (
    <div aria-label="Profile setup" className="profile-stepper" role="tablist">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = currentStep === stepNum;
        
        return (
          <button
            key={stepNum}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`profile-step ${isActive ? 'active' : ''}`}
            onClick={() => setCurrentStep(stepNum)}
          >
            <span className="profile-step-number">{step.num}</span>
            <span>
              <strong>{step.title}</strong>
            </span>
          </button>
        );
      })}
    </div>
  );
}
