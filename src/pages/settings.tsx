import CategoryList from '@/components/category/category-list';
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
import { GetFunction, PutFunction } from '@/services/service';
import Description from '@/components/ui/description';
import Input from '@/components/ui/input';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import TextArea from '@/components/ui/text-area';
import Button from '@/components/ui/button';
import { toast } from 'react-toastify';

type FormValues = {
  Redirect_url: string;
  Poster_link:string;
};
const defaultValues = {};

export default function Categories() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [data, setData] = useState<any>();
  const [loadingData, setloadingData] = useState(true);
  const [btnloadingData, setBtnloadingData] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: defaultValues,
  });

  useEffect(() => {
    GetFunction('siteSettings').then((result: any) => {
      console.log(result);
      if (result.status) {
        setData(result.setting);
        setloadingData(false);
      } else {
        setloadingData(false);
      }
    });
  }, []);

  const onSubmit = async (values: FormValues) => {
    let obj = {
      values: {
        Redirect_url: values.Redirect_url,
        Poster_link:values.Poster_link
      },
    };
    setBtnloadingData(true);
    PutFunction('updateSettings/' + data._id, obj).then((result: any) => {
      console.log(result);
      if (result.status) {
        toast.success('Update Successfully');
        setBtnloadingData(false);
        router.reload();
      } else {
        setBtnloadingData(false);
        toast.success(result.error);
      }
    });
  };

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-settings')}
        </h1>
      </div>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('Settings')}
          details="Update your redirect url here"
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <TextArea
            label="Redirect Url"
            {...register('Redirect_url', {
              value: data.Redirect_url,
            })}
            variant="outline"
            className="mb-5"
          />
           <TextArea
            label="Poster Url"
            {...register('Poster_link', {
              value: data.Poster_link,
            })}
            variant="outline"
            className="mb-5"
          />
          <Button loading={btnloadingData}>Update</Button>
        </Card>
      </div>
    </form>
  );
}

Categories.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common', 'table'])),
  },
});
