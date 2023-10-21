import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import toast from 'react-hot-toast';
import img1 from '../../Images/add_time_table.png'
function AddTT() {
    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [tName, setTName] = useState('');
    const [photo, setPhoto] = useState(null); // Use null to represent no selected file
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };

    const handleChangeShift = (value) => {
        setSelectedShift(value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const allSem = () => {
        axios
            .get(`${urlBackend}/api/v1/get-semesters`)
            .then((response) => {
                if (response.data.success) {
                    setSemesterList(response.data.semesters);
                } else {
                    console.error('Failed to Fetch Semesters');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const allShifts = (selectedSemesterId) => {
        axios.get(`${urlBackend}/api/v1/get-shifts/${selectedSemesterId}`)
            .then((response) => {
                if (response.data.success) {
                    setShiftList(response.data.shifts);
                } else {
                    console.error('Failed to Fetch Shifts');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', tName);
        formData.append('photo', photo);
        formData.append('semester', selectedSem);
        formData.append('shift', selectedShift);

        try {
            const response = await axios.post(`${urlBackend}/api/v1/addTT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Time Table Uploaded Successfully!', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            } else {
                toast.error('Failed to Upload Time Table', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to Upload Time Table', {
                autoClose: 2000,
                position: 'bottom-center',
            });
        }
    };

    useEffect(() => {
        allSem();
    }, []);

    return (
        <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
            <div className='w-100 mt-16  justify-center max-xl:px-2 xl:px-36 pb-10 max-md:mt-20'>
                <div className='w-[100%] flex md:flex-row- max-md:flex-col-reverse px-2 bg-white shadow-xl rounded-md'>
                    <div className='w-[100%] text-center  bg-white pb-10 mt-10 '>
                        <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Time Table</h1>

                        <div className='mt-6 flex max-md:flex-col justify-between  items-center md:flex-row px-12 '>
                            <label htmlFor='semesters' className='font-semibold text-xl'>
                                Select Semester:
                            </label>
                            <Select
                                id='semesters'
                                className='max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
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
                        <div className='mt-4 flex max-md:flex-col justify-between  items-center md:flex-row px-12 '>
                            <label htmlFor='shifts' className='font-semibold text-xl'>
                                Select Shift:
                            </label>
                            <Select
                                id='shifts'
                                className='max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
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
                        <form className='mt-2 text-black' onSubmit={handleOnSubmit}>
                            <input
                                type='text'
                                className='mt-5 text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] '
                                placeholder='Name e.g.(FYFS)'
                                onChange={(e) => setTName(e.target.value)}
                                required
                            />
                            <label className='border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5'>
                                <input type='file' style={{ display: 'none' }} onChange={handleFileChange} />
                                Upload Time Table
                            </label>
                            <br />
                            <button className='mt-16 max-md:mt-5 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                                Add Time Table
                            </button>
                        </form>
                    </div>
                    <div className='w-[100%] h-[70%] mt-16 max-md:mt-2'>
                        <img className='w-[100%] h-[100%] max-md:h-[70%] max-md:hidden' src={img1} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTT;
