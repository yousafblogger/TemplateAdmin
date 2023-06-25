import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import React from 'react';
import Image from 'next/image';

export default function RegisterBusPageLayout({
  children,
}: React.PropsWithChildren<{}>) {
  // const { locale } = useRouter();
  // const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <div className="flex h-screen items-center justify-center bg-light sm:bg-gray-100"></div>
  );
}
