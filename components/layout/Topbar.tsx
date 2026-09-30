'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Topbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview' },
    { href: '/opportunities', label: 'Opportunities' },
    { href: '/quotes', label: 'Quotes' },
    { href: '/projects', label: 'Projects' },
    { href: '/profile', label: 'Profile' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/messages', label: 'Messages', badge: 2 },
  ];

  return (
    <header className="topbar">
      <div className="brand-lockup">
        <Link href="/">
          <img src="/assets/senm black.svg" alt="SENM Logo" style={{ height: '40px', width: 'auto', display: 'block' }} />
        </Link>
      </div>
      <nav aria-label="Primary navigation" className="nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
            {link.badge && <span className="nav-count">{link.badge}</span>}
          </Link>
        ))}
      </nav>
      <div className="header-account">
        <div aria-label="Contact and notifications" className="header-stars">
          <button aria-label="Contact SENM" className="header-action" type="button">
            <svg aria-hidden="true" className="header-icon" viewBox="0 0 24 24" fill="none">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H11l-4.5 4v-4.25A2.5 2.5 0 0 1 4 12.5v-7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M8 8h8M8 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button aria-label="Notifications" className="header-action notification-action" type="button">
            <svg aria-hidden="true" className="header-icon" viewBox="0 0 24 24" fill="none">
              <path d="M18 9.5a6 6 0 0 0-12 0c0 6-2.2 6.5-2.2 8h16.4c0-1.5-2.2-2-2.2-8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9.5 20h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <b aria-label="3 unread notifications">3</b>
          </button>
        </div>
        <div className="header-divider"></div>
        <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div aria-label="Engineer profile" className="header-engineer">
            <div className="header-engineer-copy">
              <strong>James H.</strong>
              <div className="header-credentials"><span>CEng</span><span>MIStructE</span></div>
            </div>
            <div aria-label="James H." className="header-avatar">JH</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
