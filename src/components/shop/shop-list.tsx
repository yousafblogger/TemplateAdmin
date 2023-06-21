import { useState } from 'react';
import Pagination from '@/components/ui/pagination';
import Image from 'next/image';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import Badge from '@/components/ui/badge/badge';
import { ShopPaginator, SortOrder } from '@/types';
import TitleWithSort from '@/components/ui/title-with-sort';
import Link from '@/components/ui/link';
import { Shop, MappedPaginatorInfo } from '@/types';
import { useRouter } from 'next/router';
import { Routes } from '@/config/routes';

type IProps = {
  shops: any;
  // paginatorInfo: MappedPaginatorInfo | null;
  // onPagination: (current: number) => void;
  // onSort: (current: any) => void;
  // onOrder: (current: string) => void;
};

const ShopList = ({
  shops,
}: // paginatorInfo,
// onPagination,
// onSort,
// onOrder,
IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const router = useRouter();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    // onClick: () => {
    //   onSort((currentSortDirection: SortOrder) =>
    //     currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
    //   );
    //   onOrder(column!);
    //   setSortingObj({
    //     sort:
    //       sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
    //     column: column,
    //   });
    // },
  });

  const columns = [
    {
      title: t('table:table-item-logo'),
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 74,
      render: (image: any, record: any) => (
        <Image
          src={siteSettings.product.placeholder}
          alt={record?.name}
          loader={() => image}
          layout="fixed"
          width={42}
          height={42}
        />
        // <Image
        //   src={image?.thumbnail ?? siteSettings.product.placeholder}
        //   alt={record?.name}
        //   layout="fixed"
        //   width={42}
        //   height={42}
        //   className="overflow-hidden rounded"
        // />
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
          }
          isActive={sortingObj.column === 'name'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'shop_name',
      key: 'name',
      align: alignLeft,
      // onHeaderCell: () => onHeaderClick('name'),
      render: (name: any, row: any) => (
        <Link href={`/shopeDetails/${row.id}`}>
          <span className="whitespace-nowrap">{name}</span>
        </Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'owner',
      align: 'left',
      render: (name: any, { slug }: any) => (
        // <Link href={`/${slug}`}>
        <span className="whitespace-nowrap">{name}</span>
        // </Link>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'email',
      key: 'owner',
      align: 'center',
      render: (name: any, { slug }: any) => (
        // <Link href={`/${slug}`}>
        <span className="whitespace-nowrap">2</span>
        // </Link>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-status')}
          ascending={
            sortingObj.sort === SortOrder.Asc &&
            sortingObj.column === 'is_active'
          }
          isActive={sortingObj.column === 'is_active'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      onHeaderCell: () => onHeaderClick('is_active'),
      render: (is_active: boolean) => (
        <Badge
          textKey={is_active ? 'common:text-active' : 'common:text-inactive'}
          color={is_active ? 'bg-accent' : 'bg-red-500'}
        />
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_no',
      key: 'owner',
      align: 'left',
      render: (name: any, { slug }: any) => (
        // <Link href={`/${slug}`}>
        <span className="whitespace-nowrap">{name}</span>
        // </Link>
      ),
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: alignRight,
      render: (id: string, { slug, is_active }: any) => {
        return (
          <ActionButtons
            id={id}
            approveButton={true}
            detailsUrl={`/${slug}`}
            isShopActive={is_active}
          />
        );
      },
    },

    // {
    //   title: (
    //     <TitleWithSort
    //       title={t('table:table-item-total-products')}
    //       ascending={
    //         sortingObj.sort === SortOrder.Asc &&
    //         sortingObj.column === 'products_count'
    //       }
    //       isActive={sortingObj.column === 'products_count'}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'products_count',
    //   key: 'products_count',
    //   align: 'center',
    //   onHeaderCell: () => onHeaderClick('products_count'),
    // },
    // {
    //   title: (
    //     <TitleWithSort
    //       title={t('table:table-item-total-orders')}
    //       ascending={
    //         sortingObj.sort === SortOrder.Asc &&
    //         sortingObj.column === 'orders_count'
    //       }
    //       isActive={sortingObj.column === 'orders_count'}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'orders_count',
    //   key: 'orders_count',
    //   align: 'center',
    //   onHeaderCell: () => onHeaderClick('orders_count'),
    // },
    // {
    //   title: (
    //     <TitleWithSort
    //       title={t('table:table-item-status')}
    //       ascending={
    //         sortingObj.sort === SortOrder.Asc &&
    //         sortingObj.column === 'is_active'
    //       }
    //       isActive={sortingObj.column === 'is_active'}
    //     />
    //   ),
    //   className: 'cursor-pointer',
    //   dataIndex: 'is_active',
    //   key: 'is_active',
    //   align: 'center',
    //   onHeaderCell: () => onHeaderClick('is_active'),
    //   render: (is_active: boolean) => (
    //     <Badge
    //       textKey={is_active ? 'common:text-active' : 'common:text-inactive'}
    //       color={is_active ? 'bg-accent' : 'bg-red-500'}
    //     />
    //   ),
    // },
    // {
    //   title: t('table:table-item-actions'),
    //   dataIndex: 'id',
    //   key: 'actions',
    //   align: alignRight,
    //   render: (id: string, { slug, is_active }: any) => {
    //     return (
    //       <ActionButtons
    //         id={id}
    //         approveButton={true}
    //         detailsUrl={`/${slug}`}
    //         isShopActive={is_active}
    //       />
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={shops}
          rowKey="id"
          scroll={{ x: 800 }}
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

export default ShopList;
