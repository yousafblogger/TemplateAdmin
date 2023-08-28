import Layout from '@/components/layouts/admin';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateOrUpdateTagForm from '@/components/templates/template-form';
import { adminOnly } from '@/utils/auth-utils';
import { useTagQuery } from '@/data/tag';
import { Config } from '@/config';
import { useEffect, useState } from 'react';
import { GetFunction } from '@/services/service';

export default function UpdateTagPage() {
  const { query, locale } = useRouter();
  const [template, setTemplate] = useState<any>('');
  const [loading, setloadingData] = useState<any>(true);
  const { t } = useTranslation();
  // const { tag, loading, error } = useTagQuery({
  //   slug: query.tagSlug as string,
  //   language:
  //     query.action!.toString() === 'edit' ? locale! : Config.defaultLanguage,
  // });
  useEffect(() => {
    GetFunction('/template/SingleTemplate/' + query.templateSlug).then(
      (result: any) => {
        console.log(result);
        if (result) {
          setTemplate(result.template);
          setloadingData(false);
        }
      }
    );
  }, []);
  if (loading) return <Loader text={t('common:text-loading')} />;

  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          Edit Template
        </h1>
      </div>

      <CreateOrUpdateTagForm otherFiield={true} initialValues={template} />
    </>
  );
}
// UpdateTagPage.authenticate = {
//   permissions: adminOnly,
// };
UpdateTagPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
