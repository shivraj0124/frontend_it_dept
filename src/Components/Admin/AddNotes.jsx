import React, { useState, useEffect } from 'react'
import img1 from '../../Images/AddNotes.png'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import axios from 'axios'
import toast from 'react-hot-toast';
function AddNotes() {
    const [semesterList, setSemesterList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('')
    const [nName, setNName] = useState('')
    const [link, setLink] = useState('')
    const [role, setRole] = useState(1)
    // const [subjectName,setSubjectName]=useState('')
    // const [semesterName,setSemesterName]=useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedSubject('');
        allSubjects(value);
    };
    const handleChangeSubject = (value) => {
        setSelectedSubject(value);
        console.log(value);
    }
    const allSem = () => {
        axios.get(`${urlBackend}/api/v1/get-semesters`).then((response) => {
            if (response.data.success) {
                setSemesterList(response.data.semesters);
            } else {
                console.error('Failed to Fetch Semesters');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    const allSubjects = (selectedSemesterId) => {
        axios.get(`${urlBackend}/api/v1/subjects/${selectedSemesterId}`).then((response) => {
            if (response.data.success) {
                setSubjectList(response.data.subjects);
            } else {
                console.error('Failed to Fetch Subjects');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [selectedSem, selectedSubject, nName, link];
        let countLoop = 0;
        arr.map((item, index) => {
            if (typeof item === 'string') {
                item = item.replace(/\s+/g, ''); // Assign the result back to item
            }
            if (typeof item === 'string') {
                item = item.trim(); // Assign the result back to item
            }
            if (item === '') {
                countLoop += 1
                // setUpdateOrNot(0)
                updateOrNot = 0
                if (countLoop <= 1) {

                    if (index === 0) {
                        toast.error('Please Select semester', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    } else if (index === 1) {
                        toast.error('Please Select Subject', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 2) {
                        toast.error('Name Field must filled', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 3) {
                        toast.error('Please provide the link', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    }
                }
            }
        })
        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('name', nName);
            formData.append('link', link);
            formData.append('subject', selectedSubject);
            formData.append('semester', selectedSem);
            formData.append('role', role);

            try {
                const response = await axios.post(`${urlBackend}/api/v1/add-notes`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    toast.success('Notes Added Successfully!', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Note already Exist with this name', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to Add Notes ', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            }
        }
    };
    useEffect(() => {
        allSem()
    })
    return (
        <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
            <div className="w-[100%] mt-8 max-md:mt-8 flex justify-center items-center">
                <div className="w-[80%] max-[806px]:w-[96%] flex md:flex-row max-md:flex-col-reverse   bg-white shadow-xl rounded-md">
                    <div className='w-[100%] text-center bg-white pb-10 mt-10 '>
                        <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Notes</h1>
                        <div className='w-[100%] flex flex-col justify-center items-center px-[10%]'>
                            <div className="mt-14 max-md:mt-5 flex max-md:flex-col justify-between  items-center md:flex-row w-[100%] ">
                                <label htmlFor="semesters" className='font-semibold text-xl'>
                                    Select Semester:
                                </label>
                                <Select
                                    id="semesters"
                                    className="max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none"
                                    placeholder='Select Semester'
                                    onChange={handleChangeSemester}
                                >
                                    {semesterList?.map((semester) => (
                                        <Option key={semester._id} value={semester._id}>
                                            {semester.name}
                                        </Option>
                                    ))}

                                </Select>
                            </div>
                            <div className="mt-5 flex max-md:flex-col justify-between  items-center md:flex-row w-[100%]">
                                <label htmlFor="semesters" className='font-semibold text-xl'>
                                    Select Subject:
                                </label>
                                <Select
                                    id="semesters"
                                    className="max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none"
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
                        </div>
                        <form className='mt-5 text-black' onSubmit={handleOnSubmit}>
                            <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name'
                                onChange={(e) => setNName(e.target.value)} required />
                            <input type="url" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Link' onChange={(e) => setLink(e.target.value)} required />

                            <br />
                            <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                                Upload
                            </button>
                        </form>
                    </div>
                    <div className='w-[100%] max-md:h-[40%] max-xl:hidden'>
                        <img className='w-[100%] h-[100%] max-md:h-[200px]' src={img1} alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddNotes