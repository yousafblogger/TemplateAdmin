import Input from '@/components/ui/input';
import { Control, FieldErrors, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Label from '@/components/ui/label';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import * as categoriesIcon from '@/components/icons/category';
import { getIcon } from '@/utils/get-icon';
import { useRouter } from 'next/router';
import { getErrorMessage } from '@/utils/form-error';
import ValidationError from '@/components/ui/form-validation-error';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import SelectInput from '@/components/ui/select-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTagMutation, useUpdateTagMutation } from '@/data/tag';
import { useTypesQuery } from '@/data/type';
import { useEffect, useState } from 'react';
import { GetFunction, PostFunction } from '@/services/service';
import { toast } from 'react-toastify';
import Select from '../ui/select/select';
import Loader from '../ui/loader/loader';

type FormValues = {
  Template_Name: string;
  Creater_name: string;
  Usage_detail: string;
  VideoLink: string;
  Tags: string;
  PoseterLink: string;
  type: any;
  details: string;
  image: any;
  icon: any;
  template: any;
  Template_ID: any;
  Creater_desc: any;
  Clips: any;
};

const defaultValues = {
  //   image: '',
  //   Template_Name: '',
  //   Creater_name: '',
  //   Usage_detail: '',
  //   VideoLink: '',
  //   Tags: '',
  //   PoseterLink: '',
  //   details: '',
  //   icon: '',
  //   type: '',
};

export default function CreateOrUpdateTagForm({ initialValues }: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const [templateId, setTemplateId] = useState();
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [mmainLoading, setMainLoading] = useState(false);
  const [otherFields, setOtherFields] = useState(false);
  const [loadingData, setloadingData] = useState(true);
  const [template, setTemplate] = useState<any>();
  const [categoryData, setCategoryData] = useState<any>([]);
  const [categorySelectedId, setCategorySelectedId] = useState<any>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    defaultValues: initialValues ? defaultValues : defaultValues,
  });

  useEffect(() => {
    GetFunction('/category/AllCategories').then((result: any) => {
      let ordersData = result.category.map((data: any, i: any) => {
        return {
          key: i,
          id: data._id,
          value: data.name,
          label: data.name,
        };
      });
      setCategoryData(ordersData);
      setloadingData(false);
    });
  }, []);

  const onTemplateIdChange = (e: any) => {
    setTemplateId(e.target.value);
  };

  const onSubmit = async (values: FormValues) => {
    setMainLoading(true);
    let obj: any = {
      values: {
        Template_Name: values.Template_Name,
        Template_ID: values.Template_ID,
        Usage_detail: values.Usage_detail,
        Creater_name: values.Creater_name,
        Tags: values.Tags,
        Clips: values.Clips,
        video_link: values.VideoLink,
        poster_link: values.PoseterLink,
        Creater_desc: values.Creater_desc,
      },
    };
    if (categorySelectedId) {
      obj.values.category = categorySelectedId;
    }

    PostFunction('template/create', obj).then((result) => {
      if (result.status) {
        toast.success('Successfully Craeted Template');
        setMainLoading(false);
        setTemplate(result);
        router.back();
        setOtherFields(true);
      } else {
        toast.error(result.error);
        setMainLoading(true);
      }
    });
  };

  const onScrapData = async (e: any) => {
    e.preventDefault();
    setCreatingLoading(true);
    let obj = {
      id: templateId,
    };
    PostFunction('fetchTemplate', obj).then((result) => {
      if (result.Template_Name) {
        toast.success('Successfully Fetched Data');
        setCreatingLoading(false);
        setTemplate(result);

        setOtherFields(true);
      } else if (result.error) {
        toast.error(result.error);
        setCreatingLoading(false);
      }
    });
  };

  const onCategoryChange = (e: any) => {
    setCategorySelectedId(e.id);
  };

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!otherFields && (
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('form:input-label-description')}
            details="Enter Your Template Id Here"
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('Template Id')}
              variant="outline"
              className="mb-5"
              name="ttemplateId"
              onChange={onTemplateIdChange}
            />
            <Button
              loading={creatingLoading}
              disabled={creatingLoading}
              onClick={onScrapData}
            >
              Fetch Data
            </Button>
          </Card>
        </div>
      )}
      {otherFields && (
        <div className="my-5 flex flex-wrap sm:my-8">
          <Description
            title={t('Template Information')}
            details="Add Template Fields Here"
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              {...register('Template_ID', {
                value: template.Template_ID,
              })}
              disabled
              label={t('Template Id')}
              variant="outline"
              className="mb-5"
              name="ttemplateId"
            />
            <Input
              {...register('Template_Name', {
                value: template.Template_Name,
              })}
              label={t('Template Name')}
              variant="outline"
              className="mb-5"
            />

            <Input
              {...register('Creater_name', {
                value: template.Creater_name,
              })}
              label={t('Customer Name')}
              variant="outline"
              className="mb-5"
            />
            <Input
              {...register('Usage_detail', {
                value: template.Usage_detail,
              })}
              label={t('Usage Detail')}
              variant="outline"
              className="mb-5"
            />
            <Input
              {...register('Tags', {
                value: template.Tags,
              })}
              label={t('Tags')}
              variant="outline"
              className="mb-5"
            />
            <Input
              {...register('Creater_desc', {
                value: template.Creater_desc,
              })}
              disabled
              label={t('Creater Desc')}
              variant="outline"
              className="mb-5"
            />
            <Input
              {...register('Clips', {
                value: template.Clips,
              })}
              disabled
              label={t('Clips')}
              variant="outline"
              className="mb-5"
            />
            <div className="mb-5">
              <Label>Category</Label>
              <Select options={categoryData} onChange={onCategoryChange} />
            </div>
            <Input
              {...register('VideoLink')}
              label={t('Video Link')}
              variant="outline"
              className="mb-5"
            />
            <Input
              {...register('PoseterLink')}
              label={t('Poster Link')}
              variant="outline"
              className="mb-5"
            />
          </Card>
        </div>
      )}
      {otherFields && (
        <div className="mb-4 text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="me-4"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          )}

          <Button loading={mmainLoading}>Add Template</Button>
        </div>
      )}
    </form>
  );
}
