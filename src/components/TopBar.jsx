import React from 'react';
import CitySearch from './CitySearch';
import { MdSettingsSuggest } from "react-icons/md";
import { IoNotificationsOutline, IoPersonCircleOutline } from "react-icons/io5";

function Topbar({ setCity }) {
  return (
    <div className='bg-white h-[10vh] w-full flex items-center justify-between pl-8 pr-8'>
      <CitySearch setCity={setCity} className="z-10" />
      <div className='flex items-center gap-8'>
        <MdSettingsSuggest className='text-slate-700 text-3xl' />
        <IoNotificationsOutline className='text-slate-700 text-2xl' />
        <IoPersonCircleOutline className='text-slate-700 text-3xl' />
      </div>
    </div>
  );
}

export default Topbar;