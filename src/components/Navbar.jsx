import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-indigo-800">
      <div className="container lg:w-1/3 md:w-1/2 mx-auto xl:w-1/4 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to={`/`}
                className="font-bold text-lg text-white"
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                Undi Cepat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
