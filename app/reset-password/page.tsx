/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { resetPasswordAsync, isResettingPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!password || password.length < 8) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      valid = false;
    } else {
      setConfirmPasswordError(false);
    }

    if (!valid) return;

    if (!token) {
      toast.error('Invalid or missing password reset token.');
      return;
    }

    try {
      await resetPasswordAsync({ token, password });
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to reset password';
      toast.error(msg);
    }
  };

  return (
    <div className="sr-inner">
      {!isSuccess ? (
        <div className="fp-form">
          <Link href="/" className="sr-logo">
            <svg height="64" viewBox="0 0 4389 1743" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'auto' }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M1462.12 92.1667C1462.12 92.1667 1812.9 364.692 1861.61 450.692C1878.23 480.029 1888.61 513.179 1888.61 548.175V869.129H1165.71V1023.61C1165.71 1033.6 1169.21 1042.6 1176.21 1050.6C1184.21 1057.6 1193.21 1061.1 1203.21 1061.1H1888.61V1223.08H1198.71C1178.36 1223.08 1159.13 1220.2 1141.02 1214.45C1127.09 1210.03 1113.83 1203.9 1101.22 1196.08C1072.23 1178.08 1048.73 1154.59 1030.73 1125.59C1012.74 1096.6 1003.74 1064.1 1003.74 1028.11V548.175C1003.74 512.179 1012.74 479.683 1030.73 450.692C1077.15 375.913 1462.12 92.1667 1462.12 92.1667ZM1203.21 515.179C1193.21 515.179 1184.21 519.179 1176.21 527.179C1169.21 534.179 1165.71 542.679 1165.71 552.675V717.65H1725.13V552.675C1725.13 542.679 1721.63 534.179 1714.64 527.179C1707.64 519.179 1699.14 515.179 1689.14 515.179H1203.21Z" fill="#022977"/>
              <path d="M3085.85 1188.07V320.758H4193.92C4230.79 320.758 4263.71 329.729 4292.58 347.675C4321.5 365.621 4344.46 389.046 4361.38 417.958C4379.33 446.867 4388.29 479.267 4388.29 515.154V1188.07H4228.29V519.642C4228.29 509.671 4224.29 501.2 4216.33 494.221C4209.38 486.246 4200.88 482.258 4190.92 482.258H3857.45C3846.48 482.258 3837.51 486.246 3830.53 494.221C3823.55 501.2 3820.07 509.671 3820.07 519.642V1188.07H3657.07V519.642C3657.07 509.671 3653.08 501.2 3645.11 494.221C3638.13 486.246 3629.66 482.258 3619.69 482.258H3284.73C3274.76 482.258 3266.29 486.246 3259.31 494.221C3252.33 501.2 3248.84 509.671 3248.84 519.642V1188.07H3085.85Z" fill="#221E1F"/>
              <path d="M2044.65 1188.07V320.758H2732.51C2768.4 320.758 2800.8 329.729 2829.71 347.675C2859.62 365.621 2883.04 389.046 2899.99 417.958C2917.93 446.867 2926.91 479.267 2926.91 515.154V1188.07H2765.41V519.642C2765.41 509.671 2761.42 501.2 2753.45 494.221C2746.47 486.246 2737.99 482.258 2728.03 482.258H2243.53C2233.56 482.258 2224.59 486.246 2216.61 494.221C2209.63 501.2 2206.15 509.671 2206.15 519.642V1188.07H2044.65Z" fill="#221E1F"/>
              <path d="M194.396 1188.07C158.508 1188.07 126.108 1179.1 97.2 1161.15C68.2875 1143.2 44.8625 1119.78 26.9167 1090.87C8.97083 1061.96 0 1029.56 0 993.671V971.242H161.5V989.183C161.5 999.154 164.988 1008.12 171.967 1016.1C179.942 1023.08 188.913 1026.57 198.883 1026.57H683.379C693.346 1026.57 701.821 1023.08 708.8 1016.1C715.779 1008.12 719.267 999.154 719.267 989.183V872.546C719.267 862.575 715.779 854.104 708.8 847.125C701.821 839.15 693.346 835.162 683.379 835.162H194.396C158.508 835.162 126.108 826.687 97.2 809.742C68.2875 791.796 44.8625 768.371 26.9167 739.458C8.97083 709.55 0 676.654 0 640.767V515.154C0 479.267 8.97083 446.867 26.9167 417.958C44.8625 389.046 68.2875 365.621 97.2 347.675C126.108 329.729 158.508 320.758 194.396 320.758H687.863C723.754 320.758 756.154 329.729 785.063 347.675C814.971 365.621 838.396 389.046 855.346 417.958C873.288 446.867 882.263 479.267 882.263 515.154V537.587H719.267V519.642C719.267 509.671 715.779 501.2 708.8 494.221C701.821 486.246 693.346 482.258 683.379 482.258H198.883C188.913 482.258 179.942 486.246 171.967 494.221C164.988 501.2 161.5 509.671 161.5 519.642V636.279C161.5 646.25 164.988 655.221 171.967 663.196C179.942 670.175 188.913 673.662 198.883 673.662H687.863C723.754 673.662 756.154 682.638 785.063 700.579C814.971 717.529 838.396 740.954 855.346 770.863C873.288 799.771 882.263 832.171 882.263 868.058V993.671C882.263 1029.56 873.288 1061.96 855.346 1090.87C838.396 1119.78 814.971 1143.2 785.063 1161.15C756.154 1179.1 723.754 1188.07 687.863 1188.07H194.396Z" fill="#221E1F"/>
            </svg>
          </Link>
          <h2 className="sr-title">Create new password</h2>
          <form noValidate onSubmit={handleSubmit}>
            
            <div className={`field ${passwordError ? 'error' : ''}`}>
              <label htmlFor="rp-password">New Password</label>
              <input 
                type="password" 
                id="rp-password" 
                name="password" 
                required 
                aria-required="true"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="field-err">Password must be at least 8 characters.</div>
            </div>
            
            <div className={`field ${confirmPasswordError ? 'error' : ''}`}>
              <label htmlFor="rp-confirm">Confirm Password</label>
              <input 
                type="password" 
                id="rp-confirm" 
                name="confirmPassword" 
                required 
                aria-required="true"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="field-err">Passwords do not match.</div>
            </div>

            <button className="btn-g" type="submit" disabled={isResettingPassword}>
              {isResettingPassword ? 'Resetting...' : 'Reset Password \u2192'}
            </button>
          </form>
        </div>
      ) : (
        <div className="fp-success">
          <div className="fp-icon">
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 className="sr-title">Password reset</h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', fontWeight: '300', lineHeight: '1.7', marginBottom: '8px' }}>
            Your password has been successfully reset. You can now log in with your new password.
          </p>
        </div>
      )}
      
      <p className="sr-foot" style={{ marginTop: '24px' }}>
        <Link href="/login">&larr; Back to sign in</Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password — Structural Engineer Near Me</title>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --gold: #022977; --gold-light: #0A3AA8; --gold-dark: #001A5C;
          --border: rgba(0,0,0,0.08); --border-gold: rgba(2,41,119,0.30);
          --serif: 'IBM Plex Sans Condensed', Georgia, sans-serif;
          --sans: 'Be Vietnam Pro', system-ui, sans-serif;
          --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          --ink: #0A1628; --ink-2: #3A4A5A; --ink-3: #5A6A7A;
          --err: #B3261E;
        }
        
        /* Local reset to avoid polluting Next.js globals too much */
        .fp-container {
          font-family: var(--sans);
          background: #FFFFFF;
          color: var(--ink);
          min-height: 100vh;
        }
        .fp-container a { color: var(--gold); }
        .fp-container a:hover { color: var(--gold-light); }

        .view { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }

        .split-left {
          background: linear-gradient(160deg, var(--gold) 0%, var(--gold-dark) 100%);
          color: #FFFFFF; display: flex; flex-direction: column; justify-content: center;
          padding: 120px 64px 64px; position: relative; overflow: hidden;
        }
        .split-left::before {
          content: ''; position: absolute; inset: 0; z-index: 0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.04) 59px, rgba(255,255,255,0.04) 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.04) 59px, rgba(255,255,255,0.04) 60px);
        }
        .sl-content { position: relative; z-index: 1; max-width: 420px; }
        .sl-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 20px; opacity: 0; animation: fadeUp .7s var(--ease) forwards; }
        .sl-h1 { font-family: var(--serif); font-size: clamp(30px, 4vw, 44px); font-weight: 300; line-height: 1.15; margin-bottom: 20px; transition: opacity .2s; opacity: 0; animation: fadeUp .7s var(--ease) .1s forwards; }
        .sl-h1 em { font-style: italic; color: rgba(180,196,255,0.9); }
        .sl-body { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 48px; transition: opacity .2s; opacity: 0; animation: fadeUp .7s var(--ease) .2s forwards; }
        .sl-stats { display: flex; gap: 32px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 28px; }
        .sl-stat-v { font-family: var(--serif); font-size: 26px; font-weight: 400; margin-bottom: 4px; }
        .sl-stat-l { font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: .03em; }

        .split-right { display: flex; align-items: center; justify-content: center; padding: 120px 56px 64px; }
        .sr-inner { width: 100%; max-width: 400px; text-align: center; opacity: 0; animation: fadeUp .7s var(--ease) .15s forwards; }
        
        .sr-logo { display: flex; align-items: center; justify-content: center; text-decoration: none; margin-bottom: 8px; }
        .sr-title { font-family: var(--serif); font-size: 28px; font-weight: 400; margin-bottom: 24px; color: var(--ink); }

        .field { margin-bottom: 20px; text-align: left; }
        .field label { display: block; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
        .field input:not([type=checkbox]):not([type=radio]) { width: 100%; border: 1px solid var(--border); background: #fff; padding: 12px 16px; font-family: var(--sans); font-size: 14px; color: var(--ink); outline: none; transition: border-color .2s, box-shadow .2s; -webkit-appearance: none; }
        .field input:not([type=checkbox]):not([type=radio]):focus { border-color: rgba(2,41,119,0.4); box-shadow: 0 0 0 4px rgba(46,106,138,.08); }
        .field.error input { border-color: var(--err); }
        .field-err { display: none; font-size: 11px; color: var(--err); margin-top: 6px; }
        .field.error .field-err { display: block; }

        .btn-g { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--gold); color: #FFFFFF; border: none; padding: 15px 24px; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; transition: background .2s; font-family: var(--sans); }
        .btn-g:hover { background: var(--gold-light); }

        .fp-icon { width: 48px; height: 48px; border: 1px solid var(--border-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--gold); }
        .fp-icon svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
        
        .sr-foot { font-size: 13px; color: var(--ink-3); text-align: center; font-weight: 300; }
        .sr-foot a { font-weight: 500; text-decoration: none; }
        .sr-foot a:hover { text-decoration: underline; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .001s !important; animation-delay: 0s !important; } }

        @media (max-width: 860px) {
          .view { display: flex; flex-direction: column; }
          .split-left { padding: 100px 28px 40px; min-height: auto; }
          .sl-stats { gap: 24px; }
          .split-right { padding: 48px 28px 64px; }
        }
        @media (max-width: 600px) {
          .split-left { padding: 88px 20px 32px; }
          .split-right { padding: 40px 20px 56px; }
        }
      `}} />
      <div className="fp-container">
        <section className="view">
          <div className="split-left">
            <div className="sl-content">
              <div className="sl-eyebrow">Account recovery</div>
              <h1 className="sl-h1">Reset your <em>password</em></h1>
              <p className="sl-body">Enter your new password below. Ensure it is at least 8 characters long.</p>
              <div className="sl-stats">
                <div>
                  <div className="sl-stat-v">500+</div>
                  <div className="sl-stat-l">Engineers</div>
                </div>
                <div>
                  <div className="sl-stat-v">48h</div>
                  <div className="sl-stat-l">Avg. quote</div>
                </div>
                <div>
                  <div className="sl-stat-v">4.9&#9733;</div>
                  <div className="sl-stat-l">Avg. rating</div>
                </div>
              </div>
            </div>
          </div>
          <div className="split-right">
            <Suspense fallback={<div>Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
