import React, { useEffect, useState } from 'react'
import axios from 'axios'
import themeHook from '../Admin/ContextP'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import { Link } from 'react-router-dom'
import img from '../../Images/questiopp.png'
import no_data_found from '../../Images/no_data_found.png'
import BarLoader from 'react-spinners/BarLoader'
function StudentQuesPaper() {
    const { studentDetails } = themeHook()
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(true);
    const [semesterId, setSemesterId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [quesList, setQuesList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleChangeSubject = (value) => {
        setSelectedSubject(value);
        console.log(value);
        getQuesPBySubject(value)
    }
    const allSubjects = async (semesterId) => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/subjects/${semesterId}`);

            if (response.data.success) {
                setSubjectList(response.data.subjects);
                console.log(subjectList);
            } else {
                console.error('Failed to Fetch Subjects');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const getAllQuesP =async (semesterId) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v2/get-quesP/${semesterId}`);

            if (response.data.success) {
                setQuesList(response.data.quesP);
                setLoader(false);
                console.log(semesterId);
                console.log(response.data.quesP);
            } else {
                console.log(response.data.message);
                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        }

    }
    const getQuesPBySubject =async (selectedSubject) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v2/get-quesP-by-subject/${selectedSubject}`);

            if (response.data.success) {
                setQuesList(response.data.quesP);
                setLoader(false);
                console.log(subjectId);
                console.log(response.data.quesP);
            } else {
                console.log(response.data.message);
                setTimeout(() => {
                    setLoader(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setLoader(false);
            }, 2000);
        }

    }
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.get(`${urlBackend}/api/v2/search-quesP`, {
                params: { search, semester: semesterId },
            });
            setQuesList(response.data.quesP);
            setInterval(() => {
                setLoader(false)
            }, 2000);

        } catch (error) {
            console.error('Error fetching quesP:', error);
            setInterval(() => {
                setLoader(false)
            }, 2000);
        }
    };

    useEffect(() => {
        console.log(studentDetails[0]?.Semester?._id)
        allSubjects(studentDetails[0]?.Semester?._id)
        setSemesterId(studentDetails[0]?.Semester?._id)
        getAllQuesP(studentDetails[0]?.Semester?._id)
    }, [])
    return (

        <div className=''>
            <div className='flex flex-col'>
                <div className="py-2 px-2 flex max-lg:flex-col-reverse  w-[100%] lg:flex-row sticky top-0 " style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                    <div className='flex flex-row w-[100%] lg:w-[40%] justify-between items-center gap-2 max-lg:mt-5'>
                        <button className='py-2 w-[60%] lg:w-max lg:px-4 max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={() => getAllQuesP(studentDetails[0]?.Semester?._id)}>All Subjects</button>

                        <Select
                            id="semesters"
                            className="max-md:w-[100%] lg:w-[70%] font-semibold md:ml-3 focus:outline-none "
                            placeholder='Select Subject'
                            onChange={handleChangeSubject}
                        >
                            {
                                subjectList?.map((subject) => {
                                    return <Option key={subject._id} value={subject._id} >{subject.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <form onSubmit={handleSearch} className='w-[60%] flex justify-center items-center max-lg:w-[100%] '>
                        <input type="text " className='lg:w-[80%] w-[100%] rounded-xl h-[40px] max-lg:h-[30px] bg-blue-50  px-4 focus:border-blue-400 focus:outline-none border' placeholder='Search Here ....' value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>
                {loader ? (
                    <div className="flex justify-center items-center mt-32">
                        <BarLoader color="blue" />
                    </div>
                ) : !loader && quesList?.length <= 0 ? (<div className="flex justify-center items-center mt-10">
                    <img src={no_data_found} alt="" className='w-[300px] h-[400px]' />
                </div>) : (
                    <div className='grid md:grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-4 md:mt-5 px-2 pb-10'>
                        {quesList.map((note, index) => {
                            return <>
                                <div key={index} className='p-4 shadow-xl rounded-md bg-white text-center'>
                                    <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
                                        <img src={img} alt="" className='h-[100px] w-[100px] ' />
                                    </div>
                                    <div className='flex flex-col justify-between items-center   rounded-md p-2 h-max'>
                                        <h2 className='font-semibold text-xl '>{note.name}</h2>
                                        <Link target='_blank' to={note.link} className='p-2 px-5 bg-blue-700 hover:bg-blue-500 text-white  w-max rounded-md mt-4'>click here</Link>
                                    </div>
                                </div>
                            </>
                        })
                        }
                    </div>
                )}
            </div>
        </div>

    )
}

export default StudentQuesPaper
