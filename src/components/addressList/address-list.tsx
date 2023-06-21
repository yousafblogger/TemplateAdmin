import Layout from '@/components/layouts/admin';
import Card from '@/components/common/card';
import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { adminOwnerAndStaffOnly } from '@/utils/auth-utils';
import {CiLocationOn} from "react-icons/ci"
export default function AddressList() {
  const {
    query: { shop },
  } = useRouter();

  const { t } = useTranslation();
  const { locale } = useRouter();

 

  return (
    <>
    <div className='flex flex-wrap gap-10 mt-5 justify-between'>
    <div className='flex flex-wrap gap-10'>
    <div className='flex flex-col'>
    <CiLocationOn className='h-6 w-6 text-green-500'/>
    </div>
    <div className='flex flex-wrap'>
    <ul className=' flex flex-col gap-3 text-gray-500'>
      <li>
        Full Name
      </li>
      <li>
        Phone Number
      </li>
      <li>
        Address
      </li>
    </ul>
    </div>
    <div className='flex  flex-wrap'>
    <ul className='flex flex-col gap-3'>
      <li >
       Home 
       <span className="text-red-500 bg-red-100 text-xs ml-2 p-1">
        Pickup Address
        </span>
      </li>
      <li>
        09088738738
      </li>
      <li>
        Walton Road Lahore
      </li>
    </ul>
    </div>
    </div>
    <div className='cursor-pointer flex flex-col text-green-500'>
    Edit
    </div>
    </div>
    
    </>
  );
}

AddressList.Layout = Layout;


// export const getServerSideProps = async ({ locale }: any) => ({
//   props: {
//     ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
//   },
// });
