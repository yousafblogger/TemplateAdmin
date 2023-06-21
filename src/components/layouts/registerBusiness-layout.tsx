import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import React from 'react';
import Image from 'next/image';
import logo from '../../../public/image/leSouq.png'

export default function RegisterBusPageLayout({
  children,
}: React.PropsWithChildren<{}>) {
  // const { locale } = useRouter();
  // const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

  return (
    <div
      className="flex h-screen items-center justify-center bg-light sm:bg-gray-100"
    >
      <div className="m-auto w-full max-w-[820px]  rounded bg-light p-5 sm:p-8 sm:shadow">
        <div className="mb-2 flex justify-center">
          {/* <Logo /> */}
          <Image width={250} height={100} src={logo} />
        </div>
        {children}
      </div>
    </div>
  );
}
