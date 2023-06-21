import React from 'react';
import { useRouter } from 'next/router';
import { getAuthCredentials } from './auth-utils';
import Loader from '@/components/ui/loader/loader';
import AccessDeniedPage from '@/components/common/access-denied';
import { Routes } from '@/config/routes';

const PrivateRoute: React.FC<{ authProps: any }> = ({
  children,
  authProps,
}) => {
  const router = useRouter();
  const { token } = getAuthCredentials();
  const isUser = !!token;

  React.useEffect(() => {
    if (!isUser) router.replace(Routes.login); // If not authenticated, force log in
  }, []);

  if (isUser) {
    return <>{children}</>;
  }
  if (isUser ) {
    return <AccessDeniedPage />;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader showText={false} />;
};

export default PrivateRoute;
