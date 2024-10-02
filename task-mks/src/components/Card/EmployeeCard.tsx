import React from 'react'
import { IoIosPerson } from "react-icons/io";
interface EmployeeCardInterface {
    dataList: any
}

const EmployeeCard = ({dataList}: EmployeeCardInterface) => {
  return (
    <div
    className='w-[200px] h-[250px] bg-slate-100 rounded-3xl flex  flex-col justify-center items-center relative'
    >
        <div className='w-[70px] h-[70px] overflow-hidden flex justify-center mb-4 items-center bg-slate-200 rounded-full'>
            <IoIosPerson size={50}/>

        </div>
        <div className='flex flex-col '>
            <p className='text-[14px] font-semibold'>{dataList?.detail?.fullname}</p>
            <p className='text-[12px] text-gray-400 capitalize'>{dataList?.username}</p>
            

            <div className='flex flex-col justify-start items-start sticky bottom-5 left-2  '>
            <p className='text-[14px] '>{dataList?.detail?.address ?? null}</p>
            <p className='text-[14px] '>{dataList?.detail?.registration_number ?? null}</p>
            <p className='text-[14px] '>{dataList?.detail?.phone_number ?? null}</p>
            <p className='text-[14px] '>{dataList?.detail?.registration_date ?? null}</p>

            </div>
           
        </div>

    </div>
  )
}

export default EmployeeCard