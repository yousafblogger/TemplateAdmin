import Alert from '@/components/ui/alert';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useRegisterMutation } from '@/data/user';
import Label from '@/components/ui/label';
import Select from 'react-select';
import { selectStyles } from '@/components/ui/select/select.styles';
import React from 'react';
import Loader from '@/components/ui/loader/loader';
import Modal from '../ui/modal/modal';
import Card from '../common/card';
import FileInput from '../ui/file-input';
import Autocomplete from 'react-google-autocomplete';
import { useRouter } from 'next/router';
import TextArea from '../ui/text-area';
import GooglePlacesAutocomplete from '../form/google-places-autocomplete';
import {
  GetFunction,
  ImagePostFunction,
  PostFunction,
} from '@/services/service';
import FormData from 'form-data';
import { toast } from 'react-toastify';

type FormValues = {
  firstName: any;
  lastName: any;
  email: any;
  name: any;
  business_category: any;
  currency_id: any;
  time_zone: any;
  password: any;
  business_category_name: any;
  storeUrl: any;
};

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: registerUser, isLoading: loading } = useRegisterMutation();
  const [loadingData, setloadingData] = useState(false);
  const [closeDialog, setCloseDialog] = useState<any>(false);
  const [customAddress, setCustomAddress] = useState(false);
  const router = useRouter();
  const [shopInfo, setShopInfo] = useState<any>({
    shopName: '',
    phone: '',
    email: '',
    fullName: '',
    addressPhone: '',
    address: '',
    addressDetail: '',
    country: '',
    city: '',
    state: '',
    latLang: '',
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({});
  const { t } = useTranslation();
  var categoryForm = new FormData();
  async function onSubmit({}: FormValues) {}
  const [imageFile, setImageFile] = useState<any>();
  const [path, setPath] = useState<string>();
  const [AddLoader, setAddLoader] = useState(false);

  const onAddAddressClick = () => {
    setCloseDialog(true);
  };

  useEffect(() => {
    if (imageFile) {
      setPath(URL.createObjectURL(imageFile));
    }
  }, [imageFile]);

  const onCheckEdChange = (e: any) => {
    setCustomAddress(e.target.checked);
  };

  const onSavePress = () => {
    setAddLoader(true);

    categoryForm.append('file', imageFile);
    ImagePostFunction('/fileUpload', categoryForm).then((result) => {
      if (result.statusCode == 201) {
        let form = {
          shop_name: shopInfo.shopName,
          email: shopInfo.email,
          image: result.url,
          phone_no: shopInfo.phone,
          is_brand: 0,
          // brand: {
          //   personal_store: 'string',
          //   Official_franchisee: 'string',
          // },
          personal_store: 'string',
          Official_franchisee: 'string',
          ecommerce_license: result.url,
          is_google: customAddress == true ? 0 : 1,
          google_address: {
            location: {
              latitude: shopInfo.latLang.lat,
              longitude: shopInfo.latLang.lng,
            },
            locationText: shopInfo.latLang.formattedAddress,
          },
          is_manual: customAddress == true ? 1 : 0,
          address: {
            country: shopInfo.country,
            city: shopInfo.city,
            state: shopInfo.state,
            zip_code: 'string',
            street_address: shopInfo.address,
          },
          address_full_name: shopInfo.fullName,
          address_phone_no: shopInfo.addressPhone,
          detail_address: shopInfo.addressDetail,
          postal_code: 'string',
        };

        PostFunction('/store', form).then((result) => {
          if (result.statusCode == 201) {
            toast.success(result.message);
            setAddLoader(false);
            setCloseDialog(false);
            setCustomAddress(false);
          } else {
            toast.error(result.message);
          }
        });
      }
    });
  };

  const cityState = [
    { id: 1, label: 'Abu Dhabi', value: 'Abu Dhabi' },
    { id: 2, label: 'Dubai', value: 'Dubai' },
    { id: 3, label: 'Sharjah', value: 'Sharjah' },
    { id: 4, label: 'Umm Al Qaiwain', value: 'Umm Al Qaiwain' },
    { id: 5, label: 'Fujairah', value: 'Fujairah' },
    {
      id: 6,
      label: 'Ajman and Ras Al Khaimah',
      value: 'Ajman and Ras Al Khaimah',
    },
  ];
  const countryList = [{ id: 1, label: 'UAE', value: 'UAE' }];

  const onShopeNameChange = (e: any) => {
    setShopInfo({ ...shopInfo, shopName: e.target.value });
  };

  const onPhoneNumberChange = (e: any) => {
    setShopInfo({ ...shopInfo, phone: e.target.value });
  };

  const onChangeEmail = (e: any) => {
    setShopInfo({ ...shopInfo, email: e.target.value });
  };

  const onFullNameChange = (e: any) => {
    setShopInfo({ ...shopInfo, fullName: e.target.value });
  };

  const onAddressPhoneChange = (e: any) => {
    setShopInfo({ ...shopInfo, addressPhone: e.target.value });
  };

  const onAddressChange = (e: any) => {
    setShopInfo({ ...shopInfo, address: e.target.value });
  };

  const onAddressDetailChange = (e: any) => {
    setShopInfo({ ...shopInfo, addressDetail: e.target.value });
  };

  const onCountryChnage = (e: any) => {
    setShopInfo({ ...shopInfo, country: e.value });
  };

  const onCityChnage = (e: any) => {
    setShopInfo({ ...shopInfo, city: e.value });
  };

  const onStateChange = (e: any) => {
    setShopInfo({ ...shopInfo, state: e.value });
  };

  const onChangeLocation = (place: any) => {
    setShopInfo({ ...shopInfo, latLang: place });
  };

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  return (
    <>
      <div>
        <div className="flex">
          <div className="mr-3 w-full">
            <Input
              label={t('Shop Name')}
              name=""
              variant="outline"
              className="mb-4"
              value={shopInfo.shopName}
              onChange={onShopeNameChange}
            />

            <div className="mb-3">
              <Input
                label={t('Phone Number')}
                name=""
                variant="outline"
                type="number"
                className="mb-4"
                value={shopInfo.phone}
                onChange={onPhoneNumberChange}
              />
            </div>

            <div className="mt-3 flex justify-between mb-3">
              <div className="flex items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Personal store
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked
                  id="default-radio-2"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Official Franchisee
                </label>
              </div>
            </div>

            <div className="mb-3">
              <Button onClick={onAddAddressClick}>Add+</Button>
            </div>
          </div>

          <div className="ml-3 w-full">
            <Input
              label={t('Email')}
              name=""
              variant="outline"
              className="mb-4"
              value={shopInfo.email}
              onChange={onChangeEmail}
            />
            <Label className="mt-3">Upload E-Commerce license image</Label>
            <FileInput
              name="image"
              control={control}
              setImageFile={setImageFile}
              multiple={false}
            />
            {path && (
              <img
                style={{ width: '50px', height: '50px', marginTop: '1rem' }}
                src={path}
                alt="cate-image"
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 flex">
        <div className="mr-3 w-full"></div>
        <div className="ml-3 w-full">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="float-right"
            loading={loading}
          >
            {t('Register')}
          </Button>
        </div>
      </div>
      <Modal open={closeDialog} onClose={() => setCloseDialog(true)}>
        <Card className="mt-4" style={{ width: 600 }}>
          <Input
            label={t('Full Name')}
            name=""
            variant="outline"
            className="mb-4"
            value={shopInfo.fullName}
            onChange={onFullNameChange}
          />
          <Input
            label={t('Phone Number')}
            name=""
            variant="outline"
            className="mb-4"
            value={shopInfo.addressPhone}
            onChange={onAddressPhoneChange}
          />

          <div className="mt-3 flex justify-between">
            <Label>Address</Label>
            <Label className="cursor-pointer text-blue-600">
              <input
                className="mr-0 h-4 w-4 rounded accent-dark"
                onChange={onCheckEdChange}
                type="checkbox"
              />
              Add Custom Address
            </Label>
          </div>
          {!customAddress && (
            <GooglePlacesAutocomplete onChange={onChangeLocation} />
          )}

          {customAddress && (
            <div>
              <div className="mt-3">
                <Label>Select Country</Label>
                <Select
                  options={countryList}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.id}
                  placeholder="Select"
                  styles={selectStyles}
                  onChange={onCountryChnage}
                />
              </div>
              <div className="mt-3">
                <Label>Select City</Label>
                <Select
                  options={cityState}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.id}
                  placeholder="Select"
                  styles={selectStyles}
                  onChange={onCityChnage}
                />
              </div>
              <div className="mt-3">
                <Label>Select State</Label>
                <Select
                  options={cityState}
                  getOptionLabel={(option: any) => option.label}
                  getOptionValue={(option: any) => option.id}
                  placeholder="Select"
                  styles={selectStyles}
                  onChange={onStateChange}
                />
              </div>
              <div className="mt-3">
                <Input
                  label={t('Address')}
                  variant="outline"
                  name=""
                  className="mb-4"
                  value={shopInfo.address}
                  onChange={onAddressChange}
                />
              </div>
            </div>
          )}

          <TextArea
            label={t('Address Detail')}
            name=""
            variant="outline"
            className="mb-4 mt-4"
            value={shopInfo.addressDetail}
            onChange={onAddressDetailChange}
          />

          <div className="flex justify-end mt-5">
            <div className="flex">
              <Button
                onClick={onSavePress}
                loading={AddLoader}
                disabled={AddLoader}
              >
                Add
              </Button>
              <Button onClick={() => setCloseDialog(false)} className="ml-5">
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </Modal>
      {errorMessage ? (
        <Alert
          message={t(errorMessage)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
    </>
  );
};

export default RegistrationForm;
