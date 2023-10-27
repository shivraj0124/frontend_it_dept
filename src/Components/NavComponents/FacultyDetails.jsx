import React, { useEffect, useState } from 'react'
import hod_img from '../../Images/hod.png'
import axios from 'axios'
import BarLoader from 'react-spinners/BarLoader'
function FacultyDetails() {
  const [facultyList, setFacultyList] = useState([]);
  const [loader, setLoader] = useState(true)
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const getAllFaculties = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`${urlBackend}/api/v1/manage-faculty`);

      if (response.data.success) {
        setFacultyList(response.data.faculties);
      } else {
        console.error('Failed to fetch faculty details');
      }

      setLoader(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getAllFaculties();
  }, [])
  return (
    <div className="w-[100%] h-max flex flex-col justify-center items-center bg-blue-50" >
      <h1 className='text-2xl font-bold'>Faculties</h1>
      <div className='w-[80%] py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 justify-items-center md:px-[5%]  mt-2 '>
        {loader ? (
          <div className="flex justify-center items-center mt-32">
            <BarLoader color="blue" />
          </div>
        ) : (
          facultyList?.map((faculty, index) => (
          <div className='bg-white flex flex-col shadow-xl w-[90%] max-md:w-[100%] justify-between items-center rounded-md p-3'>
            <div className=''><img src={faculty.photo} alt="" className='w-[280px] h-[200px] rounded-md' /></div>
            <div className='font-bold text-lg mt-5 w-[100%] flex flex-col px-5'>
              <h1 className='font-bold'>Name: {faculty.name} </h1>
              <h1>Post: {faculty.post}</h1>
              <h1>Qualification: {faculty.qualification}</h1>
              <h1>Teaching Experience: {faculty.experience}</h1>
            </div>
          </div>
            ))
        )}
      </div>
    </div>
  )

        }
  export default FacultyDetails;
