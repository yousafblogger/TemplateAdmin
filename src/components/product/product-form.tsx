import Input from '@/components/ui/input';
import TextArea from '@/components/ui/text-area';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Modal from '../ui/modal/modal';
import Label from '@/components/ui/label';
import Radio from '@/components/ui/radio/radio';
import { useRouter } from 'next/router';
import FileInput from '../common/FileInput';
import ProductVariableForm from './product-variable-form';
import ProductSimpleForm from './product-simple-form';
import { ProductType, Product } from '@/types';
import { useTranslation } from 'next-i18next';
import Alert from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import 'swiper/css/navigation';
import 'swiper/css';
ImportVariationOptions;
import { ProductFormValues } from './form-utils';
import ImportVariationOptions from './import-variation-options';
import ProductCondition from './product-condition';
import {
  GetFunction,
  ImagePostFunction,
  PostFunction,
} from '@/services/service';
import Loader from '../ui/loader/loader';
import Select from '../ui/select/select';
import { selectStyles } from '../ui/select/select.styles';
import FormData from 'form-data';
import { toast } from 'react-toastify';
import Title from '../ui/title';
import ProductWholsale from './product-wholesale-form';

type ProductFormProps = {
  initialValues?: Product | null;
};

export default function CreateOrUpdateProductForm({
  initialValues,
}: ProductFormProps) {
  var productForm = new FormData();
  var productFormMultiple = new FormData();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [closeDialog, setCloseDialog] = useState<any>(false);
  const { t } = useTranslation();
  const [newInput, setNewInput] = useState<any>({
    variationOne: [],
    variationTwo: [],
  });
  const [specificationArray, setSpecificationArray] = useState<any>([]);
  const methods = useForm<ProductFormValues>({
    // @ts-ignore
  });
  const [imageFile, setImageFile] = useState<any>([]);
  const [imageFile2, setImageFile2] = useState<any>([]);
  const [imgArr, setImageArr] = useState<any>();
  const [imageloading, setImageLoading] = useState<any>(false);

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<any>({
    //@ts-ignore
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: 'variations',
  });

  const addProduct = (featured: any, multiple: any) => {};

  const onSubmit = () => {
    setbtnloading(true);
    let obj = {
      is_price_variaction: ProductTypeDrop == 'variable' ? 1 : 0,
      variactionList: newInput,
      category_id: categoryID,
      name: input.productName,
      featured_image: imageFile[0]?.url,
      description: input.productDescription,
      price: 1,
      store_id: 1,
      pre_order: preOrder == 'yes' ? input.shippingHeight : 0,
      condition: ConditionDrop,
      parent_sku: input.productSku,
      stock: '90',
      fields: specificationArray,
      is_multiple_images: 1,
      images: imageFile2,
      shipping: {
        W: input.shippingWidth,
        L: input.shippingLength,
        H: input.shippingHeight,
        weight: input.shippingWeight,
      },
      simple_product: ProductTypeDrop == 'simple' ? 1 : 0,
      simple_product_info: {
        simple_product_price: input.simpleProductPrice,
        simple_product_quantity: input.simpleProductQuantity,
        simple_product_parent_sku: input.simpleProductSku,
        simple_product_stock: input.simpleProductStock,
      },
    };
    PostFunction('/product', obj).then((result: any) => {
      if (result.statusCode == 200) {
        setbtnloading(false);
        toast.success(result.message);
        router.back();
      } else {
        setbtnloading(false);
        toast.error(result.message);
      }
    });
  };

  const handleModal = () => {
    setCategoryName([]);
    setCloseDialog(true);
  };

  const [preOrder, setPreOrder] = useState('no');
  const [ProductTypeDrop, setProductTypeDrop] = useState('simple');
  const [ConditionDrop, setConditionDrop] = useState('');

  const onChanegePreOrder = (e: any) => {
    setPreOrder(e.target.value);
  };

  const [categoryData, setCategoryData] = useState<any>([]);
  const [loadingData, setloadingData] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [categoryID, setCategoryID] = useState<any>();
  const [categoryName, setCategoryName] = useState<any>([]);
  const [specificationDiv, setSpecificationDiv] = useState(false);
  const [specificationLoader, setSpecificationLoader] = useState(false);
  const [specificationData, setSpecificationData] = useState<any>();

  useEffect(() => {
    setloadingData(true);
    GetFunction('/categories{is_active}?is_active=1').then((result: any) => {
      setCategoryData(result.data);
      setloadingData(false);
    });
  }, []);

  const [catChild, setCatChild] = useState<any>([
    {
      id: '',
      children: [],
    },
  ]);

  function handleChange(event: any) {
    const { name, value } = event.target;
    setInput((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(() => {
    if (specificationData && specificationData.fields) {
      const newSpecificationArray = [];

      for (let i = 0; i < specificationData.fields.length; i++) {
        newSpecificationArray.push({ name: '', value: '' });
      }

      setSpecificationArray(newSpecificationArray);
    }
  }, [specificationData]);

  const handleChangeSpecification = (e: any, index: number, name: any) => {
    const { value } = e.target ? e.target : e;

    setSpecificationArray((prevArray: any[]) => {
      const updatedArray = [...prevArray];
      // Update existing object
      updatedArray[index] = {
        ...updatedArray[index],
        name,
        value,
      };
      return updatedArray;
    });
  };

  const [input, setInput] = useState<any>({
    productName: '',
    productDescription: '',
    simpleProductPrice: '',
    simpleProductQuantity: '',
    simpleProductStock: '',
    simpleProductSku: '',
    shippingWeight: '',
    shippingWidth: '',
    shippingHeight: '',
    shippingLength: '',
    preOrder: '',
    condition: '',
    productSku: '',
  });

  const handleSub = (cat: string, catName: any) => {
    const filtered: any = categoryData?.filter((c: any) => {
      return c.id === cat;
    });
    setCatChild([{ id: cat, children: filtered[0].children }]);
    setCategoryID(cat);
    setCategoryName([...categoryName, catName]);
  };

  const handleSubSub = (subcatId: string, index: number, catName: any) => {
    // Find the object with the matching subcatId
    const subcatObj = catChild[index].children?.find(
      (subcat: any) => subcat.id === subcatId
    );
    if (subcatObj && subcatObj.children.length > 0) {
      // Remove the existing children for the selected parent
      const newCatChild = [...catChild];
      newCatChild.splice(index + 1);

      // Check if the catChild state already contains an object with the same id
      const objIndex = newCatChild.findIndex((cat: any) => cat.id === subcatId);
      if (objIndex === -1) {
        // If no object in the catChild state has the same id, add a new object
        newCatChild.push({ id: subcatId, children: subcatObj.children });
      } else {
        // If an object with the same id already exists, update it instead of adding a new one
        newCatChild[objIndex] = { id: subcatId, children: subcatObj.children };
      }

      setCatChild(newCatChild);
    }
    setCategoryID(subcatId);
    setCategoryName([...categoryName, catName]);
  };

  const onSelectClick = () => {
    setSpecificationLoader(true);
    GetFunction('/categoriesFields/' + categoryID).then((result: any) => {
      if (result.statusCode == 200) {
        setSpecificationData(result.data);
        setCloseDialog(false);
        setSpecificationDiv(true);
        setSpecificationLoader(false);
      }
    });
  };

  const productType = [
    { name: 'Simple Product', value: ProductType.Simple },
    { name: 'Variable Product', value: ProductType.Variable },
  ];
  const productCondition = [
    { names: 'Used', value: 0 },
    { names: 'New', value: 1 },
  ];

  const onChangeProductType = (e: any) => {
    setProductTypeDrop(e.value);
  };

  const onChangeCondition = (e: any) => {
    setConditionDrop(e.value);
  };

  if (loadingData) return <Loader text={t('common:text-loading')} />;

  console.log('====================================');
  console.log(categoryName);
  console.log('====================================');

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={t('form:featured-image-help-text')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              {/* <FileInput name="image" control={control} multiple={false} /> */}
              <FileInput
                keyPrefix="one"
                image={imageFile}
                setImage={setImageFile}
                multiple={false}
                loading={imageloading}
                setloading={setImageLoading}
              />
              {/* {path && (
                <img
                  style={{ width: '50px', height: '50px', marginTop: '1rem' }}
                  src={path}
                  alt="cate-image"
                />
              )} */}
            </Card>
          </div>
          {/* <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={'Featured Video'}
              details={'Upload Your Product Featured Video Here'}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="image" control={control} multiple={false} />
            </Card>
          </div> */}

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={t('form:gallery-title')}
              details={t('form:gallery-help-text')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput
                keyPrefix="Two"
                image={imageFile2}
                setImage={setImageFile2}
                multiple={true}
                loading={imageloading}
                setloading={setImageLoading}
              />
              {/* <div className="flex">
                {path2 &&
                  path2.map((res: any, index: any) => (
                    <img
                      key={index}
                      style={{
                        padding: 10,
                        width: '50px',
                        height: '50px',
                        marginTop: '1rem',
                      }}
                      src={res}
                      alt="cate-image"
                    />
                  ))}
              </div> */}
            </Card>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />
            <div className="mb-4">
              {categoryName.length > 0 && (
                <div className="border p-3">
                  <div className="flex">
                    <span>Category: </span>
                    {categoryName.map((res: any, index: number) => (
                      <div className="flex" key={index}>
                        <span>{res}</span>
                        {index !== categoryName.length - 1 && (
                          <span>{'>'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <Button onClick={handleModal} type="button" className="mt-3">
                Add Category
              </Button>
            </div>
            <Modal
              className="w-full"
              open={closeDialog}
              onClose={() => setCloseDialog(false)}
            >
              <Card className="mt-4 w-full">
                <h2 className="font-bold">Add Category</h2>
                <div className="my-5 flex flex-col border-b border-dashed border-border-base bg-gray-100 p-5  sm:my-8">
                  <div className="mb-5 flex justify-between gap-5">
                    <input
                      className="border-white"
                      type="search"
                      placeholder="Search"
                    />
                    <p>How to set Category </p>
                  </div>
                  <Card className="w-full">
                    <div className="flex">
                      <div className="overflow-y-scroll">
                        <ul className="h-64">
                          {categoryData &&
                            categoryData.map((c: any) => {
                              return (
                                <div
                                  onClick={() => handleSub(c.id, c.name)}
                                  key={c.id}
                                  className={`flex w-44 cursor-pointer justify-between
                                   gap-10 p-2 hover:bg-gray-100 ${
                                     c.id === catChild[0].id
                                       ? 'text-red-600'
                                       : ''
                                   }`}
                                >
                                  <li style={{ cursor: 'pointer' }}>
                                    {c.name}
                                  </li>
                                  <span>
                                    {c.name !== '' && (
                                      <AiOutlineRight className="h-3 w-3 mt-2" />
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                        </ul>
                      </div>

                      {catChild?.map((c: any, index: any) => {
                        return (
                          <>
                            <div className="border-r">
                              <ul>
                                {c?.children?.map((sub: any, subIndex: any) => {
                                  return (
                                    <>
                                      <div
                                        onClick={() =>
                                          handleSubSub(sub.id, index, sub.name)
                                        }
                                        key={c.id}
                                        className={`flex w-44
                                      cursor-pointer
                                      justify-between gap-10 p-2 hover:bg-gray-100
                                      ${
                                        sub.id === catChild[index + 1]?.id ||
                                        sub.id === categoryID
                                          ? 'text-red-600'
                                          : ''
                                      }

                                       `}
                                      >
                                        <li style={{ cursor: 'pointer' }}>
                                          {sub.name}{' '}
                                        </li>
                                        {sub.name !== '' &&
                                        sub.children?.length > 0 ? (
                                          <span>
                                            <AiOutlineRight className="h-3 w-3 mt-2" />
                                          </span>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                              </ul>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </Card>
                </div>
                <div className="mt-5 flex justify-between">
                  <Button>Cancel</Button>
                  <Button
                    onClick={onSelectClick}
                    loading={specificationLoader}
                    disabled={specificationLoader}
                  >
                    Select
                  </Button>
                </div>
              </Card>
            </Modal>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={t('Product Name')}
              details={t('Enter your Product Name Here')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label="Production Name"
                variant="outline"
                name="productName"
                onChange={handleChange}
                value={input.productName}
              />
            </Card>
          </div>

          <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
            <Description
              title={t('Product Description')}
              details={t('Enter your Product Description Here')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />
            <Card className="w-full sm:w-8/12 md:w-2/3">
              <TextArea
                label="Production Description"
                name="productDescription"
                variant="outline"
                onChange={handleChange}
                value={input.productDescription}
              />
            </Card>
          </div>

          {/* Spacificattiioin */}
          {specificationDiv && (
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
              <Description
                title={t('Product Specification')}
                details={t('Enter your Product Spacification Here')}
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
              />
              <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="flex flex-wrap ">
                  {specificationData?.fields?.map((res: any, index: number) => (
                    <div className="w-2/4 p-2">
                      {res.type == 'Input Field' && (
                        <div className="flex w-full">
                          {res.is_required == 1 && (
                            <div className="text-red-500">*</div>
                          )}
                          <Input
                            label={res.name}
                            placeholder={res.place_holder}
                            name={res.name}
                            className="w-full"
                            onChange={(e) =>
                              handleChangeSpecification(e, index, res.name)
                            }
                          />
                        </div>
                      )}
                      {res.type == 'Dropdown' && (
                        <div className="w-full">
                          <div className="flex">
                            {res.is_required == 1 && (
                              <div className="text-red-500">*</div>
                            )}
                            <Label>{res.name}</Label>
                          </div>

                          <Select
                            getOptionLabel={(option: any) => option.names}
                            getOptionValue={(option: any) => option.value}
                            placeholder={res.place_holder}
                            className="w-full"
                            name={res.name}
                            onChange={(e) =>
                              handleChangeSpecification(e, index, res.name)
                            }
                            options={productCondition}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {specificationDiv && (
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
              <Description
                title={t('form:form-title-product-type')}
                details={t('form:form-description-product-type')}
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5"
              />

              <Card className="w-full sm:w-8/12 md:w-2/3">
                <div className="mb-5">
                  <Label>{t('form:form-title-product-type')}</Label>
                  <Select
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.value}
                    styles={selectStyles}
                    options={productType}
                    defaultValue={productType[0]}
                    onChange={onChangeProductType}
                  />
                </div>
              </Card>
            </div>
          )}
          {specificationDiv && (
            <>
              {ProductTypeDrop === ProductType.Simple && (
                <ProductSimpleForm
                  change={handleChange}
                  val={input}
                  initialValues={initialValues}
                />
              )}
            </>
          )}

          {specificationDiv && (
            <>
              {ProductTypeDrop === ProductType.Variable && (
                <ProductVariableForm
                  initialValues={initialValues}
                  newInput={newInput}
                  setNewInput={setNewInput}
                />
              )}
            </>
          )}

          {specificationDiv && (
            <ProductWholsale newInput={newInput} setNewInput={setNewInput} />
          )}

          {specificationDiv && (
            <>
              <div className="my-5 flex flex-wrap sm:my-8 border-t pt-8 border-dashed border-border-base">
                <Description
                  title={'Shipping'}
                  className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Input
                    label="Weight"
                    placeholder="Weight"
                    variant="outline"
                    className="mt-5"
                    name="shippingWeight"
                    value={input.shippingWeight}
                    onChange={handleChange}
                  />
                  <Label className="mt-5">Parcel Size</Label>
                  <div className="flex flex-wrap gap-2">
                    <Input
                      placeholder="W(Integer)"
                      variant="outline"
                      name="shippingWidth"
                      value={input.shippingWidth}
                      onChange={handleChange}
                    />

                    <Input
                      placeholder="L"
                      variant="outline"
                      name="shippingLength"
                      value={input.shippingLength}
                      onChange={handleChange}
                    />
                    <Input
                      placeholder="H(Integer)"
                      variant="outline"
                      name="shippingHeight"
                      value={input.shippingHeight}
                      onChange={handleChange}
                    />
                  </div>
                </Card>
              </div>
              <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                  title={'Others'}
                  className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                  <Label>{'Pre Order'}</Label>
                  <div className="flex">
                    <Radio
                      name=""
                      label={'No'}
                      id="No"
                      onChange={onChanegePreOrder}
                      value="no"
                      checked={preOrder === 'no'}
                      className="mb-2"
                    />
                    <Radio
                      className="pl-3"
                      name=""
                      id="Yes"
                      onChange={onChanegePreOrder}
                      value="yes"
                      checked={preOrder === 'yes'}
                      label={t('Yes')}
                    />
                  </div>
                  <div>
                    {preOrder === 'yes' ? (
                      <div className="text-slate-500">
                        I need
                        <input
                          className="ml-2 h-8 w-20 rounded border border-border-100 border-border-base  border-[#D4D8DD] pt-1 focus:border-accent"
                          type="number"
                          name="preOrder"
                          value={input.preOrder}
                          onChange={handleChange}
                        />
                        <span className="ml-1">
                          {' '}
                          business days to ship (between 7 to 30)
                        </span>
                      </div>
                    ) : (
                      <div className="text-slate-500">
                        I will ship out within 2 business days. (excluding
                        public holidays and courier service non-working days)
                      </div>
                    )}
                  </div>
                  {/* <ProductCondition /> */}
                  <div className="mt-5">
                    <Label>{'Condition'}</Label>
                    <Select
                      getOptionLabel={(option: any) => option.names}
                      getOptionValue={(option: any) => option.value}
                      options={productCondition}
                      onChange={onChangeCondition}
                    />
                  </div>
                  <Input
                    label={'Product SKU'}
                    variant="outline"
                    className="mt-5"
                    name="productSku"
                    value={input.productSku}
                    onChange={handleChange}
                  />
                </Card>
              </div>
              <div className="mb-4 text-end">
                {initialValues && (
                  <Button
                    variant="outline"
                    onClick={router.back}
                    className="me-4"
                    type="button"
                  >
                    {t('form:button-label-back')}
                  </Button>
                )}
                <Button loading={btnloading} disabled={btnloading}>
                  {initialValues
                    ? t('form:button-label-update-product')
                    : t('form:button-label-add-product')}
                </Button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </>
  );
}
