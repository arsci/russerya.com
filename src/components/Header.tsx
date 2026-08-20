'use client'
import Link from 'next/link'
import Image from 'next/image'
import * as Nav from './Navigation'
import { DarkModeSwitcher } from './DarkMode'
import { Disclosure } from '@headlessui/react'
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

export default function Header() {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-700">
     {({ open }) => (
       <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
                <div className="flex shrink-0 items-center">
                  <Link href="/">
                    <Image 
                      src="/images/profile.jpg"
                      width={80}
                      height={80}
                      alt="Ryan Russell"
                      className="inline-block h-10 w-10 rounded-full"
                    />
                  </Link>
                  <nav className="flex -mb-6 sm:ml-6 columns-2 sm:flex sm:justify-center sm:space-x-8 px-2" aria-label="Header">
                    <div className="hidden sm:flex ">
                      {Nav.navigation.map((item) => (
                        <div key={item.name} className="pb-6">
                          <a href={item.href} className="inline-flex items-center border-b-2 border-transparent pt-1 text-sm font-medium px-4 text-gray-500 hover:border-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </div>
                    <div onClick={handleNav} className='flex -mt-6 sm:hidden'>
                      {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
                    </div>
                    <div 
                      className={
                        nav
                          ? 'absolute sm:hidden pt-6 left-0 top-16 w-[60%] h-full bg-white dark:bg-gray-700 ease-in-out duration-100 z-50'
                          : 'ease-in-out w-[60%] duration-100 absolute top-0 bottom-0 -left-full z-50'
                      }>
                        {Nav.navigation.map((item) => (
                        <div key={item.name} className="pb-6 ml-6">
                          <a href={item.href} className="inline-flex items-center border-b-2 border-transparent pt-1 text-sm font-medium px-2 text-gray-500 hover:border-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </nav>
              </div>
              <div className="flex justify-end md:flex-1 pt-3">
                <div className="pointer-events-auto">
                  <DarkModeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}