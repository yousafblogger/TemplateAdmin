import TemplateList from '@/components/templates/template-list';
import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import LinkButton from '@/components/ui/link-button';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Routes } from '@/config/routes';
import { useRouter } from 'next/router';
import { GetFunction } from '@/services/service';
import Button from '@/components/ui/button';

export default function Templates() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [loadingData, setloadingData] = useState(false);

  useEffect(() => {
    setloadingData(true);
    GetFunction('/template/AllTemplates').then((result: any) => {
      setCategoryData(result.templates);
      setSearchData(result.templates)
      setloadingData(false);
      console.log(categoryData);
    });
  }, []);

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  function handleSearch({ searchText }: { searchText: string }) {
    //Filter the data based on search text
    const filteredData = categoryData.filter(
      (item) =>
        item?.Template_Name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.Creater_name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setCategoryData(filteredData);
  }
const Reset=()=>{
  setCategoryData(SearchData);
}
  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 flex flex-row gap-1 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold text-heading">
              {categoryData?.length} - Templates
            </h1>
          </div>

          <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-3/4">
            <Search onChange={handleSearch} />
            <Button
              onClick={Reset}
              className="h-12 w-full md:w-auto md:ms-6"
            >
              <span className="block md:hidden xl:block">
                Reset
              </span>
             
            </Button>
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

Templates.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
