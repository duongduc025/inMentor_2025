'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Menu, X, LogOut, User } from 'lucide-react';
import ThemeModeToggle from './ThemeModeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo  from '@/assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const randomAvatarNumber = user?.email ? user.email.substring(0, 2) : Math.floor(Math.random() * 100);

  const navLinks = [
    { path: '/', display: 'Home' },
    { path: '/job', display: 'Danh sách việc làm' },
    { path: '/virtualroom', display: 'Phòng phỏng vấn ảo' },
    { path: '/contact', display: 'Liên hệ chúng tôi' },
  ];

  return (
    <div className="bg-white relative">
      {/* Desktop and Mobile Header */}
      <div className="flex items-center justify-between mx-auto max-w-[95rem] h-20 px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image 
            src={Logo}
            alt="inMentor Logo" 
            width={80} 
            height={80} 
            className="rounded-full"
          />
          <h1 className="ml-2 text-3xl font-bold">
            <span className="text-[#007BFF]">inMentor</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {navLinks.map((link, index) => (
              <React.Fragment key={index}>
                <li>
                  <Link
                    href={link.path}
                    className="text-gray-700 text-[18px] leading-8 font-[500] hover:text-[#DAA520]"
                  >
                    {link.display}
                  </Link>
                </li>
                {index < navLinks.length - 1 && (
                  <div className="h-6 border-l border-gray-300 mx-2" />
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* User Section */}
          <div className="flex items-center gap-4"> 
            {user ? (
              <>
                {/* User Avatar with Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer overflow-hidden">
                      <img
                        src={`https://robohash.org/${randomAvatarNumber}`}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-4">
                    <DropdownMenuLabel>{`Welcome, ${user.email}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/signup">
                  <Button variant="outline" className="ml-4">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="default" className="ml-2">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden flex items-center gap-4">
          <ThemeModeToggle />
          <button
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 xl:hidden">
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="container mx-auto px-4 pt-16">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li key={index} className="border-b pb-2">
                  <Link
                    href={link.path}
                    className="text-gray-700 text-[16px] leading-7 font-[500] hover:text-[#DAA520] block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.display}
                  </Link>
                </li>
              ))}
              {!user ? (
                <>
                  <li className="border-b pb-2">
                    <Link
                      href="/login"
                      className="text-gray-700 text-[16px] leading-7 font-[500] hover:text-[#DAA520] block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li className="border-b pb-2">
                    <Link
                      href="/signup"
                      className="text-gray-700 text-[16px] leading-7 font-[500] hover:text-[#DAA520] block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-b pb-2">
                    <Link
                      href="/profile"
                      className="text-gray-700 text-[16px] leading-7 font-[500] hover:text-[#DAA520] flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Hồ sơ</span>
                    </Link>
                  </li>
                  <li className="border-b pb-2">
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-gray-700 text-[16px] leading-7 font-[500] hover:text-[#DAA520] flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
