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
    const [students,setTotalStudents]=useState(0)
    const [faculties,setTotalFaculties]=useState(0)
    const [notes,setTotalNotes]=useState(0)
    const [qPS,setTotalQPS]=useState(0)
    const [tTS,setTotalTTS]=useState(0)
    const [notices,setTotalNotices]=useState(0)
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const getAllCounts=async ()=>{
        try {
            const response1 = await axios.get(`${urlBackend}/api/v1/students-count`);
            setTotalStudents(response1.data.totalStudents);
        } catch (error) {
            console.error('Error fetching faculty count:', error);
        }
        try {
            const response1 = await axios.get(`${urlBackend}/api/v1/faculties-count`);
            setTotalFaculties(response1.data.totalFaculties);
        } catch (error) {
            console.error('Error fetching faculty count:', error);
        }

        try {
            const response2 = await axios.get(`${urlBackend}/api/v1/notes-count`);
            setTotalNotes(response2.data.totalNotes);
        } catch (error) {
            console.error('Error fetching notes count:', error);
        }

        try {
            const response3 = await axios.get(`${urlBackend}/api/v1/qp-count`);
            setTotalQPS(response3.data.totalQP);
        } catch (error) {
            console.error('Error fetching QP count:', error);
        }

        try {
            const response4 = await axios.get(`${urlBackend}/api/v1/timeTable-count`);
            setTotalTTS(response4.data.totalTimetables);
        } catch (error) {
            console.error('Error fetching timetable count:', error);
        }

        try {
            const response5 = await axios.get(`${urlBackend}/api/v1/notice-count`);
            setTotalNotices(response5.data.totalNotices);
        } catch (error) {
            console.error('Error fetching notice count:', error);
        }

    }
    useEffect(() => {
        // axios.get(`${urlBackend}/api/v1/faculties-count`).then((response) => {
        //     setTotalFaculties(response.data.totalFaculties);
        // });
        // axios.get(`${urlBackend}/api/v1/notes-count`).then((response) => {
        //     setTotalNotes(response.data.totalNotes);
        // });
        // axios.get(`${urlBackend}/api/v1/qp-count`).then((response) => {
        //     setTotalQPS(response.data.totalQP);
        // });
        // axios.get(`${urlBackend}/api/v1/timeTable-count`).then((response) => {
        //     setTotalTTS(response.data.totalTimetables);
        // });
        // axios.get(`${urlBackend}/api/v1/notice-count`).then((response) => {
        //     setTotalNotices(response.data.totalNotices);
        // });
        getAllCounts()
    }, []);

    return (
        
        <div className='h-screen px-3  overflow-y-auto pb-28 bg-blue-50 '>
            

            <div className='mt-2 h-max grid lg:grid-cols-3 grid-rows-1 w-[100%] md:p-10 gap-y-5 md:gap-x-6 text-2xl pb-10 mb-10'>
               
                <Zoom left>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-4 shadow-xl'>
                        <div className='p-5 rounded-[50%] bg-[#e8efff] text-[#405fc4]'>
                            <FaUserGraduate />
                    </div>
                    <div>
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={students} /></h1>
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
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={faculties} /></h1>
                            <h1 className='text-blue-900 text-2xl'>Faculties Registered</h1>
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
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={notes} /></h1>
                        <h1 className='text-blue-900 text-2xl' >Notes Uploaded</h1>
                    </div>
                </div>
                </Zoom>
               
                         
                <Zoom left>
                <div className='shadow-box w-[100%] h-[200px]  text-center font-bold flex flex-col justify-center items-center bg-white rounded-md  text-[#4f78fe] gap-y-2 shadow-xl'>
                    <div className='p-5 rounded-[50%] bg-blue-50 text-[#405fc4]'>
                        {/* <GrNotes /> */}
                        <LuFileQuestion />
                    </div>
                    <div>
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={qPS} /></h1>
                        <h1 className='text-blue-900 text-2xl' >Question Papers Uploaded</h1>
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
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={tTS} /></h1>
                        <h1 className='text-blue-900 text-2xl' >Time Tables Uploaded</h1>
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
                            <h1 className='text-blue-700 font-bold text-4xl'><CountUp delay={2} end={notices} /></h1>
                        <h1 className='text-blue-900 text-2xl' >Notices Uploaded</h1>
                    </div>
                </div>
                </Zoom>
                
                
                

            </div>
        </div>
        // </div>
    )
}

export default Dashboard
