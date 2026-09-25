"use client";

import React from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api/client';

export default function DashboardPage() {
  const { logout } = useAuth();
  
  // Dummy query to fetch user data if needed, or rely on react-query cache
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await apiClient.get('/auth/me'); // Assuming there's a /me endpoint
      return response.data?.data;
    },
    retry: false
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>SENM</div>
          <nav className={styles.nav}>
            <Link href="/dashboard" className={styles.active}>Overview</Link>
            <Link href="/dashboard/projects">Projects</Link>
            <Link href="/dashboard/messages">Messages</Link>
            <Link href="/dashboard/settings">Settings</Link>
          </nav>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.profileMeta}>
            <span className={styles.profileName}>{user?.fullName || 'Engineer'}</span>
            <span className={styles.profileRole}>Verified Professional</span>
          </div>
          <button onClick={() => logout()} className={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.h1}>Welcome back, {user?.fullName?.split(' ')[0] || 'Engineer'}</h1>
          <p className={styles.subtitle}>Here's what's happening with your projects today.</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={styles.statData}>
              <h3>Active Projects</h3>
              <p>12</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className={styles.statData}>
              <h3>New Inquiries</h3>
              <p>4</p>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={styles.statData}>
              <h3>Pending Payouts</h3>
              <p>£3,250</p>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.recentProjects}>
            <div className={styles.sectionHeader}>
              <h2>Recent Project Requests</h2>
              <button className={styles.viewAll}>View All</button>
            </div>
            <div className={styles.projectList}>
              {[
                { id: 1, title: 'Loft Conversion in Manchester', client: 'Sarah Jenkins', status: 'Pending Review', date: '2 hours ago' },
                { id: 2, title: 'Rear Extension Structural Design', client: 'David Smith', status: 'In Progress', date: 'Yesterday' },
                { id: 3, title: 'Party Wall Survey', client: 'Emily Brown', status: 'Completed', date: 'Oct 12' }
              ].map(project => (
                <div key={project.id} className={styles.projectItem}>
                  <div className={styles.projectInfo}>
                    <h4>{project.title}</h4>
                    <p>{project.client} • {project.date}</p>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[project.status.replace(/\s+/g, '')]}`}>
                    {project.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.profileCompletion}>
            <div className={styles.sectionHeader}>
              <h2>Profile Status</h2>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.progressRing}>
                <svg viewBox="0 0 36 36" className={styles.circularChart}>
                  <path className={styles.circleBg}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className={styles.circle}
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className={styles.percentage}>100%</text>
                </svg>
              </div>
              <div className={styles.profileStatusText}>
                <h4>Profile Complete</h4>
                <p>Your profile is fully vetted and visible to homeowners in your coverage areas.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
