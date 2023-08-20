import { Table } from '@/components/ui/table';
import { SortOrder } from '@/types';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import { Category } from '@/types';
import { Routes } from '@/config/routes';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import Modal from '../ui/modal/modal';
import Card from '../common/card';
import Input from '../ui/input';
import Button from '../ui/button';
import TextArea from '../ui/text-area';
import Label from '../ui/label';
import { toast } from 'react-toastify';
import { BsFillBellFill } from 'react-icons/bs';

export type IProps = {
  categories: Category[] | undefined;
};
const TemplateList = (categories: any) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();
  const [modalViiew, setModalViiew] = useState<any>(false);
  const [TempId, setTempId] = useState<any>('');
  const [loader, setLoader] = useState<any>(false);
  const [notificationVal, setNotificationVal] = useState<any>({
    title: '',
    message: '',
  });

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
      width: 250,
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
      title: 'Category Name',
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
      title: 'Notification',
      className: 'cursor-pointer',
      dataIndex: 'Usage_detail',
      key: 'name',
      align: alignRight,
      render: function Render(id: any, row: any) {
        const onIConClick = () => {
          setModalViiew(true);
          setTempId(row._id);
        };

        return (
          <div
            className="justify between flex cursor-pointer justify-end"
            style={{ fontFamily: 'poppins' }}
          >
            <div onClick={onIConClick} className="pr-8">
              <BsFillBellFill className="w-6 h-6" />
            </div>
          </div>
        );
      },
    },
  
    //DELETE AND EDIT
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
          return (
            <LanguageSwitcher
              deleteModalView="DELETE_CATEGORY"
              slug={id}
              record={row}
              routes={Routes?.category}
            />
          );
      },
    },
  ];
  const onNotificatioinSend = () => {
    setLoader(true);
    const notificationData = {
      app_id: process.env.NEXT_PUBLIC_APP_ID,
      contents: { en: notificationVal.message },
      headings: { en: notificationVal.title },
      included_segments: ['All'], // You can specify target segments here
      data: { template_id: TempId }, // Pass the template ID as data
    };
    console.log(process.env.NEXT_PUBLIC_APP_KEY);
    fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.NEXT_PUBLIC_APP_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Notification sent:', data);
        toast.success('Notification Sent Successfully');
        setModalViiew(false);
        setNotificationVal({ title: '', message: '' });
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
        toast.success('Something Went Wrong');
        setLoader(false);
      });
  };

  const onNotificationChange = (e: any) => {
    setNotificationVal({ ...notificationVal, [e.target.name]: e.target.value });
  };

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
      <Modal open={modalViiew} onClose={() => setModalViiew(false)}>
        <Card className="mt-4" style={{ width: 600 }}>
          <div className="">
            <Label className="flex">Template Id</Label>
            <Input value={TempId} disabled name="" />
            <Label className="flex pt-3">Title</Label>
            <Input onChange={onNotificationChange} name="title" />
            <Label className="flex pt-3">Message</Label>
            <TextArea onChange={onNotificationChange} name="message" />
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              loading={loader}
              onClick={onNotificatioinSend}
              className="rounded-md border p-2"
            >
              Send Message
            </Button>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default TemplateList;
