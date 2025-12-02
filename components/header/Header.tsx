import { FC } from 'react';
import { MobileMenu } from './MobileMenu';

export const Header: FC = () => (
  <header className="flex justify-between items-center p-4 shadow-md">
    <MobileMenu />
  </header>
);
