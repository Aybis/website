'use client';

import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const Page: NextPage = () => {
  const [select, setselect] = useState('');

  const listProfession = [
    {
      id: 1,
      name: 'Frontend Developer',
      background: 'bg-red-500',
      link: '/frontend',
    },
    {
      id: 2,
      name: 'Mobile Developer',
      background: 'bg-blue-500',
      link: '/mobile',
    },
    {
      id: 3,
      name: 'Web3 Developer',
      background: 'bg-green-500',
      link: '/web3',
    },
    {
      id: 4,
      name: 'UI/UX Designer',
      background: 'bg-yellow-500',
      link: '/uiux',
    },
  ];

  const listMenu = [
    {
      id: 1,
      name: 'Home',
      link: '/',
    },
    {
      id: 2,
      name: 'About',
      link: '/about',
    },
    {
      id: 3,
      name: 'Experience',
      link: '/contact',
    },
    {
      id: 4,
      name: 'Education',
      link: '/education',
    },
  ];

  const list = [
    'Frontend Developer',
    'Mobile Developer',
    'Web3 Developer',
    'UI/UX Designer',
    'React JS Developer',
    'React Native Developer',
    'Web Developer',
    'Frontend Developer',
    'Mobile Developer',
    'Web3 Developer',
    'UI/UX Designer',
  ];

  return (
    <div className="relative w-full max-h-full bg-[#f8f8f8] ">
      {/* Header */}
      {/* when scroll down, the header will be sticky and background color is black */}
      <header className="sticky top-0 inset-x-0 p-4 bg-white/10 backdrop-blur-sm z-10">
        <div className="relative mx-auto 2xl:container overflow-auto p-4 flex justify-between items-center">
          <p>AMA</p>
        </div>
      </header>

      {/* Navigation Link */}
      <aside className="fixed bottom-12 bg-zinc-300 shadow-lg shadow-zinc-200 translate-x-[50%] right-[50%] transform z-50 p-2 rounded-xl">
        <div className="relative items-center flex gap-5">
          {/* Menu Highlight */}
          <div className="relative p-3 text-zinc-200 rounded-md bg-[#222222] flex items-center gap-2">
            <span className="text-sm font-medium tracking-wide leading-relaxed ">
              Portfolio
            </span>
            <span>
              <Bars3BottomLeftIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Menu Profile */}
          <ul className="relative lg:flex gap-2 hidden">
            {listMenu.map((item) => (
              <li
                key={item.id}
                className="relative px-2 py-1.5 hover:bg-zinc-200 rounded-md text-zinc-800 font-light leading-relaxed transition-all duration-300">
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <div className="relative mx-auto 2xl:container overflow-auto p-4 mt-4  bg-[#f8f8f8]">
        {/* section header */}
        <section className="relative">
          <div className="relative">
            <Image
              src={'/assets/images/name.svg'}
              alt="Picture of the author"
              width={2560}
              height={2000}
              priority
            />
          </div>

          <div className="relative mt-12">
            {/* Root */}
            <div className="relative flex h-12 bg-red-200 w-full m-auto overflow-hidden z-10">
              {/* Container */}
              <div className="absolute h-full w-full flex justify-start items-center top-0 left-0 whitespace-nowrap">
                {/* Empty */}
                <div className="animate-infinite transition-all duration-300">
                  <div className="m-0 flex overflow-hidden text-4xl text-zinc-800 gap-8">
                    {list.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* animate text from left to right */}
          <div className="relative hidden flex-wrap w-full bg-[#f8f8f8] mt-32 rounded-lg">
            {
              // eslint-disable-next-line react/no-array-index-key
              listProfession.map((item) => (
                <Link
                  href={'#'}
                  key={item.id}
                  onMouseEnter={() => setselect(item.name)}
                  onMouseLeave={() => setselect('')}
                  className={[
                    'relative lg:p-12 flex-auto transition-all duration-700 delay-100 ease-in-out h-[50vh] first:rounded-l-lg last:rounded-r-lg overflow-hidden',
                    select === item.name
                      ? 'w-9/12 lg:w-1/2'
                      : 'lg:w-1/6 w-1/12',
                    item.background,
                  ].join(' ')}>
                  <div
                    className={[
                      'absolute top-0 translate-y-0 transform leading-relaxed font-medium tracking-widest text-lg transition-all duration-500 delay-100 break-words bg-orange-500 text-white text-clip overflow-hidden w-fit',
                      // select === item.name ? 'rotate-0 w-full' : 'w-full',
                    ].join(' ')}>
                    <p>{item.name}</p>
                  </div>
                </Link>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
