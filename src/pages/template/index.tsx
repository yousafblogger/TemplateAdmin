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
import {
  GetFunction,
  PostFunction,
  PostFunctionUpload,
} from '@/services/service';
import Button from '@/components/ui/button';
import Label from '@/components/ui/label';
import Select from '@/components/ui/select/select';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ArrowDown } from '@/components/icons/arrow-down';
import CategoryTypeFilter from '@/components/product/category-type-filter';
import cn from 'classnames';
import FormData from 'form-data';
import { toast } from 'react-toastify';

export default function Templates() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [TempData, setTempData] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [loadingData, setloadingData] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaderImportt, setLoaderImportt] = useState(false);
  const [TotalSize, setTotalSize] = useState();
  const [file, setFile] = useState<any>();
  const router=useRouter();
  let form = new FormData();

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const GetCat = () => {
    GetFunction('/template/AllTemplates').then((result: any) => {
      setTempData(result.templates);
      console.log(result.templates);
      
      setTotalSize(result.totalsize);
      setSearchData(result.templates);
      setloadingData(false);
    });
  };

  useEffect(() => {
    GetCat();
    console.log(TempData);
  }, []);

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  function handleSearch({ searchText }: { searchText: string }) {
    // Filter the data based on search text
    const filteredData = TempData.filter(
      (item: any) =>
        item?.Template_Name?.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.Creater_name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setTempData(filteredData);
  }

  const Reset = () => {
    setTempData(SearchData);
  };

  const filterCategory = (e: any) => {
    setloadingData(true);
    GetFunction('/template/AllTemplates/' + e.id).then((result: any) => {
      setTempData(result.template);
      setloadingData(false);
    });
  };
  const filterSequence = (e: any) => {
    setloadingData(true);
    GetFunction('/template/Sequence').then((result: any) => {
      setTempData(result.template);
      setloadingData(false);
    });
  };

  const onImportFiile = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };
  const onUpload = () => {
    setLoaderImportt(true);

    form.append('file', file);
    PostFunctionUpload('/template/BulkUpload', form).then((result) => {
      if (result.status) {
        toast.success(result.message);
        setLoaderImportt(false);
        GetCat();
        router.reload();
      } else {
        toast.error(result.error);
        setLoaderImportt(false);
      }
      console.log(result);
    });
  };

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 flex flex-row gap-1 md:mb-0 md:w-1/4">
            <h1 className="text-xl font-semibold text-heading">
              {TotalSize} - Templates
            </h1>
          </div>

          <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-3/4">
            <Search onChange={handleSearch} />
            <Button onClick={Reset} className="h-12 w-full md:w-auto md:ms-6">
              <span className="block md:hidden xl:block">Reset</span>
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
            <button
              className="mt-5 flex items-center whitespace-nowrap text-base font-semibold  md:mt-0 md:ms-5"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>
        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:w-1/2 md:items-center md:pt-8">
            <CategoryTypeFilter
              className="w-full"
              onCategoryFilter={filterCategory}
            />
          </div>
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:w-1/2 md:items-center md:pt-8">
            <Label>Filter By Sequence</Label>
            <Button
              onClick={filterSequence}
              className="h-12 w-full md:w-auto md:ms-6"
            >
              <span className="block md:hidden xl:block">
                Filter By Sequence
              </span>
            </Button>
          </div>
        </div>
      </Card>
      <Card className="mb-8">
        <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 flex flex-row gap-1 md:mb-0 md:w-1/2">
            <h1 className="text-xl font-semibold text-heading">
              {TempData?.length} - Templates on This Page
            </h1>
          </div>
          <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-3/4">
            <input type="file" onChange={onImportFiile} />
            <Button
              loading={loaderImportt}
              onClick={onUpload}
              className="ml-5 justify-end"
            >
              Upload Template file
            </Button>
          </div>
        </div>
      </Card>

      <TemplateList template={TempData} GetCat={GetCat} />
    </>
  );
}

Templates.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
