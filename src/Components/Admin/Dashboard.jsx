import React,{useState,useEffect} from 'react'
import { FaUserGraduate, FaUserTie } from 'react-icons/fa'
import Zoom from 'react-reveal/Zoom';
import { GiNotebook } from 'react-icons/gi'
import { PiNotePencil } from 'react-icons/pi'
import { BsTable } from 'react-icons/bs'
import { LuFileQuestion } from 'react-icons/lu'
import CountUp from 'react-countup'
import axios from 'axios'
function Dashboard() {
    const [notes,setTotalNotes]=useState(0)
    const [faculties,setTotalFaculties]=useState(0)
    const [qPS,setTotalQPS]=useState(0)
    const [tTS,setTotalTTS]=useState(0)
    const [notices,setTotalNotices]=useState(0)
    const urlBackend = import.meta.env.VITE_BACKEND_API
    useEffect(() => {
        axios.get(`${urlBackend}/api/v1/faculties-count`).then((response) => {
            setTotalFaculties(response.data.totalFaculties);
        });
        axios.get(`${urlBackend}/api/v1/notes-count`).then((response) => {
            setTotalNotes(response.data.totalNotes);
        });
        axios.get(`${urlBackend}/api/v1/qp-count`).then((response) => {
            setTotalQPS(response.data.totalQP);
        });
        axios.get(`${urlBackend}/api/v1/timeTable-count`).then((response) => {
            setTotalTTS(response.data.totalTimetables);
        });
        axios.get(`${urlBackend}/api/v1/notice-count`).then((response) => {
            setTotalNotices(response.data.totalNotices);
        });
    }, []);

    return (
        // <div className='font-bold text-black md:left-64 flex flex-col  p-5  w-[100%] z-0'>
        <div className='h-screen px-3  overflow-y-auto pb-28 bg-blue-50 '>
            {/* <h1 className='text-left text-2xl md:pl-5 text-blue-900 underline underline-offset-4 decoration-blue-300'>Dashboard</h1> */}

            <div className='mt-2 h-max grid lg:grid-cols-3 grid-rows-1 w-[100%] md:p-10 gap-y-5 md:gap-x-6 text-2xl pb-10 mb-10'>
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
              
                <Zoom left>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4 shadow-xl'>
                        <div className='p-5 rounded-[50%] bg-[#e8efff] text-[#405fc4]'>
                            <FaUserGraduate />
                    </div>
                    <div>
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={faculties} /></h1>
                        <h1 className='text-blue-900 text-2xl'>Students Registered</h1>
                    </div>
                </div>
                </Zoom>
                <Zoom top>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        <FaUserTie />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={faculties} /></h1>
                        <h1 className='text-blue-800'>Faculties Registered</h1>
                    </div>
                </div>
                </Zoom>
                <Zoom right>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4  shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <GiNotebook />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={notes} /></h1>
                        <h1 className='text-blue-800' >Notes Uploaded</h1>
                    </div>
                </div>
                </Zoom>
                {/* <div className='shadow-box max-md:w-[100%] md:h-[160px]  text-center font-bold flex flex-col   bg-white rounded-md  text-[#4f78fe] gap-y-2 text-3xl  shadow-xl max-md:pb-2 '>
                    <div className='w-[80%] flex flex-row  min-w-[300px]:gap-x-32 justify-between items-center '>
                        <div className='p-7  rounded-br-[50%] hover:bg-blue-100 hover:text-[#405fc4] bg-blue-700 text-white'>
                            {/* <GrNotes /> 
                            <GiNotebook size={44} />
                        </div>
                        <h1 className='text-green-500 font-semibold text-5xl'><CountUp delay={2} end={100} /></h1>
                    </div>
                    <div>
                        <h1 className='text-blue-800 text-2xl'>Question Papers Uploaded</h1>
                    </div>
                </div> */}

               
               
                <Zoom left>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-2 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <LuFileQuestion />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={qPS} /></h1>
                        <h1 className='text-blue-800' >Question Papers Uploaded</h1>
                    </div>
                </div>
                </Zoom>
                


                <Zoom bottom>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-2 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <BsTable />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={tTS} /></h1>
                        <h1 className='text-blue-800' >Time Tables Uploaded</h1>
                    </div>
                </div>
                </Zoom>
                <Zoom right>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4  shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <PiNotePencil />
                    </div>
                    <div>
                        <h1 className='text-green-500 font-normal'><CountUp delay={2} end={notices} /></h1>
                        <h1 className='text-blue-800' >Notices Uploaded</h1>
                    </div>
                </div>
                </Zoom>
                
                
                

            </div>
        </div>
        // </div>
    )
}

export default Dashboard
