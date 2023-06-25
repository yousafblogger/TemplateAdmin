import Input from '@/components/ui/input';
import {
  Control,
  FieldErrors,
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { Switch } from '@headlessui/react';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Label from '@/components/ui/label';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import * as categoriesIcon from '@/components/icons/category';
import { getIcon } from '@/utils/get-icon';
import { useRouter } from 'next/router';
import ValidationError from '@/components/ui/form-validation-error';
import { useEffect, useState } from 'react';
import { Category } from '@/types';
import { categoryIcons } from './category-icons';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import SelectInput from '@/components/ui/select-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { categoryValidationSchema } from './category-validation-schema';
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/data/category';
import { useTypesQuery } from '@/data/type';
import React from 'react';
import Select from '../ui/select/select';
import { selectStyles } from '../ui/select/select.styles';
import { GetFunction, PostFunction } from '@/services/service';
import { toast } from 'react-toastify';
import Modal from '@/components/ui/modal/modal';
import CategoryFieldForm from './category-field-form';
import FormData from 'form-data';
import Loader from '../ui/loader/loader';

export const updatedIcons = categoryIcons.map((item: any) => {
  item.label = (
    <div className="flex items-center space-s-5">
      <span className="flex h-5 w-5 items-center justify-center">
        {getIcon({
          iconList: categoriesIcon,
          iconName: item.value,
          className: 'max-h-full max-w-full',
        })}
      </span>
      <span>{item.label}</span>
    </div>
  );
  return item;
});

function SelectTypes({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: FieldErrors;
}) {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { types, loading } = useTypesQuery({ language: locale });
  return (
    <div className="mb-5">
      <Label>{t('form:input-label-types')}</Label>
      <SelectInput
        name="type"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.slug}
        options={types!}
        isLoading={loading}
      />
      <ValidationError message={t(errors.type?.message)} />
    </div>
  );
}

function SelectCategories({
  control,
  setValue,
}: {
  control: Control<FormValues>;
  setValue: any;
}) {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const type = useWatch({
    control,
    name: 'type',
  });
  const { dirtyFields } = useFormState({
    control,
  });
  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue('parent', []);
    }
  }, [type?.slug]);
  const { categories, loading } = useCategoriesQuery({
    limit: 999,
    type: type?.slug,
    language: locale,
  });
  return (
    <div>
      <Label>{t('form:input-label-parent-category')}</Label>
      <SelectInput
        name="parent"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={categories}
        isClearable={true}
        isLoading={loading}
      />
    </div>
  );
}

type FormValues = {
  name: string;
  details: string;
  parent: any;
  image: any;
  icon: any;
  type: any;
  sequence: any;
};

const defaultValues = {
  image: [],
  name: '',
  details: '',
  parent: '',
  icon: '',
  type: '',
};

type IProps = {
  initialValues?: any;
};
export default function CreateOrUpdateCategoriesForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const isNewTranslation = router?.query?.action === 'translate';
  const [imageFile, setImageFile] = useState<any>();
  const [path, setPath] = useState<string>();
  const [value, setValues] = React.useState<any>(false);
  const [CatDataArray, setCatDataArray] = React.useState<any[]>([]);
  const [catDropId, setcatDropId] = useState();
  const [creatingLoading, setCreatingLoading] = useState(false);
  const [closeDialog, setCloseDialog] = useState<any>(false);
  const [CatId, setCatId] = useState<any>();
  var categoryForm = new FormData();
  const [categoryData, setCategoryData] = useState<any>();
  const [loadingData, setloadingData] = useState(true);

  useEffect(() => {
    if (imageFile) {
      setPath(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  const onChange = (e: any) => {
    setValues((value: any) => !value);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm<FormValues>({
    // shouldUnregister: true,
    //@ts-ignore
    defaultValues: defaultValues,
  });

  useEffect(() => {
    GetFunction('/category/AllCategories').then((result: any) => {
      const highestSequenceObject = result?.category?.reduce(
        (prev: any, current: any) => {
          return current.sequence > prev.sequence ? current : prev;
        }
      );

      console.log(highestSequenceObject);
      setCategoryData(highestSequenceObject.sequence + 1);

      setloadingData(false);
    });
  }, []);

  const onSubmit = (values: FormValues) => {
    setCreatingLoading(true);

    let formData = {
      values: { name: values?.name, sequence: values.sequence },
    };

    // if (initialValues.initialValues) {
    PostFunction('category/create', formData).then((result) => {
      if (result.status) {
        toast.success(t('common:successfully-created'));
        setCreatingLoading(false);
        router.back();
      } else {
        toast.error(result.error);
        setCreatingLoading(false);
      }
    });
    // } else {
    let ID = initialValues?.initialValues?.id;
    // setCreatingLoading(true);
    // UpdatingCustomerFunction('/tax/', formVal, ID).then((result) => {
    //   if (result.success) {
    //     toast.success(t('common:successfully-created'));
    //     setCreatingLoading(false);
    //     router.back();
    //   } else {
    //     toast.error(t(result.msg));
    //     setCreatingLoading(false);
    //   }
    // });
    // }
  };
  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:category-description-helper-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            variant="outline"
            className="mb-5"
          />
          <Input
            label="Sequence"
            {...register('sequence', {
              value: categoryData,
            })}
            variant="outline"
            className="mb-5"
          />
          {/* <TextArea
            disabled
            label={t('form:input-label-details')}
            {...register('details')}
            variant="outline"
            className="mb-5"
          /> */}
        </Card>
      </div>
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

        <Button loading={creatingLoading}>
          {initialValues
            ? t('form:button-label-update-category')
            : t('form:button-label-add-category')}
        </Button>
      </div>
    </form>
  );
}