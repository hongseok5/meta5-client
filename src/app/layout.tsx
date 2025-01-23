"use client"
import Footer from './components/Footer';
import Header from './components/Header';
import SideNav from './components/SideNav'; // Ensure this path is correct or update it to the correct path
import React, { ReactNode } from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

import { useAuthStore } from '../store';



interface RootLayoutProps {
  children: ReactNode;
}

  
export default function RootLayout({children}: RootLayoutProps) {
  console.log(children)
  const { isLoggedIn, login, logout } = useAuthStore();
  return (

    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SessionProvider > {/* SessionProvider로 세션 관리 */}

      <Header isLoggedIn = {isLoggedIn} login={login} logout={logout}/>
      </SessionProvider>
      <div style={{ display: 'flex', flex: 1 }}>
        <SideNav />

          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>
      </div>
        <Footer />
      </body>
    </html>

  );
}
