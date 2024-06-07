'use client';
import { useEffect, useMemo, useState } from 'react';
import { navHeader } from '@/utils/constants';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/ContextProvider';
const Header = () => {
  const [isShowNavBar, setIsShowNavBav] = useState<boolean>(false);
  const [openMenuCategory, setOpenMenuCategory] = useState<string>('');
  const [checkClearCategory, setCheckClearCategory] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const {
    user,
    isAuthenticated,
    headerData: { category, regions, typeMovie },
  }: any = useApp();
  const pathName = usePathname();
  const convertHeader = useMemo(() => {
    return navHeader.map((item) => {
      return item.path === '/the-loai'
        ? { ...item, category: category }
        : item.path === '/quoc-gia'
        ? { ...item, category: regions }
        : item.path === '/loai-phim'
        ? { ...item, category: typeMovie }
        : item;
    });
  }, [category, regions, typeMovie]);
  const handleToggleNavbar = () => setIsShowNavBav(!isShowNavBar);
  const handleToggleMenuCategory = (path: string) => {
    if (path === checkClearCategory) {
      setOpenMenuCategory('');
      setCheckClearCategory('');
      return;
    }
    setOpenMenuCategory(path);
    setCheckClearCategory(path);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isShowNavBar) {
        document.body.classList.add('no-scroll');
      } else {
        if (document.body.classList.contains('no-scroll')) document.body.classList.remove('no-scroll');
      }
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isShowNavBar]);

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      const isLargeScreen = window.innerWidth > 984;
      if (isLargeScreen) {
        if (isShowNavBar) handleToggleNavbar();
        if (!isMobile) setIsMobile(true);
      } else {
        if (isMobile) setIsMobile(false);
      }
    }
  };

  return (
    <header className='container '>
      <div className='relative '>
        <div
          tabIndex={-1}
          className={`flex justify-between items-center relative ${pathName === '/' ? 'lg:absolute' : ''}  gap-x-2 py-3 z-50 w-full`}>
          <Link href='/' className='flex items-center gap-x-[10px] flex-basis '>
            <Image src='/images/logo.jpg' className='w-40  md:w-52 h-full object-contain aspect-[208/41]' height={1000} width={1000} alt='logo' />
          </Link>
          <Nav
            onToggleNavbar={handleToggleNavbar}
            onToggleOpenMenuCategory={handleToggleMenuCategory}
            isShowNavBar={isShowNavBar}
            openMenuCategory={openMenuCategory}
            user={user}
            isAuthenticated={isAuthenticated}
            convertHeader={convertHeader}
            isMobile={isMobile}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
