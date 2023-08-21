import Layout from '@/components/layouts/admin';
import CreateOrUpdateCategoriesForm from '@/components/category/category-form';
import { useRouter } from 'next/router';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCategoryQuery } from '@/data/category';
import { Config } from '@/config';
import { useEffect, useState } from 'react';
import { GetFunction } from '@/services/service';

export default function UpdateCategoriesPage() {
  const { query, locale } = useRouter();
  const [loading, setloadingData] = useState<any>(true);
  const [category, setCategory] = useState<any>('');
  const { t } = useTranslation();

  useEffect(() => {
    setloadingData(true);
    GetFunction('/category/SingleCategory/' + query.categorySlug).then(
      (result: any) => {
        if (result) {
          setCategory(result.category);
          setloadingData(false);
        }
      }
    );
  }, []);

  if (loading) return <Loader text={t('common:text-loading')} />;

  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-category')}
        </h1>
      </div>

      <CreateOrUpdateCategoriesForm initialValues={category} />
    </>
  );
}

UpdateCategoriesPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
