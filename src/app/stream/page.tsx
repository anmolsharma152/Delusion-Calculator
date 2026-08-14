'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StreamPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home where unified stream mode is handled in place
    router.replace('/');
  }, [router]);

  return null;
}
