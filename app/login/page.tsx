'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

export default function EngineerLogin() {
  const router = useRouter();
  const { loginAsync, isLoggingIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [role, setRole] = useState<'client' | 'engineer'>('client');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }
    
    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }
    
    if (valid) {
      try {
        await loginAsync({ email, password });
        toast.success("Successfully logged in!");
        router.push('/'); // or appropriate redirect
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Login failed';
        toast.error(msg);
      }
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.signinView}>
        <div className={styles.splitLeft}>
          <div className={styles.slContent}>
            <div className={styles.slEyebrow}>Welcome back</div>
            {role === 'client' ? (
              <>
                <h1 className={styles.slH1}>
                  Welcome back. <em>Pick up where you left off with your saved engineers and quotes.</em>
                </h1>
                <p className={styles.slBody}>
                  Sign in to track your project, manage quotes and communicate with engineers &mdash; all in one place.
                </p>
              </>
            ) : (
              <>
                <h1 className={styles.slH1}>
                  Welcome back. <em>Your matched briefs are waiting.</em>
                </h1>
                <p className={styles.slBody}>
                  Sign in to view matched project briefs, manage your profile and track your pipeline.
                </p>
              </>
            )}
            <div className={styles.slStats}>
              <div>
                <div className={styles.slStatV}>500+</div>
                <div className={styles.slStatL}>Engineers</div>
              </div>
              <div>
                <div className={styles.slStatV}>48h</div>
                <div className={styles.slStatL}>Avg. quote</div>
              </div>
              <div>
                <div className={styles.slStatV}>4.9&#9733;</div>
                <div className={styles.slStatL}>Avg. rating</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.splitRight}>
          <div className={styles.srInner}>
            <Link href="/" className={styles.srLogo}>
              <svg height="64" viewBox="0 0 4389 1743" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'auto' }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M1462.12 92.1667C1462.12 92.1667 1812.9 364.692 1861.61 450.692C1878.23 480.029 1888.61 513.179 1888.61 548.175V869.129H1165.71V1023.61C1165.71 1033.6 1169.21 1042.6 1176.21 1050.6C1184.21 1057.6 1193.21 1061.1 1203.21 1061.1H1888.61V1223.08H1198.71C1178.36 1223.08 1159.13 1220.2 1141.02 1214.45C1127.09 1210.03 1113.83 1203.9 1101.22 1196.08C1072.23 1178.08 1048.73 1154.59 1030.73 1125.59C1012.74 1096.6 1003.74 1064.1 1003.74 1028.11V548.175C1003.74 512.179 1012.74 479.683 1030.73 450.692C1077.15 375.913 1462.12 92.1667 1462.12 92.1667ZM1203.21 515.179C1193.21 515.179 1184.21 519.179 1176.21 527.179C1169.21 534.179 1165.71 542.679 1165.71 552.675V717.65H1725.13V552.675C1725.13 542.679 1721.63 534.179 1714.64 527.179C1707.64 519.179 1699.14 515.179 1689.14 515.179H1203.21Z" fill="#022977"/>
                <path d="M3085.85 1188.07V320.758H4193.92C4230.79 320.758 4263.71 329.729 4292.58 347.675C4321.5 365.621 4344.46 389.046 4361.38 417.958C4379.33 446.867 4388.29 479.267 4388.29 515.154V1188.07H4228.29V519.642C4228.29 509.671 4224.29 501.2 4216.33 494.221C4209.38 486.246 4200.88 482.258 4190.92 482.258H3857.45C3846.48 482.258 3837.51 486.246 3830.53 494.221C3823.55 501.2 3820.07 509.671 3820.07 519.642V1188.07H3657.07V519.642C3657.07 509.671 3653.08 501.2 3645.11 494.221C3638.13 486.246 3629.66 482.258 3619.69 482.258H3284.73C3274.76 482.258 3266.29 486.246 3259.31 494.221C3252.33 501.2 3248.84 509.671 3248.84 519.642V1188.07H3085.85Z" fill="#221E1F"/>
                <path d="M2044.65 1188.07V320.758H2732.51C2768.4 320.758 2800.8 329.729 2829.71 347.675C2859.62 365.621 2883.04 389.046 2899.99 417.958C2917.93 446.867 2926.91 479.267 2926.91 515.154V1188.07H2765.41V519.642C2765.41 509.671 2761.42 501.2 2753.45 494.221C2746.47 486.246 2737.99 482.258 2728.03 482.258H2243.53C2233.56 482.258 2224.59 486.246 2216.61 494.221C2209.63 501.2 2206.15 509.671 2206.15 519.642V1188.07H2044.65Z" fill="#221E1F"/>
                <path d="M194.396 1188.07C158.508 1188.07 126.108 1179.1 97.2 1161.15C68.2875 1143.2 44.8625 1119.78 26.9167 1090.87C8.97083 1061.96 0 1029.56 0 993.671V971.242H161.5V989.183C161.5 999.154 164.988 1008.12 171.967 1016.1C179.942 1023.08 188.913 1026.57 198.883 1026.57H683.379C693.346 1026.57 701.821 1023.08 708.8 1016.1C715.779 1008.12 719.267 999.154 719.267 989.183V872.546C719.267 862.575 715.779 854.104 708.8 847.125C701.821 839.15 693.346 835.162 683.379 835.162H194.396C158.508 835.162 126.108 826.687 97.2 809.742C68.2875 791.796 44.8625 768.371 26.9167 739.458C8.97083 709.55 0 676.654 0 640.767V515.154C0 479.267 8.97083 446.867 26.9167 417.958C44.8625 389.046 68.2875 365.621 97.2 347.675C126.108 329.729 158.508 320.758 194.396 320.758H687.863C723.754 320.758 756.154 329.729 785.063 347.675C814.971 365.621 838.396 389.046 855.346 417.958C873.288 446.867 882.263 479.267 882.263 515.154V537.587H719.267V519.642C719.267 509.671 715.779 501.2 708.8 494.221C701.821 486.246 693.346 482.258 683.379 482.258H198.883C188.913 482.258 179.942 486.246 171.967 494.221C164.988 501.2 161.5 509.671 161.5 519.642V636.279C161.5 646.25 164.988 655.221 171.967 663.196C179.942 670.175 188.913 673.662 198.883 673.662H687.863C723.754 673.662 756.154 682.638 785.063 700.579C814.971 717.529 838.396 740.954 855.346 770.863C873.288 799.771 882.263 832.171 882.263 868.058V993.671C882.263 1029.56 873.288 1061.96 855.346 1090.87C838.396 1119.78 814.971 1143.2 785.063 1161.15C756.154 1179.1 723.754 1188.07 687.863 1188.07H194.396Z" fill="#221E1F"/>
              </svg>
            </Link>
            <h2 className={styles.srTitle}>Sign in</h2>
            
            <div className={styles.roleToggle}>
              <button 
                type="button" 
                onClick={() => setRole('client')} 
                className={`${styles.roleBtn} ${role === 'client' ? styles.active : ''}`}
              >
                Client
              </button>
              <button 
                type="button" 
                onClick={() => setRole('engineer')} 
                className={`${styles.roleBtn} ${role === 'engineer' ? styles.active : ''}`}
              >
                Engineer
              </button>
            </div>
            
            <form noValidate onSubmit={handleSubmit}>
              
              <div className={`${styles.field} ${emailError ? styles.error : ''}`}>
                <label htmlFor="si-email">Email address</label>
                <input 
                  type="email" 
                  id="si-email" 
                  name="email" 
                  autoComplete="email" 
                  inputMode="email" 
                  required 
                  aria-required="true" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.fieldErr}>Please enter a valid email.</div>
              </div>
              
              <div className={`${styles.field} ${passwordError ? styles.error : ''}`}>
                <label htmlFor="si-password">Password</label>
                <input 
                  type="password" 
                  id="si-password" 
                  name="password" 
                  autoComplete="current-password" 
                  required 
                  aria-required="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.fieldErr}>Please enter your password.</div>
              </div>
              
              <div className={styles.rememberRow}>
                <div className={styles.rememberMe}>
                  <input type="checkbox" id="si-remember" name="remember" />
                  <label htmlFor="si-remember">Remember me for 7 days</label>
                </div>
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
              
              <button className={styles.btnG} type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing in...' : 'Sign in \u2192'}
              </button>
            </form>
            
            <div className={styles.divider}>or</div>
            <p className={styles.srFoot}>
              New here? <Link href="/register">Register as a client or engineer &rarr;</Link>
            </p>
            <p className={styles.srTiny}>
              SENM v2.5.0 &middot; <a href="#history">Version history</a> &middot; <Link href="/superadmin">Super admin</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
