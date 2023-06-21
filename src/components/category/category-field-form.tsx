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
import FileInput from '@/components/ui/file-input';
import ValidationError from '@/components/ui/form-validation-error';
import { useRouter } from 'next/router';
import { Config } from '@/config';
import { FiUploadCloud } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { Switch } from '@headlessui/react';
import Select from '../ui/select/select';
import { PostFunction } from '@/services/service';
import { toast } from 'react-toastify';
type IProps = {
  initialValues?: any;
};

export default function CategoryFieldForm(categoryId: any) {
  const { t } = useTranslation();
  const [creatingLoading, setCreatingLoading] = useState(false);
  const router = useRouter();

  const [inputs, setInputs] = useState([
    {
      name: '',
      place_holder: '',
      type: '',
      is_required: 0,
      category_id: categoryId.categoryId,
    },
  ]);

  const handleVariantChange = (
    variationIndex: number,
    event: { target: { value: string } }
  ) => {
    const value = event.target.value;
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs]; // create a copy of the state array
      const updatedVariation = {
        ...updatedInputs[variationIndex],
        name: value,
      }; // create a copy of the variation object with updated name property
      updatedInputs[variationIndex] = updatedVariation; // update the variation object at the specified index with the updated variation object
      return updatedInputs; // return the updated state array
    });
  };

  const handleInputChange = (
    variationIndex: number,
    event: { target: { value: string } }
  ) => {
    const value = event.target.value;
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs]; // create a copy of the state array
      const updatedVariation = {
        ...updatedInputs[variationIndex],
        place_holder: value,
      }; // create a copy of the variation object with updated name property
      updatedInputs[variationIndex] = updatedVariation; // update the variation object at the specified index with the updated variation object
      return updatedInputs; // return the updated state array
    });
  };

  const handleTypeChange = (variationIndex: number, event: any) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs]; // create a copy of the state array
      const updatedVariation = {
        ...updatedInputs[variationIndex],
        type: event.label,
      }; // create a copy of the variation object with updated name property
      updatedInputs[variationIndex] = updatedVariation; // update the variation object at the specified index with the updated variation object
      return updatedInputs; // return the updated state array
    });
  };

  const handleAddVariation = () => {
    setInputs((inputs) => [
      ...inputs,
      {
        name: '',
        place_holder: '',
        type: '',
        is_required: 0,
        category_id: categoryId.categoryId,
      },
    ]);
  };

  const handleDelete = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const onChangeRequired = (variationIndex: number, event: any) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs]; // create a copy of the state array
      const updatedVariation = {
        ...updatedInputs[variationIndex],
        is_required: event == true ? 1 : 0,
      }; // create a copy of the variation object with updated name property
      updatedInputs[variationIndex] = updatedVariation; // update the variation object at the specified index with the updated variation object
      return updatedInputs; // return the updated state array
    });
  };

  const onAddButton = () => {
    setCreatingLoading(true);
    let form = {
      fields: inputs,
    };

    PostFunction('/categoriesFields', form).then((result) => {
      if (result.statusCode == 200) {
        setCreatingLoading(false);
        toast.success(result.message);
        router.back();
      } else {
        setCreatingLoading(false);
        toast.error(result.message);
      }
    });
  };

  const typeOption = [{ label: 'Input Field' }, { label: 'Dropdown' }];

  return (
    <div className="flex flex-wrap">
      <div className="w-full p-0  md:p-0">
        <div className="mb-5 md:mb-8">
          <Title className="mb-0 px-5 text-center text-lg uppercase md:px-8">
            Fields
          </Title>
          <div>
            {inputs.map((variation, variationIndex) => (
              <div
                key={variationIndex}
                className="border-b border-dashed border-border-200 p-5 last:border-0 md:p-8"
              >
                <div className=" grid-cols-fit gap-5">
                  <Label>Field {variationIndex + 1}</Label>

                  <div className="flex justify-between">
                    <div className="w-full">
                      <Input
                        label="Name"
                        name=""
                        className="pt-1 pr-2"
                        key={variationIndex}
                        value={variation.name}
                        onChange={(event: any) =>
                          handleVariantChange(variationIndex, event)
                        }
                      />
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between">
                        <Label>Type</Label>
                        <div
                          onClick={() => handleDelete(variationIndex)}
                          className="cursor-pointer"
                        >
                          <AiOutlineDelete />
                        </div>
                      </div>
                      <Select
                        name=""
                        options={typeOption}
                        onChange={(event: any) =>
                          handleTypeChange(variationIndex, event)
                        }
                        className="pt-1"
                      />
                      {/* {variation.value.map((input, inputIndex) => (
                      ))} */}
                    </div>
                  </div>
                  <div className="flex justify-between mt-5">
                    <div className="w-full">
                      <Input
                        label="Place Holder"
                        name=""
                        className=" pr-2"
                        key={variationIndex}
                        value={variation.place_holder}
                        onChange={(event: any) =>
                          handleInputChange(variationIndex, event)
                        }
                      />
                    </div>
                    <div className="w-full justify-between flex">
                      <Label>Required</Label>
                      <Switch
                        checked={variation.is_required == 0 ? false : true}
                        onChange={(event: any) =>
                          onChangeRequired(variationIndex, event)
                        }
                        className={`${
                          variation.is_required ? 'bg-accent' : 'bg-gray-300'
                        } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ml-5`}
                        dir="ltr"
                      >
                        <span className="sr-only">Enable </span>
                        <span
                          className={`${
                            variation.is_required
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 md:px-8">
            <Button onClick={handleAddVariation} type="button">
              Add other Field
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            loading={creatingLoading}
            disabled={creatingLoading}
            onClick={onAddButton}
          >
            Add
          </Button>
        </div>
      </div>
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
