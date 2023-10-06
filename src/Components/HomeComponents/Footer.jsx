import React from 'react'
import img1 from '../../Images/logo_try.jpg'
import { useNavigate } from 'react-router-dom'
function Footer() {
    const navigate = useNavigate()
    return (
        <div className="w-[100%] pt-7  h-max md:px-[5%] mr-0 text-slate-600 bg-sky-50  p-5" >
            <div className='flex flex-col justify-center items-center'>
                <h4 className='text-center text-slate-500'>Copyright. All rights reserved.</h4>
                <div className="flex items-center gap-2 mt-2">
                    <img src={img1} onClick={() => navigate('/')} className='h-[40px] md:h-[30px]  md:w-[30px] rounded-[50%] cursor-pointer ' />
                    <h1 className='text-xl font-mono'>IT-DEPT</h1>
                </div>
            </div>
        </div>
    )
}

export default Footer