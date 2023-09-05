import { AlignType, Table } from '@/components/ui/table';
import { SortOrder, Template } from '@/types';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useEffect, useState } from 'react';
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
import { WalletPointsIcon } from '../icons/wallet-point';
import { TrashIcon } from '../icons/trash';
import { PostFunction, PutFunction } from '@/services/service';
import { Router, useRouter } from 'next/router';
import { ArrowUp } from '../icons/arrow-up';
import { ArrowDown } from '../icons/arrow-down';

export type IProps = {
  template: Template[] | undefined;
};
const TemplateList = (template: any) => {
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();
  const [modalViiew, setModalViiew] = useState<any>(false);
  const [deleteModalViiew, setdeleteModalViiew] = useState<any>(false);
  const [TempId, setTempId] = useState<any>('');
  const [loader, setLoader] = useState<any>(false);
  const [loaderDelet, setLoaderDelet] = useState<any>(false);
  const [showDelete, setShowDelete] = useState<any>(false);
  const [TrendingModalView, setTrendingModalView] = useState<any>(false);
  const [unTrendingModalView, setunTrendingModalView] = useState<any>(false);

  const [idds, setIds] = useState<any>([]);
  const [notificationVal, setNotificationVal] = useState<any>({
    title: '',
    message: '',
  });
  const router = useRouter();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  useEffect(() => {
    if (idds.length > 0) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [idds]);

  const onChangeSelectAll = (e: any) => {
    setShowDelete(e.target.checked);
    if (e.target.checked) {
      const allIds = template.template.map((record: any) => record._id);
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  const onChangeSingle = (id: any) => {
    setIds((prevSelectedIds: any) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((existingId: any) => existingId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const onDeleteAllClickModal = () => {
    setdeleteModalViiew(true);
  };
  const onTrendingModalView = () => {
    setTrendingModalView(true);
  };
  const onunTrendingModalView = () => {
    setunTrendingModalView(true);
  };


  const onDeleteAllClick = () => {
    setLoaderDelet(true);
    let obj = { ids: idds };
    PostFunction('/template/deleteAll', obj).then((result: any) => {
      if (result.status) {
        toast.success(result.message);
        setLoaderDelet(false);
        setdeleteModalViiew(false);
        template.GetCat();
      } else {
        toast.error(result.message);
        setLoaderDelet(false);
        setdeleteModalViiew(false);
      }
    });
  };

  const onTrending = (reset:any) => {    
    setLoaderDelet(true);
   if(reset){
    let obj = { ids: idds,reset:true };
    PutFunction('/template/TrendingTemplateUpdate', obj).then((result: any) => {
      if (result.status) {
        toast.success(result.message);
        setLoaderDelet(false);
        setunTrendingModalView(false);
        template.GetCat();
      } else {
        toast.error(result.message);
        setLoaderDelet(false);
        setunTrendingModalView(false);
      }
    });
   }else{
    let obj = { ids: idds,reset:false };
    PutFunction('/template/TrendingTemplateUpdate', obj).then((result: any) => {
      if (result.status) {
        toast.success(result.message);
        setLoaderDelet(false);
        setTrendingModalView(false);
        template.GetCat();
      } else {
        toast.error(result.message);
        setLoaderDelet(false);
        setTrendingModalView(false);
      }
    });
   }
  };


  const columns = [
    {
      title: (
        <div style={{ fontFamily: 'poppins', display: 'flex' }}>
            {showDelete && (
            <>
           
             <div
             onClick={onTrendingModalView}
             className=" text-red-500 transition duration-200 hover:text-red-600 focus:outline-none cursor-pointer"
           >
             <ArrowUp width={20} />
           </div>
           <div
             onClick={onunTrendingModalView}
             className="ml-2 mr-2 text-black transition duration-200  focus:outline-none cursor-pointer"
           >
             <ArrowDown width={20}  />
           </div>
           </>
          )}
          <span>Select All</span>
          <input
            className="ml-3"
            type="checkbox"
            onChange={onChangeSelectAll}
          />
          {showDelete && (
            <>
            <div
              onClick={onDeleteAllClickModal}
              className="ml-3 text-red-500 transition duration-200 hover:text-red-600 focus:outline-none cursor-pointer"
            >
              <TrashIcon width={16} />
            </div>
           </>
          )}
        </div>
      ),
      dataIndex: '_id',
      key: 'actions',
      width: 200,
      render: (id: string, row: any) => {
        return (
          <input
            className="ml-5"
            onChange={() => onChangeSingle(row._id)}
            checked={idds.includes(id)}
            type="checkbox"
          />
        );
      },
    },
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
      title: 'Sequence',
      className: 'cursor-pointer',
      dataIndex: 'sequence',
      key: 'name',
      align: alignLeft,
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
      dataIndex: '_id',
      key: 'actions',
      width: 300,
      align: 'right' as AlignType,
      render: (id: string, row: any) => {
        return (
          <LanguageSwitcher
            deleteModalView="DELETE_TAG"
            deleteAPIendPoint={`/template/delete/${id}`}
            slug={id}
            record={row}
            routes={Routes?.template}
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
    console.log(notificationData);
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
          data={template.template}
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
      <Modal open={deleteModalViiew} onClose={() => setdeleteModalViiew(false)}>
        <Card className="mt-4" style={{ width: 600 }}>
          <div>
            <h1 className="text-xl text-red">
              {' '}
              Are you sure you want to Delete
            </h1>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex justify-end">
              <Button
                loading={loader}
                onClick={() => setdeleteModalViiew(false)}
                className="rounded-md border p-2"
              >
                Cancel
              </Button>
            </div>
            <div className="">
              <Button
                loading={loaderDelet}
                onClick={onDeleteAllClick}
                className="rounded-md border p-2"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
      <Modal open={TrendingModalView} onClose={() => setTrendingModalView(false)}>
        <Card className="mt-4" style={{ width: 600 }}>
          <div>
            <h1 className="text-xl text-red">
              {' '}
              Are you sure you want to Make Selected Templates Trending?
            </h1>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex justify-end">
              <Button
                loading={loader}
                onClick={() => setTrendingModalView(false)}
                className="rounded-md border p-2"
              >
                Cancel
              </Button>
            </div>
            <div className="">
              <Button
                loading={loaderDelet}
                onClick={()=>onTrending(false)}
                className="rounded-md border p-2"
              >
                Make Trending
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
      <Modal open={unTrendingModalView} onClose={() => setunTrendingModalView(false)}>
        <Card className="mt-4" style={{ width: 600 }}>
          <div>
            <h1 className="text-xl text-red">
              {' '}
              Are you sure you want to remove Selected Templates From Trending?
            </h1>
          </div>
          <div className="flex justify-between mt-10">
            <div className="flex justify-end">
              <Button
                loading={loader}
                onClick={() => setunTrendingModalView(false)}
                className="rounded-md border p-2"
              >
                Cancel
              </Button>
            </div>
            <div className="">
              <Button
                loading={loaderDelet}
                onClick={()=>onTrending(true)}
                className="rounded-md border p-2"
              >
                Remove Trending
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default TemplateList;
