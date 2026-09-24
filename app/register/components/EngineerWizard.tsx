/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
 
"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import Link from "next/link";
import styles from "../register.module.css";

import { useAuth } from "../../../hooks/useAuth";
import { useRegistrationMutations } from "../../../hooks/useRegistration";
import { usePortfolioMutations } from "../../../hooks/usePortfolio";
import toast from "react-hot-toast";

export function EngineerWizard({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
  
  const [wizardStep, setWizardStep] = useState(1);
  
  const { registerAsync, loginAsync } = useAuth();
  const { updateProfessional, addCoverage, updatePricing, updateBio, completeRegistration } = useRegistrationMutations();
  const { uploadImage } = usePortfolioMutations();
  
  const formRef = useRef<HTMLFormElement>(null);
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // Engineer Wizard State
  const [coverageTags, setCoverageTags] = useState<string[]>([]);
  const coverageInputRef = useRef<HTMLInputElement>(null);

  const [portfolioFiles, setPortfolioFiles] = useState<
    { url: string; file: File }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [prices, setPrices] = useState<Record<string, string>>({
    price1Min: "",
    price1Max: "",
    price2Min: "",
    price2Max: "",
    price3Min: "",
    price3Max: "",
  });

  const pricingServices = [
    { label: "Survey & assessment", min: "price1Min", max: "price1Max" },
    { label: "Structural drawings", min: "price2Min", max: "price2Max" },
    { label: "Complete SE package", min: "price3Min", max: "price3Max" },
  ];

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  const formatPriceRange = (min: string, max: string) => {
    if (min && max) return `£${min} – £${max}`;
    if (min) return `From £${min}`;
    if (max) return `Up to £${max}`;
    return null;
  };

  const pricingSummary = pricingServices
    .map((s) => ({
      label: s.label,
      range: formatPriceRange(prices[s.min], prices[s.max]),
    }))
    .filter((s) => s.range !== null);

  

  const handleAddCoverage = () => {
    if (
      coverageInputRef.current &&
      coverageInputRef.current.value.trim() !== ""
    ) {
      const newTag = coverageInputRef.current.value.trim().toUpperCase();
      if (!coverageTags.includes(newTag)) {
        setCoverageTags([...coverageTags, newTag]);
      }
      coverageInputRef.current.value = "";
    }
  };

  const handleRemoveCoverage = (tagToRemove: string) => {
    setCoverageTags(coverageTags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(
      (f) => f.type.startsWith("image/") || f.type === "application/pdf",
    );
    const newFiles = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPortfolioFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setPortfolioFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const wizPrev = () => setWizardStep((prev) => Math.max(prev - 1, 1));

  const handleWizNext = async () => {
    setApiError("");
    setFieldErrors({});
    
    try {
      const form = formRef.current;
      if (!form) {
        setWizardStep((prev) => Math.min(prev + 1, 6));
        return;
      }
      
      const formData = new FormData(form);
      const errors: Record<string, boolean> = {};
      
      if (wizardStep === 1) {
        const fullName = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const password = formData.get("new-password") as string;
        
        if (!fullName || fullName.trim().length < 2) errors["name"] = true;
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors["email"] = true;
        if (!phone || phone.replace(/\s+/g, '').length < 7) errors["phone"] = true;
        if (!password || password.length < 8) errors["password"] = true;
        
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }
        
        setIsSubmitting(true);
        const phoneCountry = formData.get("phoneCountry") as string || "+44";
        await registerAsync({ fullName, email, phone: `${phoneCountry}${phone.replace(/\s+/g, '')}`, password });
        await loginAsync({ email, password });
        
      } else if (wizardStep === 2) {
        const specialisms = formData.getAll("specialisms") as string[];
        const accreditationBody = formData.get("accredBody") as string;
        const membershipNumber = formData.get("membershipNumber") as string;
        const yearsOfExperience = formData.get("yearsExperience") as string;
        
        if (!specialisms || specialisms.length === 0) errors["specialisms"] = true;
        if (!accreditationBody) errors["accredBody"] = true;
        if (!membershipNumber || membershipNumber.trim().length < 3) errors["membershipNumber"] = true;
        if (!yearsOfExperience || isNaN(Number(yearsOfExperience))) errors["yearsExperience"] = true;
        
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }

        setIsSubmitting(true);
        const specialismMap: Record<string, string> = {
          "Structural Design & Analysis": "STRUCTURAL_DESIGN_ANALYSIS",
          "Loft Conversions": "LOFT_CONVERSION",
          "Rear Extensions": "REAR_EXTENSION",
          "New Builds": "NEW_BUILDS",
          "Party Wall Surveys": "PARTY_WALL_SURVEY",
          "Foundation Assessments": "FOUNDATION_ASSESSMENT"
        };
        const mappedSpecialisms = specialisms.map(s => specialismMap[s] || s);
        
        await updateProfessional({ 
          specialisms: mappedSpecialisms, 
          accreditationBody: accreditationBody as 'IStructE' | 'ICE', 
          membershipNumber, 
          yearsOfExperience: Number(yearsOfExperience) 
        });
        
      } else if (wizardStep === 3) {
        if (coverageTags.length === 0) {
          setFieldErrors({ "coverage": true });
          return;
        }
        
        setIsSubmitting(true);
        for (const tag of coverageTags) {
          await addCoverage({ postcodeOrRegion: tag });
        }
        
      } else if (wizardStep === 4) {
        // Pricing is optional based on current UI, just update
        setIsSubmitting(true);
        await updatePricing({
          siteSurvey: { minimumPrice: Number(prices.price1Min || 0), maximumPrice: Number(prices.price1Max || 0) },
          drawings: { minimumPrice: Number(prices.price2Min || 0), maximumPrice: Number(prices.price2Max || 0) },
          fullPackage: { minimumPrice: Number(prices.price3Min || 0), maximumPrice: Number(prices.price3Max || 0) },
        });
        
      } else if (wizardStep === 5) {
        if (portfolioFiles.length < 2) {
          setFieldErrors({ "portfolio": true });
          return;
        }
        
        setIsSubmitting(true);
        for (const f of portfolioFiles) {
          await uploadImage(f.file);
        }
      }
      
      setWizardStep((prev) => Math.min(prev + 1, 6));
    } catch (error: any) {
      const msg = error.message || "An error occurred";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWizSubmit = async () => {
    setApiError("");
    setFieldErrors({});
    
    try {
      const form = formRef.current;
      if (form) {
        const formData = new FormData(form);
        const bio = formData.get("bio") as string;
        
        if (!bio || bio.trim().length === 0) {
          setFieldErrors({ "bio": true });
          return;
        }
        
        setIsSubmitting(true);
        await updateBio({ bio });
      }
      
      await completeRegistration();
      toast.success("Application submitted successfully!");
      onComplete();
    } catch (error: any) {
      const msg = error.message || "An error occurred submitting application";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.engineerWizard} ${styles.engineerWizardActive}`}>
        {/* SIDEBAR */}
        <div className={styles.wizSidebar}>
          <div className={styles.wizSidebarInner}>
            <div className={styles.wizEyebrow}>Engineer Registration</div>
            <h2 className={styles.wizStepTitle}>
              {wizardStep === 1 && "Basic Details"}
              {wizardStep === 2 && "Professional Details"}
              {wizardStep === 3 && "Coverage Area"}
              {wizardStep === 4 && "Pricing Structure"}
              {wizardStep === 5 && "Portfolio & Docs"}
              {wizardStep === 6 && "Bio & Review"}
            </h2>
            <div className={styles.wizStepDesc}>
              {wizardStep === 1 &&
                "Let’s start with your contact information and login credentials."}
              {wizardStep === 2 &&
                "Tell us about your qualifications and the specific areas you cover."}
              {wizardStep === 3 &&
                "Define the postcodes or regions where you are available to work."}
              {wizardStep === 4 &&
                "Provide indicative pricing to help match you with suitable clients."}
              {wizardStep === 5 &&
                "Upload examples of your work and proof of your qualifications."}
              {wizardStep === 6 &&
                "Add a short bio for your public profile and review your submission."}
            </div>

            <div className={styles.wizSteplist}>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className={`${styles.wizStepitem} ${wizardStep > num ? styles.done : ""} ${wizardStep === num ? styles.active : ""}`}
                >
                  <div className={styles.wizStepnum}>
                    {wizardStep > num ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      num
                    )}
                  </div>
                  {num === 1 && "Basic Details"}
                  {num === 2 && "Professional Details"}
                  {num === 3 && "Coverage Area"}
                  {num === 4 && "Pricing Structure"}
                  {num === 5 && "Portfolio & Docs"}
                  {num === 6 && "Bio & Review"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WIZARD CONTENT */}
        <div className={styles.wizContent}>
          <div className={styles.wizContentInner}>
            <button
              type="button"
              className={styles.wizBack}
              onClick={() => {
                if (wizardStep === 1) {
                  onBack();
                } else {
                  wizPrev();
                }
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>

              {wizardStep === 1 ? "Back" : "Back"}
            </button>

            <div className={styles.wizCounter}>Step {wizardStep} of 6</div>

            <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
              {apiError && <div className={styles.fieldErr} style={{ display: 'block', marginBottom: '1rem', marginTop: '1rem' }}>{apiError}</div>}
              {/* STEP 1: Basic Details */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 1 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="1"
              >
                <h2 className={styles.wizTitle}>Basic details</h2>

                <p className={styles.wizSub}>
                  Your account login and contact information.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Personal details</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["name"] ? styles.error : ""}`} data-field="e1-name">
                    <label htmlFor="e1-name-input">Full name</label>

                    <input
                      type="text"
                      id="e1-name-input"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      aria-required="true"
                    />

                    <div className={styles.fieldErr}>
                      Please enter your name.
                    </div>
                  </div>

                  <div className={`${styles.field} ${fieldErrors["email"] ? styles.error : ""}`} data-field="e1-email">
                    <label htmlFor="e1-email-input">Email address</label>

                    <input
                      type="email"
                      id="e1-email-input"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      aria-required="true"
                    />

                    <div className={styles.fieldErr}>
                      Please enter a valid email.
                    </div>
                  </div>

                  <div className={`${styles.field} ${fieldErrors["phone"] ? styles.error : ""}`} data-field="e1-phone">
                    <label htmlFor="e1-phone-input">Phone number</label>

                    <div className={styles.phoneRow}>
                      <select
                        className={styles.phoneCountrySelect}
                        id="e1-phone-country"
                        name="phoneCountry"
                        autoComplete="tel-country-code"
                        aria-label="Country code"
                        defaultValue="+44"
                      >
                        <option value="+44">UK +44</option>
                        <option value="+353">IE +353</option>
                        <option value="+1">US +1</option>
                        <option value="+33">FR +33</option>
                        <option value="+49">DE +49</option>
                      </select>

                      <input
                        className={styles.phoneNumberInput}
                        type="tel"
                        id="e1-phone-input"
                        name="phone"
                        autoComplete="tel-national"
                        inputMode="tel"
                        pattern="[0-9\s]{7,15}"
                        required
                        aria-required="true"
                        placeholder="7911 123456"
                      />
                    </div>

                    <div className={styles.fieldErr}>
                      Please enter a valid phone number.
                    </div>
                  </div>
                </fieldset>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Account details</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["password"] ? styles.error : ""}`} data-field="e1-password">
                    <label htmlFor="e1-password-input">Password</label>

                    <input
                      type="password"
                      id="e1-password-input"
                      name="new-password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                      aria-required="true"
                    />

                    <div className={styles.fieldHint}>
                      At least 8 characters.
                    </div>

                    <div className={styles.fieldErr}>
                      Password must be at least 8 characters.
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* STEP 2: Professional Details */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 2 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="2"
              >
                <h2 className={styles.wizTitle}>Professional details</h2>

                <p className={styles.wizSub}>
                  Your specialisms and accreditation.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Professional qualifications</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["specialisms"] ? styles.error : ""}`} data-field="e2-specialisms">
                    <fieldset>
                      <legend>Specialisms (select all that apply)</legend>

                      <div className={styles.tagSelect} id="specialismTags">
                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-0"
                          name="specialisms"
                          value="Structural Design & Analysis"
                        />
                        <label className={styles.tagChip} htmlFor="spec-0">
                          Structural Design & Analysis
                        </label>

                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-1"
                          name="specialisms"
                          value="Loft Conversions"
                        />
                        <label className={styles.tagChip} htmlFor="spec-1">
                          Loft Conversions
                        </label>

                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-2"
                          name="specialisms"
                          value="Rear Extensions"
                        />
                        <label className={styles.tagChip} htmlFor="spec-2">
                          Rear Extensions
                        </label>

                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-3"
                          name="specialisms"
                          value="New Builds"
                        />
                        <label className={styles.tagChip} htmlFor="spec-3">
                          New Builds
                        </label>

                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-4"
                          name="specialisms"
                          value="Party Wall Surveys"
                        />
                        <label className={styles.tagChip} htmlFor="spec-4">
                          Party Wall Surveys
                        </label>

                        <input
                          className={styles.tagChipInput}
                          type="checkbox"
                          id="spec-5"
                          name="specialisms"
                          value="Foundation Assessments"
                        />
                        <label className={styles.tagChip} htmlFor="spec-5">
                          Foundation Assessments
                        </label>
                      </div>
                    </fieldset>

                    <div className={styles.fieldErr}>
                      Please select at least one specialism.
                    </div>
                  </div>

                  <div
                    className={`${styles.field} ${fieldErrors["accredBody"] ? styles.error : ""}`}
                    data-field="e2-body"
                    style={{ marginTop: "28px" }}
                  >
                    <fieldset>
                      <legend>Accreditation body</legend>

                      <div className={styles.radioRow}>
                        <div className={styles.radioOpt}>
                          <input
                            type="radio"
                            name="accredBody"
                            id="body-istructe"
                            value="IStructE"
                            required
                          />

                          <label htmlFor="body-istructe">IStructE</label>
                        </div>

                        <div className={styles.radioOpt}>
                          <input
                            type="radio"
                            name="accredBody"
                            id="body-ice"
                            value="ICE"
                          />

                          <label htmlFor="body-ice">ICE</label>
                        </div>
                      </div>
                    </fieldset>

                    <div className={styles.fieldErr}>
                      Please select your accreditation body.
                    </div>
                  </div>

                  <div
                    className={`${styles.field} ${fieldErrors["membershipNumber"] ? styles.error : ""}`}
                    data-field="e2-membership"
                    style={{ marginTop: "24px" }}
                  >
                    <label htmlFor="e2-membership-input">
                      Membership number
                    </label>

                    <input
                      type="text"
                      id="e2-membership-input"
                      name="membershipNumber"
                      autoComplete="off"
                      pattern="[A-Za-z0-9\-\/\s]{3,20}"
                      minLength={3}
                      maxLength={20}
                      required
                      aria-required="true"
                    />

                    <div className={styles.fieldHint}>
                      As shown on your IStructE or ICE certificate.
                    </div>

                    <div className={styles.fieldErr}>
                      Please enter your membership number.
                    </div>
                  </div>

                  <div className={`${styles.field} ${fieldErrors["yearsExperience"] ? styles.error : ""}`} data-field="e2-experience">
                    <label htmlFor="e2-experience-input">
                      Years of experience
                    </label>

                    <input
                      type="number"
                      id="e2-experience-input"
                      name="yearsExperience"
                      inputMode="numeric"
                      min={0}
                      max={60}
                      step={1}
                      required
                      aria-required="true"
                    />

                    <div className={styles.fieldErr}>
                      Please enter your years of experience.
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* STEP 3: Coverage Area */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 3 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="3"
              >
                <h2 className={styles.wizTitle}>Coverage area</h2>

                <p className={styles.wizSub}>
                  Add the postcodes or regions you cover. You can add more than
                  one.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Service areas</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["coverage"] ? styles.error : ""}`} data-field="e3-coverage">
                    <label htmlFor="e3-coverage-input">
                      Postcode area or region
                    </label>

                    <div className={styles.coverageInputRow}>
                      <input
                        type="text"
                        id="e3-coverage-input"
                        name="coverageArea"
                        autoComplete="off"
                        maxLength={40}
                        placeholder="e.g. M1, Manchester"
                        aria-describedby="e3-coverage-hint"
                        ref={coverageInputRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCoverage();
                          }
                        }}
                      />

                      <button
                        type="button"
                        className={styles.coverageAddBtn}
                        onClick={handleAddCoverage}
                      >
                        Add
                      </button>
                    </div>

                    <div className={styles.fieldHint} id="e3-coverage-hint">
                      UK postcode area (e.g. SW1A) or town/region name.
                    </div>

                    <div className={styles.fieldErr}>
                      Please add at least one coverage area.
                    </div>

                    <div
                      className={styles.coverageTags}
                      id="coverageTags"
                      role="list"
                      aria-label="Coverage areas added"
                    >
                      {coverageTags.map((tag) => (
                        <div className={styles.coverageTag} key={tag}>
                          {tag}

                          <button
                            type="button"
                            onClick={() => handleRemoveCoverage(tag)}
                            aria-label={`Remove ${tag}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* STEP 4: Pricing */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 4 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="4"
              >
                <h2 className={styles.wizTitle}>Pricing</h2>

                <p className={styles.wizSub}>
                  Set your typical price range for each service. You can update
                  these any time.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Pricing</span>
                  </legend>

                  <div className={styles.pricingCards}>
                    <div className={styles.pricingCard}>
                      <div className={styles.pricingCardTag}>Site Survey</div>

                      <h3 className={styles.pricingCardTitle}>
                        Survey & assessment
                      </h3>

                      <div className={styles.pricingInputs}>
                        <span className={styles.pfx}>£</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price1-min"
                        >
                          Survey & assessment minimum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price1-min"
                          name="price1Min"
                          value={prices.price1Min}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="400"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />

                        <span className={styles.pricingDash}>–</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price1-max"
                        >
                          Survey & assessment maximum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price1-max"
                          name="price1Max"
                          value={prices.price1Max}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="600"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className={styles.pricingCard}>
                      <div className={styles.pricingCardTag}>Drawings</div>

                      <h3 className={styles.pricingCardTitle}>
                        Structural drawings & calculations
                      </h3>

                      <div className={styles.pricingInputs}>
                        <span className={styles.pfx}>£</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price2-min"
                        >
                          Structural drawings minimum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price2-min"
                          name="price2Min"
                          value={prices.price2Min}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="800"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />

                        <span className={styles.pricingDash}>–</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price2-max"
                        >
                          Structural drawings maximum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price2-max"
                          name="price2Max"
                          value={prices.price2Max}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="1500"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div className={styles.pricingCard}>
                      <div className={styles.pricingCardTag}>Full Package</div>

                      <h3 className={styles.pricingCardTitle}>
                        Complete SE package
                      </h3>

                      <div className={styles.pricingInputs}>
                        <span className={styles.pfx}>£</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price3-min"
                        >
                          Complete SE package minimum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price3-min"
                          name="price3Min"
                          value={prices.price3Min}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="1500"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />

                        <span className={styles.pricingDash}>–</span>

                        <label
                          className={styles.visuallyHidden}
                          htmlFor="price3-max"
                        >
                          Complete SE package maximum price in pounds
                        </label>

                        <input
                          type="number"
                          id="price3-max"
                          name="price3Max"
                          value={prices.price3Max}
                          onChange={handlePriceChange}
                          inputMode="numeric"
                          placeholder="3500"
                          min={0}
                          max={100000}
                          step={10}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* STEP 5: Portfolio */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 5 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="5"
              >
                <h2 className={styles.wizTitle}>Portfolio</h2>

                <p className={styles.wizSub}>
                  Upload at least 2 photos of past projects for your profile
                  grid.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Portfolio</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["portfolio"] ? styles.error : ""}`} data-field="e5-portfolio">
                    <label
                      className={styles.uploadZone}
                      htmlFor="portfolioInput"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>

                      <div className={styles.uploadZoneText}>
                        Click to upload photos
                      </div>

                      <div className={styles.uploadZoneHint}>
                        JPG or PNG, minimum 2 required
                      </div>
                    </label>

                    <input
                      type="file"
                      id="portfolioInput"
                      name="portfolio"
                      accept="image/jpeg,image/png"
                      multiple
                      ref={fileInputRef}
                      className={styles.visuallyHidden}
                      onChange={handleFileSelect}
                    />

                    <div className={styles.fieldErr}>
                      Please upload at least 2 photos.
                    </div>

                    <div
                      className={`${styles.uploadCount} ${
                        portfolioFiles.length >= 2 ? styles.ok : ""
                      }`}
                      id="uploadCount"
                      aria-live="polite"
                    >
                      {portfolioFiles.length} of 2 minimum photos uploaded
                    </div>

                    <div className={styles.uploadThumbs} id="uploadThumbs">
                      {portfolioFiles.map((pf, idx) => (
                        <div className={styles.uploadThumb} key={idx}>
                          <img src={pf.url} alt={`Portfolio ${idx + 1}`} />

                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            aria-label={`Remove portfolio image ${idx + 1}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* STEP 6: Bio & Review */}
              <div
                className={`${styles.wizStepPanel} ${
                  wizardStep === 6 ? styles.wizStepPanelActive : ""
                }`}
                data-panel="6"
              >
                <h2 className={styles.wizTitle}>Bio & review</h2>

                <p className={styles.wizSub}>
                  A short introduction, then check everything looks right.
                </p>

                <fieldset className={styles.fieldGroup}>
                  <legend>
                    <span className={styles.visuallyHidden}>Bio</span>
                  </legend>

                  <div className={`${styles.field} ${fieldErrors["bio"] ? styles.error : ""}`} data-field="e6-bio">
                    <label htmlFor="e6-bio-input">Bio</label>

                    <textarea
                      className={styles.wizTextarea}
                      id="e6-bio-input"
                      name="bio"
                      autoComplete="off"
                      maxLength={600}
                      required
                      aria-required="true"
                      aria-describedby="e6-bio-hint"
                      placeholder="Tell homeowners about your experience and approach..."
                    />

                    <div className={styles.fieldHint} id="e6-bio-hint">
                      Max 600 characters.
                    </div>

                    <div className={styles.fieldErr}>
                      Please add a short bio.
                    </div>
                  </div>
                </fieldset>

                <div id="wizSummary" style={{ marginTop: "12px" }}>
                  <h4
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "18px",
                      fontWeight: 400,
                      marginTop: "36px",
                      marginBottom: "16px",
                    }}
                  >
                    Summary
                  </h4>

                  <div className={styles.summaryBlock}>
                    <div>
                      <div className={styles.summaryLabel}>Basic details</div>

                      <div className={styles.summaryValue}>
                        John Smith
                        <br />
                        john@example.com
                        <br />
                        +44 7912 345678
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.summaryEdit}
                      onClick={() => setWizardStep(1)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className={styles.summaryBlock}>
                    <div>
                      <div className={styles.summaryLabel}>PROFESSIONAL DETAILS</div>

                      <div className={styles.summaryValue}>
                        IStructE
                        <br />
                        Structural Design & Analysis
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.summaryEdit}
                      onClick={() => setWizardStep(2)}
                    >
                      Edit
                    </button>
                  </div>

                  <div className={styles.summaryBlock}>
                    <div>
                      <div className={styles.summaryLabel}>COVERAGE AREA</div>

                      <div className={styles.summaryValue}>
                        {coverageTags.length > 0
                          ? coverageTags.join(", ")
                          : "None added"}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.summaryEdit}
                      onClick={() => setWizardStep(3)}
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className={styles.summaryBlock}>
                    <div>
                      <div className={styles.summaryLabel}>PRICING</div>

                      <div className={styles.summaryValue}>
                        {pricingSummary.length > 0
                          ? pricingSummary.map((s, idx) => (
                              <React.Fragment key={s.label}>
                                {idx > 0 && <br />}
                                {s.label}: {s.range}
                              </React.Fragment>
                            ))
                          : "None added"}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.summaryEdit}
                      onClick={() => setWizardStep(4)}
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className={styles.summaryBlock}>
                    <div>
                      <div className={styles.summaryLabel}>PORTFOLIO</div>

                      <div className={styles.summaryValue}>
                        {portfolioFiles.length > 0
                          ? `${portfolioFiles.length} photo${
                              portfolioFiles.length === 1 ? "" : "s"
                            } uploaded`
                          : "None added"}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={styles.summaryEdit}
                      onClick={() => setWizardStep(5)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* NAVIGATION */}
              <div className={styles.wizNav}>
                <button
                  type="button"
                  className={styles.wizBtnBack}
                  onClick={() => {
                    if (wizardStep === 1) {
                      onBack();
                    } else {
                      wizPrev();
                    }
                  }}
                >
                  {wizardStep === 1 ? "Back" : "Back"}
                </button>

                <button
                  type="button"
                  className={styles.wizBtnNext}
                  disabled={isSubmitting}
                  onClick={wizardStep < 6 ? handleWizNext : handleWizSubmit}
                >
                  {isSubmitting ? "Saving..." : wizardStep < 6 ? "Continue →" : "Submit Application"}
                </button>
              </div>

              {wizardStep < 6 && (
                <div className={styles.wizSkipRow}>
                  <button type="button" disabled={isSubmitting} onClick={() => setWizardStep((prev) => Math.min(prev + 1, 6))}>
                    Not sure yet? Skip for now and finish later →
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
  );
}
