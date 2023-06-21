import Link from '@/components/ui/link';
import { getIcon } from '@/utils/get-icon';
import * as sidebarIcons from '@/components/icons/sidebar';
import { useUI } from '@/contexts/ui.context';
//import NavItemHeaders from './nav-item-header-new';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'next/router';
import { useRouter } from 'next/router';

const resolveLinkPath = (childTo: any, parentTo: any) =>
  `${parentTo}/${childTo}`;

const NavItemHeaders = (props:any) => {
  const router = useRouter();
  const { item } = props;
  const { label, icon, href, children } = item;
  const [expanded, setExpand] = useState(
    // window.location.pathname.includes(href)
  );

  const onExpandChange = (e: any) => {
    e.preventDefault();
    setExpand((expanded) => !expanded);
  };

  const newFunction = (aaa: any) => {
    router.push(aaa);
  };

  return (
    <div>
      <button
        onClick={onExpandChange}
        className="flex w-full items-center text-base text-body-dark text-start focus:text-accent"
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: icon,
          className: 'w-5 h-5 me-4',
        })}
        <span>{label}</span>

        {expanded && (
          <img
            style={{ position: 'absolute', width: 13, right: 20 }}
            src="/image/dropBottom.png"
          />
        )}
        {!expanded && (
          <img
            style={{ position: 'absolute', width: 15, right: 20 }}
            src="/image/dropRight.png"
          />
        )}
      </button>
      {expanded && (
        <div style={{ marginTop: 0, marginBottom: 0 }}>
          {children.map((item: any, index: any) => {
            const key = `${item.label}-${index}`;

            const { label, Icon, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemHeaders
                    item={{
                      ...item,
                      href: resolveLinkPath(item.href, props.item.href),
                    }}
                  />
                </div>
              );
            }

            return (
              <>
                <Link
                  key={key}
                  // onClick={() => newFunction(item.href)}
                  href={resolveLinkPath(item.href, props.item.href)}
                  // href={item.href}
                  className="flex w-full items-center pl-5 pt-5 text-base text-body-dark text-start focus:text-accent"
                >
                  {getIcon({
                    iconList: sidebarIcons,
                    iconName: item.icon,
                    className: 'w-5 h-5 me-4',
                  })}
                  <span style={{ marginTop: 0 }}>{item.label}</span>
                </Link>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default withRouter(NavItemHeaders);