"use client"
import Footer from './components/Footer';
import Header from './components/Header';
import SideNav from './components/SideNav'; // Ensure this path is correct or update it to the correct path
import React, { ReactNode } from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
//import type { AppProps } from "next/app";
//import { useSession } from 'next-auth/react';
//import { getServerSession } from "next-auth";
//import { useState, useEffect } from 'react';


interface RootLayoutProps {
  children: ReactNode;
}

  
export default function RootLayout({children}: RootLayoutProps) {
  //const { data: session } = useSession();
  //const session = await getServerSession(authOptions);

  return (

    <html lang="en">
      <body style={{ margin: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SessionProvider > {/* SessionProvider로 세션 관리 */}

      <Header />
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
