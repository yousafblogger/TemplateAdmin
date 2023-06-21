import Link from '@/components/ui/link';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
import NavItemHeaders from './nav-item-header-new';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
const SidebarItem = (props: any) => {
  const { t } = useTranslation("common");
  const { href, label, icon, children } = props.item;
  const { closeSidebar } = useUI();
// console.log('>>>>>>>>>>>test', children)



  if (children) {
    return <NavItemHeaders child={props.item.children} item={props.item} />;
  }


  return (
    <>
      <Link
        href={href}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: icon,
          className: 'w-5 h-5 me-4',
        })}
        <span onClick={() => closeSidebar()}>{t(`common:${label}`)}</span>
      </Link>
    </>
  );
};

export default SidebarItem;