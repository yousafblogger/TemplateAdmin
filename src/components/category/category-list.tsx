import Pagination from '@/components/ui/pagination';
import { AlignType, Table } from '@/components/ui/table';
import { getIcon } from '@/utils/get-icon';
import * as categoriesIcon from '@/components/icons/category';
import { Author, SortOrder } from '@/types';
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
  // paginatorInfo: MappedPaginatorInfo | null;
  // onPagination: (key: number) => void;
  // onSort: (current: any) => void;
  // onOrder: (current: string) => void;
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

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      // onSort((currentSortDirection: SortOrder) =>
      //   currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      // );
      // onOrder(column!);
      // setSortingObj({
      //   sort:
      //     sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
      //   column: column,
      // });
    },
  });

  const columns = [
    {
      title: 'Name',
      className: 'cursor-pointer',
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: 'Sequence',
      className: 'cursor-pointer',
      dataIndex: 'sequence',
      key: 'name',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
    },
    {
      title: t('Created At'),
      dataIndex: 'createdAt',
      key: 'details',
      ellipsis: true,
      align: alignLeft,
      width: 200,
    },
    {
      title: (
        <span style={{ fontFamily: 'poppins' }}>
          {t('table:table-item-actions')}
        </span>
      ),
      dataIndex: 'slug',
      key: 'actions',
      width: 300,
      align: 'right' as AlignType,
      render: (id: string, row: any) => {
        if (row.sequence != 0)
          return (
            <LanguageSwitcher
              slug={id}
              record={row}
              routes={Routes?.category}
            />
          );
      },
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

      {/* {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )} */}
    </>
  );
};

export default CategoryList;
