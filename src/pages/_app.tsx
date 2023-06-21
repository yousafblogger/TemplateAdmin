import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/css/main.css';
import { UIProvider } from '@/contexts/ui.context';
import { SettingsProvider } from '@/contexts/settings.context';
import ErrorMessage from '@/components/ui/error-message';
import PageLoader from '@/components/ui/page-loader/page-loader';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { useSettingsQuery } from '@/data/settings';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { ModalProvider } from '@/components/ui/modal/modal.context';
import DefaultSeo from '@/components/ui/default-seo';
import ManagedModal from '@/components/ui/modal/managed-modal';
import { CartProvider } from '@/contexts/quick-cart/cart.context';
import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import PrivateRoute from '@/utils/private-route';
import { Config } from '@/config';
import React from 'react';
// import '@fontsource/poppins';
import { format } from 'date-fns';
import { Routes } from '@/config/routes';
// import moment from 'moment';

const Noop: React.FC = ({ children }) => <>{children}</>;

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;
  const [queryClient] = useState(() => new QueryClient());
  const [isGreater, setIsGreater] = useState(false);
  const [dateArray, setDateArray] = useState([]);
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  const { locale } = useRouter();
  const dir = Config.getDirection(locale);
  const [loading, setLoading] = useState(true);

  return (
    <div dir={dir}>
      {/* {loading == true ? (
        <PageLoader />
      ) : ( */}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {/* <AppSettings> */}
          <UIProvider>
            <ModalProvider>
              <>
                <CartProvider>
                  {/* <DefaultSeo /> */}
                  {authProps ? (
                    <PrivateRoute authProps={authProps}>
                      <Layout {...pageProps}>
                        <Component {...pageProps} />
                      </Layout>
                    </PrivateRoute>
                  ) : (
                    <Layout {...pageProps}>
                      <Component {...pageProps} />
                    </Layout>
                  )}
                  <ToastContainer autoClose={2000} theme="colored" />
                  <ManagedModal />
                </CartProvider>
              </>
            </ModalProvider>
          </UIProvider>
          {/* </AppSettings> */}
          {/*  <ReactQueryDevtools /> */}
        </Hydrate>
      </QueryClientProvider>
      {/* )} */}
    </div>
  );
};

export default appWithTranslation(CustomApp);
