import React from "react";
import Link from "next/link";
import styles from "../register.module.css";

interface ClientFormProps {
  onBack: () => void;
}

export function ClientForm({ onBack }: ClientFormProps) {
  return (
    <div className={styles.clientFormActive}>
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
          <button className={styles.srBack} onClick={onBack}>
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
              onClick={() => console.log("Client Registration logic goes here")}
            >
              Create Account
            </button>
          </form>

          <div className={styles.srFoot}>
            Already have an account? <Link href="/login">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
