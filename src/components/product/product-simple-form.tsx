import Input from '@/components/ui/input';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Label from '@/components/ui/label';
import FileInput from '@/components/ui/file-input';
import Checkbox from '@/components/ui/checkbox/checkbox';
import { Config } from '@/config';
import { useRouter } from 'next/router';

type IProps = {
  initialValues: any;
  change: any;
  val: any;
};

export default function ProductSimpleForm({
  initialValues,
  change,
  val,
}: IProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isTranslateProduct = locale !== Config.defaultLanguage;

  const is_digital = watch('is_digital');
  const is_external = watch('is_external');

  return (
    <div className="my-5 flex flex-wrap sm:my-8">
      <Description
        title={t('form:form-title-simple-product-info')}
        details={`${
          initialValues
            ? t('form:item-description-edit')
            : t('form:item-description-add')
        } ${t('form:form-description-simple-product-info')}`}
        className="sm:pe-4 md:pe-5 w-full px-0 pb-5 sm:w-4/12 sm:py-8 md:w-1/3"
      />

      <Card className="w-full sm:w-8/12 md:w-2/3">
        <Input
          label={`${t('form:input-label-price')}*`}
          type="number"
          variant="outline"
          className="mb-5"
          name="simpleProductPrice"
          value={val.simpleProductPrice}
          onChange={change}
        />
        <Input
          label={`${t('form:input-label-quantity')}*`}
          type="number"
          variant="outline"
          className="mb-5"
          name="simpleProductQuantity"
          value={val.simpleProductQuantity}
          onChange={change}
        />
        <Input
          label={`${t('Stock')}*`}
          type="number"
          variant="outline"
          className="mb-5"
          name="simpleProductStock"
          value={val.simpleProductStock}
          onChange={change}
        />

        <Input
          label={`${t('form:input-label-sku')}*`}
          variant="outline"
          className="mb-5"
          name="simpleProductSku"
          value={val.simpleProductSku}
          onChange={change}
        />
      </Card>
    </div>
  );
}
