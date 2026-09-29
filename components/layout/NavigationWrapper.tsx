'use client';

import { usePathname } from 'next/navigation';
import { Topbar } from './Topbar';
import { ContextBar } from './ContextBar';

export function NavigationWrapper() {
  const pathname = usePathname();

  // Define routes where the navigation should be hidden
  const hideNavigationRoutes = ['/login', '/register', '/forgot-password'];
  
  const shouldHide = hideNavigationRoutes.includes(pathname);

  if (shouldHide) {
    return null;
  }

  return (
    <>
      <Topbar />
      <ContextBar />
    </>
  );
}
