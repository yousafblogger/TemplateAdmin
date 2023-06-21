import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Router, { useRouter } from 'next/router';
import { VerifyUserFunction } from '@/services/service';
import { setAuthCredentials } from '@/utils/auth-utils';
import { Routes } from '@/config/routes';
import { toast } from 'react-toastify';

export default function VerifyUser() {
  const { t } = useTranslation();
  const [loadingData, setloadingData] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const { token } = router.query;
    let newToken: any = token;
    if (newToken != undefined) {
      VerifyUserFunction('/user/getUserDetails', newToken).then((result) => {
        console.log(result);

        if (result.statusCode == 200 && result.data.is_vender == 1) {
          let userData = JSON.stringify(result?.data);
          localStorage.setItem('user_token', newToken);
          localStorage.setItem('user_data', userData);
          setAuthCredentials(newToken);
          Router.push(Routes.dashboard);
        } else {
          router.push('/registerShop');
        }
      });
    }
  }, [router]);

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return <>Loaderr</>;
}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
});
