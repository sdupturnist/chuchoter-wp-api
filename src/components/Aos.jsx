"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/router';  // Import useRouter from Next.js
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSInit = () => {
  const router = useRouter();

  useEffect(() => {
  
    AOS.init({
      duration: 1500,
      once: true,
    });

  
    const handleRouteChange = () => {
      AOS.refresh();
    };

 
    router.events.on('routeChangeComplete', handleRouteChange);


    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]); 

  return null;
};
