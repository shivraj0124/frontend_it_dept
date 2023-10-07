import React from 'react'
import { FaUserGraduate, FaUserTie } from 'react-icons/fa'
// import { GrNotes } from 'react-icons/gr'
import { GiNotebook } from 'react-icons/gi'
import { PiNotePencil } from 'react-icons/pi'
import { BsTable } from 'react-icons/bs'
import { FcQuestions } from 'react-icons/fc'
import CountUp from 'react-countup'
function Dashboard() {
    return (
        // <div className='font-bold text-black md:left-64 flex flex-col  p-5  w-[100%] z-0'>
        <div className='h-screen px-3   overflow-y-scroll pb-10 bg-blue-50'>
            {/* <h1 className='text-left text-2xl md:pl-5 text-blue-900 underline underline-offset-4 decoration-blue-300'>Dashboard</h1> */}

            <div className='mt-5  h-max grid lg:grid-cols-3 grid-rows-1 w-[100%] md:p-10 gap-y-5 md:gap-x-6 text-2xl pb-10'>
                {/* <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex justify-center items-center  bg-blue-100 rounded-md flex-col text-blue-800 gap-y-4'>
                    <div className='p-5 rounded-[50%] shadow-inner shadow-slate-400'>
                    <FaUserGraduate/>
                    </div>
                    <h1>Total Students</h1>
                </div>
               <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex justify-center items-center  bg-[#e8e6fa] rounded-md flex-col text-[#362d8a] gap-y-4'>
                    <div className='p-5 rounded-[50%] shadow-inner shadow-slate-400'>
                        <FaUserTie />
                    </div>
                    <h1 >Total Faculties</h1>
                </div>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex justify-center items-center  bg-pink-100 rounded-md flex-col text-pink-900 gap-y-4'>
                    <div className='p-5 rounded-[50%] shadow-inner shadow-slate-400'>
                        <GrNotes />
                    </div>
                    <h1 >Total Notes</h1>
                </div> 
                 */}
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4  shadow-xl'>
                    <div className='p-5  rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        <FaUserGraduate />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={120} /></h1>
                        <h1 className='text-blue-800'>Students enrolled</h1>
                    </div>
                </div>

                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        <FaUserTie />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={10} /></h1>
                        <h1 className='text-blue-800'>Faculties Registered</h1>
                    </div>
                </div>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4  shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <GiNotebook />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={100} /></h1>
                        <h1 className='text-blue-800' >Notes Uploaded</h1>
                    </div>
                </div>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center  items-center bg-white rounded-md  text-[#4f78fe] gap-y-2  shadow-xl'>
                    <div className='flex max-md:flex-row flex-col gap-y-2 max-md:gap-x-20 justify-between'>
                        <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                            {/* <GrNotes /> */}
                            <FcQuestions />
                        </div>
                        <h1 className='text-green-500 font-bold text-3xl'><CountUp delay={2} end={100} /></h1>
                    </div>
                    <div>
                        <h1 className='text-blue-800'>Question Papers Uploaded</h1>
                    </div>
                </div>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-2 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <BsTable />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={100} /></h1>
                        <h1 className='text-blue-800' >Time Tables Uploaded</h1>
                    </div>
                </div>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4  shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <PiNotePencil />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={100} /></h1>
                        <h1 className='text-blue-800' >Notices Uploaded</h1>
                    </div>
                </div>

            </div>
        </div>
        // </div>
    )
}

export default Dashboard
