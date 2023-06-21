import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
import ValidationError from '@/components/ui/form-validation-error';
import { ProCondition } from '@/types';
import { useTranslation } from 'next-i18next';

const productCondition = [
  { name: 'Used', value: ProCondition.Used },
  { name: 'New', value: ProCondition.New},
];

const ProductCondition = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  return (
      <div className="mt-5">
        <Label>{"Condition"}</Label>
        <SelectInput
          name="product_condtion"
          control={control}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          options={productCondition}
        />
        <ValidationError message={t(errors.product_condition?.message)} />
      </div>
   
  );
};

export default ProductCondition;
