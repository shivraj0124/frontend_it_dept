import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios'
import toast from 'react-hot-toast';
import themeHook from '../Admin/ContextP.jsx'
export default function FAddNotice() {
    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const {auth,userId} = themeHook()
    
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };

    const handleChangeShift = (value) => {
        setSelectedShift(value);
    };
    const allSem =async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-semesters`);

            if (response.data.success) {
                setSemesterList(response.data.semesters);
            } else {
                console.error('Failed to Fetch Semesters');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const allShifts =async (selectedSemesterId) => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-shifts/${selectedSemesterId}`);

            if (response.data.success) {
                setShiftList(response.data.shifts);
            } else {
                console.error('Failed to Fetch Shifts');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        let updateOrNot = 1;
        const arr = [title, description];
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
                        toast.error('Title Field must filled', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    } else if (index === 1) {
                        toast.error('Description Field must filled', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    }
                }
            }
        })
        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('link', link);
            formData.append('description', description);
            formData.append('semester', selectedSem);
            formData.append('shift', selectedShift);
            formData.append('role', userId);

            try {
                const response = await axios.post(`${urlBackend}/api/v4/add-notice`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    toast.success('Notice Added Successfully!', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to Add Notice', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to Add Notice ', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            }
        }
    }
    useEffect(() => {
        allSem()
    }, [])
    return (
        <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
            <div className="w-[100%] mt-2 flex justify-center items-center">
               
                    <div className='xl:w-[80%] w-[96%] flex flex-col justify-center items-center mt-2 bg-white pb-4 lg:pb-10 shadow-xl rounded-md'>
                        <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-4'>Add Notice</h1>
                        <div className='flex flex-row  w-[80%]  justify-center mt-4 '>
                            <div className='mt-2 flex max-md:flex-col  items-center w-[100%] flex-row  '>
                                <label htmlFor='semesters' className='font-semibold text-xl'>
                                    Select Semester:
                                </label>
                                <Select
                                    id='semesters'
                                    className='max-md:w-[80%] md:w-[57%] font-semibold  focus:outline-none'
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
                            <div className='mt-2 flex max-md:flex-col items-center flex-row w-[100%] '>
                                <label htmlFor='shifts' className='font-semibold text-xl'>
                                    Select Shift:
                                </label>
                                <Select
                                    id='shifts'
                                    className='max-md:w-[80%] md:w-[57%] font-semibold  focus:outline-none'
                                    placeholder='Select Shift'
                                    onChange={handleChangeShift}
                                >
                                    {shiftList?.map((shift) => (
                                        <Option key={shift._id} value={shift._id}>
                                            {shift.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <form className='mt-2 text-black w-[80%] flex flex-col justify-center ' onSubmit={handleOnSubmit} >
                            <input
                                type='text'
                                className='mt-2 text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] '
                                placeholder='Name e.g.(FYFS)'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <input type="url" className='text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' placeholder='Link (Optional)' onChange={(e) => setLink(e.target.value)} />
                            <br />
                            <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-2 w-[100%]  ' rows={3} placeholder='Description..' onChange={(e) => setDescription(e.target.value)} required>

                            </textarea>
                            <br />
                            <button className='mt-2 max-md:mt-5 w-[100%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                                Add Notice
                            </button>
                        </form>
                    </div>
                    

                
            </div>
        </div>

    )
}
// x2FnvrxDpPLhLaUe --password
//  mongodb+srv://connectitdept:<password>@cluster0.zpkisx0.mongodb.net/?retryWrites=true&w=majority
