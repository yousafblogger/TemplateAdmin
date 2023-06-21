import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RegisterBusPageLayout from '@/components/layouts/registerBusiness-layout';
import RegistrationShopForm from '@/components/auth/registerShopDetail';
import React, { useState } from 'react';
import Loader from '@/components/ui/loader/loader';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
});

export default function RegisterPage() {
  const [loadingData, setloadingData] = useState(false);
  const { t } = useTranslation();

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return (
    <RegisterBusPageLayout>
      <h3 className="mb-6 mt-4 text-center text-base italic text-gray-500">
        Enter Your Business Details
      </h3>
      <RegistrationShopForm />
    </RegisterBusPageLayout>
  );
}
