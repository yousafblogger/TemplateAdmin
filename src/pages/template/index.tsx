import TemplateList from '@/components/templates/template-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import LinkButton from '@/components/ui/link-button';
import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { SortOrder } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import TypeFilter from '@/components/category/type-filter';
import { adminOnly } from '@/utils/auth-utils';
import { useCategoriesQuery } from '@/data/category';
import { useRouter } from 'next/router';
import { Config } from '@/config';
import { GetFunction } from '@/services/service';

export default function Categories() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [loadingData, setloadingData] = useState(false);

  useEffect(() => {
    setloadingData(true);
    GetFunction('/template/AllTemplates').then((result: any) => {
      setCategoryData(result.templates);
      setloadingData(false);
    });
  }, []);

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  function handleSearch({ searchText }: { searchText: string }) {}

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold text-heading">Templates</h1>
          </div>

          <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-3/4">
            <Search onSearch={handleSearch} />

            <LinkButton
              href={`${Routes.template.create}`}
              className="h-12 w-full md:w-auto md:ms-6"
            >
              <span className="block md:hidden xl:block">
                + Create Template
              </span>
              <span className="hidden md:block xl:hidden">
                + {t('form:button-label-add')}
              </span>
            </LinkButton>
          </div>
        </div>
      </Card>
      <TemplateList categories={categoryData} />
    </>
  );
}

Categories.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
