
import Layout from '@/components/layouts/admin';

import Card from '@/components/common/card';
import Search from '@/components/common/search';
import ProductList from '@/components/product/product-list';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopLayout from '@/components/layouts/shop';
import { useRouter } from 'next/router';
import LinkButton from '@/components/ui/link-button';
import { adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import { useShopQuery } from '@/data/shop';
import { useProductsQuery } from '@/data/product';
import { SortOrder } from '@/types';
import CategoryTypeFilter from '@/components/product/category-type-filter';
import cn from 'classnames';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { MoreIcon } from '@/components/icons/more-icon';
import Button from '@/components/ui/button';
import { Config } from '@/config';
import AddressList from '@/components/addressList/address-list';

export default function ProductsPage() {
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData, isLoading: fetchingShop } = useShopQuery({
    slug: shop as string,
  });
  const shopId = shopData?.id!;
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);
  const { openModal } = useModalAction();
  const { locale } = useRouter();

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { products, paginatorInfo, loading, error } = useProductsQuery(
    {
      language: locale,
      name: searchTerm,
      limit: 20,
      shop_id: shopId,
      type,
      categories: category,
      orderBy,
      sortedBy,
      page,
    },
    {
      enabled: Boolean(shopId),
    }
  );

  function handleImportModal() {
    openModal('EXPORT_IMPORT_PRODUCT', shopId);
  }

//   if (loading || fetchingShop)
//     return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center py-4
         md:flex-row border-b-2">
          <div className="mb-4 md:mb-0 md:w-1/2">
            <h1 className="text-lg font-semibold text-heading">
              My Addresses
            </h1>
            <span className='text-sm text-slate-400'>Manage your shipping and pickup addresses</span>
          </div>

          <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
            <div className="flex w-full items-end justify-end">

              {locale === Config.defaultLanguage && (
                <LinkButton
                  href={`/${shop}/products/create`}
                  className="h-12 ms-4 md:ms-6"
                >
                  <span className="hidden md:block">
                    + Add a new address
                  </span>
                  <span className="md:hidden">
                    + {t('form:button-label-add')}
                  </span>
                </LinkButton>
              )}
            </div>

          </div>
        </div>
        <AddressList />
      </Card>
     
    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
ProductsPage.Layout = Layout;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
