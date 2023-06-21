import Input from '@/components/ui/input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import Title from '@/components/ui/title';
import Checkbox from '@/components/ui/checkbox/checkbox';
import SelectInput from '@/components/ui/select-input';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useTranslation } from 'next-i18next';
import { useAttributesQuery } from '@/data/attributes';
import FileInput from '../common/FileInputVariation';
import ValidationError from '@/components/ui/form-validation-error';
import { getCartesianProduct, filterAttributes } from './form-utils';
import { useRouter } from 'next/router';
import { Config } from '@/config';
import { FiUploadCloud } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
type IProps = {
  initialValues?: Product | null;
  newInput: any;
  setNewInput: any;
  // shopId: string | undefined;
};

export default function ProductWholsale({
  initialValues,
  newInput,
  setNewInput,
}: IProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  // const { attributes, loading } = useAttributesQuery({
  //   shop_id: initialValues ? initialValues.shop_id : shopId,
  //   language: locale,
  // });
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: 'variations',
  });
  const variations = watch('variations');
  const cartesianProduct = getCartesianProduct(getValues('variations'));
  const [imageloading, setImageLoading] = useState<any>(false);
  const [imageFile, setImageFile] = useState<any>([]);

  const [inputs, setInputs] = useState([
    {
      variationName: '',
      value: [
        {
          value: '',
          price: '',
          stock: '',
          sku: '',
          image: '',
        },
      ],
    },
  ]);

  const [secondVariationValues, setSecondvariationvalues] = useState([]);

  const [tableInputs, setTableInputs] = useState<any>({
    price: '',
    stock: '',
    sku: '',
  });
  const handleVariantChange = (
    variationIndex: number,
    event: { target: { value: string } }
  ) => {
    const value = event.target.value;
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs]; // create a copy of the state array
      const updatedVariation = {
        ...updatedInputs[variationIndex],
        variationName: value,
      }; // create a copy of the variation object with updated variationName property
      updatedInputs[variationIndex] = updatedVariation; // update the variation object at the specified index with the updated variation object
      return updatedInputs; // return the updated state array
    });
  };
  const handleInputChange = (
    variationIndex: number,
    inputIndex: number,
    event: { target: { value: any } }
  ) => {
    let inputValue = event.target.value;
    if (variationIndex == 1) {
      setInputs((inputs) => {
        const newInputs: any = [...inputs];
        const variation: any = [...newInputs[variationIndex].value];
        variation[inputIndex].value = event.target.value;
        // variation[inputIndex].secondValue = [];
        // variation[inputIndex].secondValue.push(inputValue);

        // if it's the last input of the current variation, create a new input
        if (inputIndex === variation.length - 1) {
          variation.push({
            value: '',
            price: '',
            stock: '',
            sku: '',
          });
        }
        newInputs[variationIndex].value = variation;
        // newInputs[variationIndex-1].value.map((res:any)=>{
        //   return res.secondValue.push(event.target.value)
        // })
        let tempArray: any = [];
        newInputs[1].value.map((row: any) => {
          tempArray.push(row.value);
        });
        setSecondvariationvalues(tempArray);
        return newInputs;
      });
    } else {
      setInputs((inputs) => {
        const newInputs = [...inputs];
        const variation = [...newInputs[variationIndex].value];
        variation[inputIndex].value = event.target.value;

        // if it's the last input of the current variation, create a new input
        if (inputIndex === variation.length - 1) {
          variation.push({
            value: '',
            price: '',
            stock: '',
            sku: '',
            image: '',
          });
        }

        newInputs[variationIndex].value = variation;
        return newInputs;
      });
    }
  };

  // const handleAddVariation = () => {
  //   setInputs((inputs) => [
  //     ...inputs,
  //     {
  //       variationName: '',
  //       value: [{ value: '', price: '', stock: '', sku: '' }],
  //     },
  //   ]);
  // };

  const handleAddVariation = () => {
    setInputs((inputs) => {
      if (inputs.length < 2) {
        return [
          ...inputs,
          {
            variationName: '',
            value: [{ value: '', price: '', stock: '', sku: '', image: '' }],
          },
        ];
      }
      return inputs;
    });
  };

  const onHandleChange = (name: any, e: any) => {
    if (name == 'forPrice') {
      setTableInputs({
        ...tableInputs,
        price: e.target.value,
      });
    }
    if (name == 'forStock') {
      setTableInputs({
        ...tableInputs,
        stock: e.target.value,
      });
    }
    if (name == 'forSku') {
      setTableInputs({
        ...tableInputs,
        sku: e.target.value,
      });
    }
  };

  const handleDelete = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    setSecondvariationvalues([]);
  };

  const OnApplyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setInputs((inputs) => {
      return inputs.map((variation) => {
        return {
          ...variation,
          value: variation.value.map((input) => {
            return {
              ...input,
              price: tableInputs.price,
              stock: tableInputs.stock,
              sku: tableInputs.sku,
            };
          }),
        };
      });
    });
  };

  const onClickBtn = () => {
    const newVariationOne: any = [];
    const newVariationTwo: any = [];

    inputs.forEach((e: any, index: number) => {
      e.value.forEach((a: any) => {
        const newObj = {
          title: e.variationName,
          variactionName: a.value,
          price: a.price,
          stock: a.stock,
          sku: a.sku,
          image: a.image,
        };

        if (index === 0) {
          a.value && newVariationOne.push(newObj);
        } else if (index === 1) {
          a.value && newVariationTwo.push(newObj);
        }
      });
    });

    setNewInput({
      variationOne: newVariationOne,
      variationTwo: newVariationTwo,
    });
  };

  const onChangeVariationList = (
    e: any,
    variationIndex: number,
    inputIndex: number
  ) => {
    const updatedInputs = [...inputs]; // Create a copy of the inputs array
    // Update the price, stock, and SKU values
    if (e.target.name == 'price') {
      updatedInputs[variationIndex].value[inputIndex].price = e.target.value;
    } else if (e.target.name == 'stock') {
      updatedInputs[variationIndex].value[inputIndex].stock = e.target.value;
    } else if (e.target.name == 'sku') {
      updatedInputs[variationIndex].value[inputIndex].sku = e.target.value;
    }
    setInputs(updatedInputs); // Set the updated array as the new state
  };

  useEffect(() => {
    onClickBtn();
  }, [inputs]);

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={t('Wholesale')}
        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
      />
      <Card className="w-full p-0 sm:w-8/12 md:w-2/3 md:p-0">
        <div className="mb-5 md:mb-8">
          <div className="border-b border-dashed border-border-200 p-5 last:border-0 md:p-8">
            <div className="flex">
              <div className="bg-gray-100 w-1/4 border  p-4 flex flex-col justify-center items-center">
                No.
              </div>
              <div className="bg-gray-100 w-5/12 border  p-4 flex flex-col justify-center items-center">
                Miin Quantity
              </div>
              <div className="bg-gray-100 w-5/12 border  p-4 flex flex-col justify-center items-center">
                Miax Quantity
              </div>
            </div>
            {inputs.map((variation, variationIndex) => (
              <div className="flex">
                <div className="border w-1/4  p-4 flex flex-col justify-center items-center">
                  <span className="text-center align-middle">
                    Price Tier{variationIndex + 1}
                  </span>
                </div>

                <div className="border w-5/12 p-4">
                  <Input name="" />
                </div>
                <div className="border w-5/12 p-4">
                  <Input name="" />
                </div>
              </div>
              // <div className="grid grid-cols-fit gap-5">
              //   sd
              //   {/* <div className="">
              //       <Label>Variations {variationIndex + 1}</Label>
              //       <Input
              //         name=""
              //         className="pt-1"
              //         key={variationIndex}
              //         value={variation.variationName}
              //         onChange={(event: any) =>
              //           handleVariantChange(variationIndex, event)
              //         }
              //       />
              //     </div>
              //     <div className="">
              //       <div className="flex justify-between">
              //         <Label>Options</Label>
              //         <div
              //           onClick={() => handleDelete(variationIndex)}
              //           className="cursor-pointer"
              //         >
              //           <AiOutlineDelete />
              //         </div>
              //       </div>
              //       {variation.value.map((input, inputIndex) => (
              //         <Input
              //           name=""
              //           key={inputIndex}
              //           value={input.value}
              //           onChange={(event: any) =>
              //             handleInputChange(variationIndex, inputIndex, event)
              //           }
              //         />
              //       ))}
              //     </div> */}
              // </div>
            ))}
          </div>

          <div className="px-5 md:px-8">
            <Button
              disabled={inputs.length > 1}
              onClick={handleAddVariation}
              type="button"
            >
              {t('form:button-label-add-option')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export const TitleAndOptionsInput = ({
  fieldAttributeValue,
  index,
  setValue,
  register,
}: any) => {
  const title = Array.isArray(fieldAttributeValue)
    ? fieldAttributeValue.map((a) => a.value).join('/')
    : fieldAttributeValue.value;
  const options = Array.isArray(fieldAttributeValue)
    ? JSON.stringify(fieldAttributeValue)
    : JSON.stringify([fieldAttributeValue]);
  useEffect(() => {
    setValue(`variation_options.${index}.title`, title);
    setValue(`variation_options.${index}.options`, options);
  }, [fieldAttributeValue]);
  return (
    <>
      <input {...register(`variation_options.${index}.title`)} type="hidden" />
      <input
        {...register(`variation_options.${index}.options`)}
        type="hidden"
      />
    </>
  );
};
