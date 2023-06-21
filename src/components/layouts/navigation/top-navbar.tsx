import Logo from '@/components/ui/logo';
import { useUI } from '@/contexts/ui.context';
import AuthorizedMenu from './authorized-menu';
import LinkButton from '@/components/ui/link-button';
import { NavbarIcon } from '@/components/icons/navbar-icon';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { adminAndOwnerOnly, getAuthCredentials } from '@/utils/auth-utils';
import LanguageSwitcher from './language-switer';
import { Config } from '@/config';
import { useEffect, useState } from 'react';
// import newLogo from '../../../../public/image/SuuqueeLogo.png';
import Image from 'next/image';

const Navbar = () => {
  const { t } = useTranslation();
  const { toggleSidebar } = useUI();
  const [businessName, setBusinessName] = useState('');

  return (
    <header className="fixed z-40 w-full bg-white shadow">
      <nav className="flex items-center justify-between px-5 py-4 md:px-8">
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className="flex h-full items-center justify-center p-2 focus:text-accent focus:outline-none lg:hidden"
        >
          <NavbarIcon />
        </motion.button>

        <div className="ms-5 me-auto hidden md:flex">
          {/* <Logo /> */}
          {/* <img src={newLogo} /> */}
          {/* <Image height={50} width={100} src={newLogo} className="" /> */}
        </div>

        <div className="flex items-center space-s-8">
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
