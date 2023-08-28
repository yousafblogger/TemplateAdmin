import Select from '@/components/ui/select/select';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/label';
import cn from 'classnames';
import { useCategoriesQuery } from '@/data/category';
import { useRouter } from 'next/router';
import { useTypesQuery } from '@/data/type';
import { ActionMeta } from 'react-select';
import { GetFunction } from '@/services/service';

type Props = {
  onCategoryFilter: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  // onTypeFilter: (newValue: any, actionMeta: ActionMeta<unknown>) => void;
  className?: string;
};

export default function CategoryTypeFilter({
  // onTypeFilter,
  onCategoryFilter,
  className,
}: Props) {
  const { locale } = useRouter();
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState<any>([]);
  const [loadingData, setloadingData] = useState(false);
  const { types, loading } = useTypesQuery({ language: locale });
  const { categories, loading: categoryLoading } = useCategoriesQuery({
    limit: 999,
    language: locale,
  });
  useEffect(() => {
    setloadingData(true);
    GetFunction('/category/AllCategories').then((result: any) => {
      let ordersData = result.category.map((data: any, i: any) => {
        return {
          key: i,
          id: data._id,
          value: data.name,
          label: data.name,
        };
      });
      // Add an object with "select" values
      ordersData?.unshift({
        key: -1, // Use a unique key for the special "select" option
        id: '', // Use an appropriate value for the "id" property
        value: '', // Set the value to an empty string
        label: 'Select', // Set the label to "Select"
      });
      setCategoryData(ordersData);
      setloadingData(false);
    });
  }, []);
  return (
    <div
      className={cn(
        'flex w-full flex-col space-y-5 rtl:space-x-reverse md:flex-row md:items-end md:space-x-5 md:space-y-0',
        className
      )}
    >
      {/* <div className="w-full">
        <Label>{t('common:filter-by-group')}</Label>
        <Select
          options={types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t('common:filter-by-group-placeholder')}
          onChange={onTypeFilter}
        />
      </div> */}
      <div className="w-full">
        <Label>{t('common:filter-by-category')}</Label>
        <Select
          isClearable={true}
          options={categoryData}
          getOptionLabel={(option: any) => option.label}
          getOptionValue={(option: any) => option.name}
          placeholder={t('common:filter-by-category-placeholder')}
          isLoading={categoryLoading}
          onChange={onCategoryFilter}
        />
      </div>
    </div>
  );
}
