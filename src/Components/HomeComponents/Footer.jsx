import React from 'react'
import img1 from '../../Images/logo_try.jpg'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
function Footer() {
    const navigate = useNavigate()

    return (
        <div className="flex w-full  max-md:justify-center max-md:items-center  md:flex-row flex-col h-max md:px-[2%] text-slate-600 bg-gray-100 py-5 px-10  mt-5 "  >
            <div className=" w-[100%] flex flex-col  gap-2 text-[18px] text-[#646464] md:ml-0  md:items-start md:justify-start items-center justify-center ">
                <h4 className='  text-center text-gray-500  mt-5'>Follows Us On.</h4>
                <div className='flex flex-row gap-4 '>
                    <div className="flex text-2xl bg-[#efefef] p-2 rounded-full hover:bg-blue-500 hover:text-white" style={{ transition: "all 0.3s" }}>
                        <FaFacebookF />
                    </div>
                    <div className="flex text-2xl bg-[#efefef] p-2 rounded-full hover:bg-red-500 hover:text-white" style={{ transition: "all 0.3s" }}>
                        <AiFillYoutube />
                    </div>
                    <div className="flex text-2xl bg-[#efefef] p-2 rounded-full hover:bg-blue-500 hover:text-white" style={{ transition: "all 0.3s" }}>
                        <AiOutlineTwitter />
                    </div>
                    <div className="flex text-2xl bg-[#efefef] p-2 rounded-full hover:bg-gradient-to-r from-yellow-400 via-orange-400 via-pink-500 via-purple-600 to-blue-500  hover:text-white" style={{ transition: "all 0.3s" }}>
                        <FaInstagram />
                    </div>
                </div>
            </div>
            <div className=' w-[100%] flex flex-col justify-center items-center'>
                <div className="flex items-center gap-2 mt-2">
                    <img src={img1} onClick={() => navigate('/')} className='h-[40px] md:h-[30px]  md:w-[30px] rounded-[50%] cursor-pointer ' />
                    <h1 className='text-xl font-mono text-blue-700'>IT-DEPT</h1>
                </div>
                <h4 className='text-center text-gray-500'>Copyright. All rights reserved.</h4>
            </div>

            <div className='  flex flex-col w-[100%] gap-2  md:items-end md:justify-end items-center justify-center '>
                <div className="flex  flex-row items-center justify-center md:mt-0 mt-3 md:mr-12 ml-0">
                    <FiPhoneCall className="  ml-0 md-ml-auto text-4xl  bg-[#efefef] p-1 rounded-full hover:bg-green-500 hover:text-white" style={{ transition: "all 0.3s" }} />
                    <h4 className='text-center text-gray-5cd00 ml-2'>784512654</h4>
                </div>
                <div className="flex  flex-row items-end justify-end ">
                    <FaLocationDot className=" text-4xl md:flex bg-[#efefef] p-1 mb-10 rounded-full hover:bg-blue-800 hover:text-white" style={{ transition: "all 0.3s" }} />
                    <div className=' ml-2 md:w-[40%]'>
                        <p className='text-sm  md:text-sm text-gray-500'>Main Building,3 Floor,Infront of ENTC Dept,
                            Gpmumbai, Bandra East, Mumbai, Maharashtra 400051.</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Footer