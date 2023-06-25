import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <div className="text-center italic">CapCut Templtes</div>
    </>
  );
}
