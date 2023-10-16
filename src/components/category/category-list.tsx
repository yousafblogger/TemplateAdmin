import { AlignType, Table } from '@/components/ui/table';
import { SortOrder } from '@/types';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import { Category } from '@/types';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import Radio from '../ui/radio/radio';
import { Switch } from '@headlessui/react';
import { PostFunction } from '@/services/service';
import { toast } from 'react-toastify';

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
  const [is_approved,setisApproved]=useState(true)
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

  const handlechange=(row:any,catStatus:boolean)=>{
      let formData = {
        values: { status: catStatus,name:row.name},
      };
        PostFunction('category/update/' + row.slug, formData).then((result) => {
          if (result.status) {
            toast.success("Status Updated Successfully");
            categories.fetchCategories();
          } else {
            toast.error(result.error);
          }
        });
   
  
  }

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
      title: 'CAT_ID',
      className: 'cursor-pointer',
      dataIndex: '_id',
      key: 'id',
      align: alignLeft,
      width: 250,
      onHeaderCell: () => onHeaderClick('ids'),
    },
    {
      title: 'No Of Templates',
      className: 'cursor-pointer',
      dataIndex: 'Template_Count',
      key: 'Template_Count',
      align: alignLeft,
      width: 200,
      onHeaderCell: () => onHeaderClick('Template_Count'),
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
      title: 'Status',
      className: 'cursor-pointer',
      key: 'name',
      dataIndex:'status',
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick('name'),
      render: (status: boolean, row: any) => {
        if(row.sequence !=0)
          return (
            <Switch
             checked={status}
             onChange={()=>handlechange(row,!status)}
              className={`${
                status ? 'bg-accent' : 'bg-gray-300'
              } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none`}
              dir="ltr"
            >
              <span className="sr-only">Enable</span>
              <span
                className={`${
                  status ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
              />
            </Switch>
          );
      },
    },
 
    {
      title: (
        <span style={{ fontFamily: 'poppins' }}>
          {t('table:table-item-actions')}
        </span>
      ),
      dataIndex: '_id',
      key: 'actions',
      width: 150,
      align: 'right' as AlignType,
      render: (id: string, row: any) => {
        if (row.sequence != 0)
          return (
            <LanguageSwitcher
              deleteModalView={row.Template_Count>0?"":"DELETE_CATEGORY"}
              deleteAPIendPoint={`/category/delete/${id}`}
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
