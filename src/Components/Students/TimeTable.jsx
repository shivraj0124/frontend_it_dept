import React, { useState, useEffect } from 'react'
import themeHook from '../Admin/ContextP'
import axios from 'axios'
import no_data_found from '../../Images/no_data_found.png'
import BarLoader from 'react-spinners/BarLoader'
function TimeTable() {
    const { studentDetails } = themeHook()
    const [loader, setLoader] = useState(true);
    const [semesterId, setSemesterId] = useState('')
    const [shiftId, setShiftId] = useState('')
    const [timeTable, setTimeTable] = useState([])
    const [dateOnly,setDateOnly]=useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const getTimeTable = async (semesterId, shiftId) => {
        setLoader(true);
        try {
            const response = await axios.get(`${urlBackend}/api/v2/get-timeTable`, { params:{ semesterId: semesterId, shiftId: shiftId 
        },});
            setTimeTable(response.data.timeTable);
            console.log(timeTable);
            setInterval(() => {
                setLoader(false)
            }, 2000);

        } catch (error) {
            console.error('Error fetching quesP:', error);
            setInterval(() => {
                setLoader(false)
            }, 2000);
        }
    }
    
    useEffect(() => {
        setSemesterId(studentDetails[0].Semester?._id)
        setShiftId(studentDetails[0].Shift?._id)
        getTimeTable(studentDetails[0].Semester?._id, studentDetails[0].Shift?._id)
    }, [])
    return (
        <div className="h-max bg-blue-50 overflow-x-auto">
            <div className="w-[100%] mt-2 max-md:mt-2 flex justify-center">
                {loader ? (
                    <div className="flex justify-center items-center mt-32">
                        <BarLoader color="blue" />
                    </div>
                ) : !loader && timeTable?.length <= 0 ? (<div className="flex justify-center items-center mt-10">
                    <img src={no_data_found} alt="" className='w-[300px] h-[400px]' />
                </div>) : ( 
                    <div className='flex flex-col justify-center min-[600px]:h-max max-lg:w-[100%]'>
                    {
                    timeTable?.map((tt,index)=>{         
                    return<>
                                        
                        <div className='flex justify-between px-[10%]'>
                            <h1 className='text-start font-semibold text-2xl max-md:text-sm'>{tt.name}</h1>
                            <h1 className='text-start  text-lg max-md:text-sm font-semibold'>Created On: <span className='text-blue-700 max-md:text-sm'>{new Date(tt.createdAt).toLocaleDateString()}</span></h1>
                        </div>
                           
                        <img src={tt.photo} alt="" className='mt-5  h-[500px] max-[600px]:h-max' />           
                    </>
                    })}
                   </div>

                    
                )}
            </div>
        </div>
    )
}

export default TimeTable
