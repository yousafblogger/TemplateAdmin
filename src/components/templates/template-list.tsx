import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { getIcon } from '@/utils/get-icon';
import * as categoriesIcon from '@/components/icons/category';
import { SortOrder } from '@/types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { Category, MappedPaginatorInfo } from '@/types';
import { Config } from '@/config';
import Link from '@/components/ui/link';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';

export type IProps = {
  categories: Category[] | undefined;
};
const CategoryList = (categories: any) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const columns = [
    {
      title: 'Template Id',
      className: 'cursor-pointer',
      dataIndex: 'Template_ID',
      key: 'name',
      align: alignLeft,
    },
    {
      title: 'Template Name',
      className: 'cursor-pointer',
      dataIndex: 'Template_Name',
      key: 'name',
      align: alignLeft,
    },
    {
      title: 'Creater Name',
      className: 'cursor-pointer',
      dataIndex: 'Creater_name',
      key: 'name',
      align: alignLeft,
    },
    {
      title: 'Template Name',
      className: 'cursor-pointer',
      dataIndex: 'category',
      key: 'name',
      align: alignLeft,
      render: (category: any) => <span>{category?.name}</span>,
    },
    {
      title: 'Usage Detail',
      className: 'cursor-pointer',
      dataIndex: 'Usage_detail',
      key: 'name',
      align: alignLeft,
      render: (Usage_detail: any) => <span>{Usage_detail}</span>,
    },
    {
      title: t('Created At'),
      dataIndex: 'createdAt',
      key: 'details',
      ellipsis: true,
      align: alignLeft,
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={categories.categories}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>
    </>
  );
};

export default CategoryList;
