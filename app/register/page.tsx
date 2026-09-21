/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./register.module.css";

type ViewState =
  | "roleSelect"
  | "clientForm"
  | "engineerWizard"
  | "engineerConfirm";

export default function Register() {
  const [view, setView] = useState<ViewState>("roleSelect");
  const [wizardStep, setWizardStep] = useState(1);

  // Engineer Wizard State
  const [coverageTags, setCoverageTags] = useState<string[]>([]);
  const coverageInputRef = useRef<HTMLInputElement>(null);

  const [portfolioFiles, setPortfolioFiles] = useState<
    { url: string; file: File }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRoleSelect = (role: "client" | "engineer") => {
    if (role === "client") {
      setView("clientForm");
    } else {
      setView("engineerWizard");
      setWizardStep(1);
    }
  };

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

  const wizNext = () => setWizardStep((prev) => Math.min(prev + 1, 6));
  const wizPrev = () => setWizardStep((prev) => Math.max(prev - 1, 1));
  const wizSubmit = () => {
    // In a real app, this would submit the data to the server
    setView("engineerConfirm");
  };

  return (
    <div className={styles.container}>
      {/* ROLE SELECT VIEW */}
      <div
        className={`${styles.roleSelect} ${
          view === "roleSelect" ? styles.roleSelectActive : ""
        }`}
      >
        <div className={styles.rsInner}>
          <Link href="/" className={styles.topLogo}>
            <svg
              height="24"
              viewBox="0 0 4389 1743"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "auto" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1462.12 92.1667C1462.12 92.1667 1812.9 364.692 1861.61 450.692C1878.23 480.029 1888.61 513.179 1888.61 548.175V869.129H1165.71V1023.61C1165.71 1033.6 1169.21 1042.6 1176.21 1050.6C1184.21 1057.6 1193.21 1061.1 1203.21 1061.1H1888.61V1223.08H1198.71C1178.36 1223.08 1159.13 1220.2 1141.02 1214.45C1127.09 1210.03 1113.83 1203.9 1101.22 1196.08C1072.23 1178.08 1048.73 1154.59 1030.73 1125.59C1012.74 1096.6 1003.74 1064.1 1003.74 1028.11V548.175C1003.74 512.179 1012.74 479.683 1030.73 450.692C1077.15 375.913 1462.12 92.1667 1462.12 92.1667ZM1203.21 515.179C1193.21 515.179 1184.21 519.179 1176.21 527.179C1169.21 534.179 1165.71 542.679 1165.71 552.675V717.65H1725.13V552.675C1725.13 542.679 1721.63 534.179 1714.64 527.179C1707.64 519.179 1699.14 515.179 1689.14 515.179H1203.21Z"
                fill="#022977"
              />

              <path
                d="M3085.85 1188.07V320.758H4193.92C4230.79 320.758 4263.71 329.729 4292.58 347.675C4321.5 365.621 4344.46 389.046 4361.38 417.958C4379.33 446.867 4388.29 479.267 4388.29 515.154V1188.07H4228.29V519.642C4228.29 509.671 4224.29 501.2 4216.33 494.221C4209.38 486.246 4200.88 482.258 4190.92 482.258H3857.45C3846.48 482.258 3837.51 486.246 3830.53 494.221C3823.55 501.2 3820.07 509.671 3820.07 519.642V1188.07H3657.07V519.642C3657.07 509.671 3653.08 501.2 3645.11 494.221C3638.13 486.246 3629.66 482.258 3619.69 482.258H3284.73C3274.76 482.258 3266.29 486.246 3259.31 494.221C3252.33 501.2 3248.84 509.671 3248.84 519.642V1188.07H3085.85Z"
                fill="#221E1F"
              />

              <path
                d="M2044.65 1188.07V320.758H2732.51C2768.4 320.758 2800.8 329.729 2829.71 347.675C2859.62 365.621 2883.04 389.046 2899.99 417.958C2917.93 446.867 2926.91 479.267 2926.91 515.154V1188.07H2765.41V519.642C2765.41 509.671 2761.42 501.2 2753.45 494.221C2746.47 486.246 2737.99 482.258 2728.03 482.258H2243.53C2233.56 482.258 2224.59 486.246 2216.61 494.221C2209.63 501.2 2206.15 509.671 2206.15 519.642V1188.07H2044.65Z"
                fill="#221E1F"
              />

              <path
                d="M194.396 1188.07C158.508 1188.07 126.108 1179.1 97.2 1161.15C68.2875 1143.2 44.8625 1119.78 26.9167 1090.87C8.97083 1061.96 0 1029.56 0 993.671V971.242H161.5V989.183C161.5 999.154 164.988 1008.12 171.967 1016.1C179.942 1023.08 188.913 1026.57 198.883 1026.57H683.379C693.346 1026.57 701.821 1023.08 708.8 1016.1C715.779 1008.12 719.267 999.154 719.267 989.183V872.546C719.267 862.575 715.779 854.104 708.8 847.125C701.821 839.15 693.346 835.162 683.379 835.162H194.396C158.508 835.162 126.108 826.687 97.2 809.742C68.2875 791.796 44.8625 768.371 26.9167 739.458C8.97083 709.55 0 676.654 0 640.767V515.154C0 479.267 8.97083 446.867 26.9167 417.958C44.8625 389.046 68.2875 365.621 97.2 347.675C126.108 329.729 158.508 320.758 194.396 320.758H687.863C723.754 320.758 756.154 329.729 785.063 347.675C814.971 365.621 838.396 389.046 855.346 417.958C873.288 446.867 882.263 479.267 882.263 515.154V537.587H719.267V519.642C719.267 509.671 715.779 501.2 708.8 494.221C701.821 486.246 693.346 482.258 683.379 482.258H198.883C188.913 482.258 179.942 486.246 171.967 494.221C164.988 501.2 161.5 509.671 161.5 519.642V636.279C161.5 646.25 164.988 655.221 171.967 663.196C179.942 670.175 188.913 673.662 198.883 673.662H687.863C723.754 673.662 756.154 682.638 785.063 700.579C814.971 717.529 838.396 740.954 855.346 770.863C873.288 799.771 882.263 832.171 882.263 868.058V993.671C882.263 1029.56 873.288 1061.96 855.346 1090.87C838.396 1119.78 814.971 1143.2 785.063 1161.15C756.154 1179.1 723.754 1188.07 687.863 1188.07H194.396Z"
                fill="#221E1F"
              />
            </svg>
          </Link>

          <div className={styles.rsTag}>Join SENM</div>

          <h1 className={styles.rsH1}>
            Two sides, <em>one platform.</em>
          </h1>

          <div className={styles.rsCards}>
            {/* Client Card */}
            <div
              className={styles.rsCard}
              onClick={() => handleRoleSelect("client")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleRoleSelect("client");
                }
              }}
            >
              <div className={styles.rsIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 9.5 12 3l9 6.5" />
                  <path d="M5 10v10h14V10" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>

              <h2 className={styles.rsTitle}>
                I&apos;m looking for a structural engineer
              </h2>

              <p className={styles.rsDesc}>
                Homeowners, architects and developers — get matched with
                accredited local engineers and compare fixed-price quotes.
              </p>

              <span className={styles.rsArrow}>&rarr;</span>
            </div>

            {/* Engineer Card */}
            <div
              className={styles.rsCard}
              onClick={() => handleRoleSelect("engineer")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleRoleSelect("engineer");
                }
              }}
            >
              <div className={styles.rsIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
                </svg>
              </div>

              <h2 className={styles.rsTitle}>I&apos;m a structural engineer</h2>

              <p className={styles.rsDesc}>
                Register as a verified IStructE / ICE accredited engineer and
                receive matched project leads.
              </p>

              <span className={styles.rsArrow}>&rarr;</span>
            </div>
          </div>

          <p className={styles.rsFoot}>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
        </div>
      </div>

      {/* CLIENT FORM VIEW */}
      <div
        className={`${styles.clientForm} ${view === "clientForm" ? styles.clientFormActive : ""}`}
      >
        <div className={styles.splitLeft}>
          <div className={styles.slContent}>
            <div className={styles.slEyebrow}>Client Portal</div>
            <h1 className={styles.slH1}>
              Find the perfect engineer for your <em>project.</em>
            </h1>
            <div className={styles.slBody}>
              Create a free account to post your project, receive quotes from
              qualified local engineers, and manage your documents securely in
              one place.
            </div>
            <div className={styles.slStats}>
              <div>
                <div className={styles.slStatV}>500+</div>
                <div className={styles.slStatL}>VETTED ENGINEERS</div>
              </div>
              <div>
                <div className={styles.slStatV}>48h</div>
                <div className={styles.slStatL}>AVG. QUOTE TIME</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.splitRight}>
          <div className={styles.srInner}>
            <button
              className={styles.srBack}
              onClick={() => setView("roleSelect")}
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
              Back to roles
            </button>

            <h2 className={styles.srTitle}>Create Client Account</h2>
            <div className={styles.srSub}>
              Fill in your details below to get started.
            </div>

            <form>
              <div className={styles.field}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>
              <div className={styles.field}>
                <label>Password</label>
                <input type="password" placeholder="Create a strong password" />
                <div className={styles.fieldHint}>
                  Must be at least 8 characters.
                </div>
              </div>
              <div className={styles.consent}>
                <input type="checkbox" id="clientTOS" />
                <label htmlFor="clientTOS">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </label>
              </div>
              <button
                type="button"
                className={styles.btnG}
                onClick={() =>
                  console.log("Client Registration logic goes here")
                }
              >
                Create Account
              </button>
            </form>

            <div className={styles.srFoot}>
              Already have an account? <Link href="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ENGINEER WIZARD VIEW */}
      <div
        className={`${styles.engineerWizard} ${view === "engineerWizard" ? styles.engineerWizardActive : ""}`}
      >
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
                  setView("roleSelect");
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

            <form onSubmit={(e) => e.preventDefault()}>
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
                  <legend className={styles.visuallyHidden}>
                    Personal details
                  </legend>

                  <div className={styles.field} data-field="e1-name">
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

                  <div className={styles.field} data-field="e1-email">
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

                  <div className={styles.field} data-field="e1-phone">
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
                  <legend className={styles.visuallyHidden}>
                    Account details
                  </legend>

                  <div className={styles.field} data-field="e1-password">
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
                  <legend className={styles.visuallyHidden}>
                    Professional qualifications
                  </legend>

                  <div className={styles.field} data-field="e2-specialisms">
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
                    className={styles.field}
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
                    className={styles.field}
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

                  <div className={styles.field} data-field="e2-experience">
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
                  <legend className={styles.visuallyHidden}>
                    Service areas
                  </legend>

                  <div className={styles.field} data-field="e3-coverage">
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
                  <legend className={styles.visuallyHidden}>Pricing</legend>

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
                  <legend className={styles.visuallyHidden}>Portfolio</legend>

                  <div className={styles.field} data-field="e5-portfolio">
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
                  <legend className={styles.visuallyHidden}>Bio</legend>

                  <div className={styles.field} data-field="e6-bio">
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
                      <div className={styles.summaryLabel}>Name & Contact</div>

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
                      <div className={styles.summaryLabel}>Professional</div>

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
                      <div className={styles.summaryLabel}>Coverage</div>

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
                </div>
              </div>

              {/* NAVIGATION */}
              <div className={styles.wizNav}>
                <button
                  type="button"
                  className={styles.wizBtnBack}
                  onClick={() => {
                    if (wizardStep === 1) {
                      setView("roleSelect");
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
                  onClick={wizardStep < 6 ? wizNext : wizSubmit}
                >
                  {wizardStep < 6 ? "Continue →" : "Submit Application"}
                </button>
              </div>

              {wizardStep < 6 && (
                <div className={styles.wizSkipRow}>
                  <button type="button" onClick={wizNext}>
                    Not sure yet? Skip for now and finish later →
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* ENGINEER CONFIRM VIEW */}
      <div
        className={`${styles.engineerConfirm} ${view === "engineerConfirm" ? styles.engineerConfirmActive : ""}`}
      >
        <div className={styles.confirmCard}>
          <div className={styles.confirmIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className={styles.confirmTitle}>Application Submitted!</h2>
          <div className={styles.confirmBody}>
            Thank you for registering with SENM. We have received your
            application and our team will review your details shortly.
          </div>

          <div className={styles.confirmNote}>
            <div className={styles.confirmNoteDot}></div>
            You will receive an email once your profile has been approved and is
            live on the platform.
          </div>

          <Link href="/login" className={styles.btnGLink}>
            Go to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
