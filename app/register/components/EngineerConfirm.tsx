import React from "react";
import Link from "next/link";
import styles from "../register.module.css";

export function EngineerConfirm() {
  return (
    <div className={styles.engineerConfirmActive}>
      <div className={styles.confirmCard}>
        <div className={styles.confirmIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
  );
}
