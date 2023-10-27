import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
import { Link } from 'react-router-dom'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
function ManageTimeTable() {
    const [open, setOpen] = useState(false);
    const [tTList, setTTList] = useState([])
    const [loader, setLoader] = useState(true)
    const [selectedTT, setSelectedTT] = useState(null)

    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('')
    const [tTName, setTTName] = useState('')
    const [photo, setPhoto] = useState(null);
    const [shiftPlaceholder, setShiftPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };
    const handleChangeShift = (value) => {
        setSelectedShift(value);
        console.log(value);
    }
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

    }

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
    useEffect(() => {
        getTTs()
    }, [])

    const getTTs = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-timetables`);

            if (response.data.success) {
                setTTList(response.data.timeTable);
                console.log(response.data.timeTable);
            } else {
                console.error('Failed to fetch Time Table details');
            }
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
        }

    }

    const onOpenModal = (TT) => {
        setOpen(true);
        setSelectedTT(TT)
        console.log(TT._id)
        setTTName(TT.name)
        setPhoto(TT.photo)
        allSem()
        setSemesterPlaceholder(TT.semester.name)
        setShiftPlaceholder(TT.shift.name)
        setSelectedSem(TT.semester._id)
        setSelectedShift(TT.shift._id)

    }
    const onCloseModal = () => {
        setOpen(false);
        setSelectedTT(null)
        setTTName('')
        setPhoto(null)
        setSemesterPlaceholder('')
        setShiftPlaceholder('')
        setSelectedSem('')
        setSelectedShift('')
    }
    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (TT) => {
        setOpenDelete(true);
        setSelectedTT(TT)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedTT(null)
    }
    const handleDelete =async (e) => {
        e.preventDefault();
        if (selectedTT._id) {
            try {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-TT/${selectedTT._id}`);

                if (response.data.success) {
                    getTTs();
                    setTTList((prevTTList) =>
                        prevTTList.filter((TT) => TT._id !== selectedTT._id)
                    );
                    toast.success('Time Table deleted successfully!', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete Time Table', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
                onCloseDeleteModal();
            } catch (error) {
                toast.error(error, {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            }
        }


    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [tTName,selectedShift, selectedSem];
        let countLoop = 0;
        arr.map((item, key) => {
            item.replace(/\s+/g, '')
            if (item.trim() === '') {
                countLoop += 1
                // setUpdateOrNot(0)
                updateOrNot = 0
                if (countLoop <= 1)
                    toast.error('Every Field must filled', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    })
            }
        })

        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('name', tTName);
            formData.append('semester', selectedSem);
            formData.append('shift', selectedShift);
            if (photo) {
                formData.append('photo', photo);
            }

            try {
                const response = await axios.put(`${urlBackend}/api/v1/update-TT/${selectedTT._id}`, formData);

                if (response.data.success) {
                    getTTs();
                    // Update time table list with the updated time table data
                    setTTList((prevTTList) =>
                        prevTTList.map((TT) =>
                            TT._id === selectedTT._id ? response.data.updatedTT : TT
                        )
                    );
                    toast.success('Time Table Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: 'bottom-center',
                    });

                    onCloseModal();
                } else {
                    toast.error('Time Table or Name is already exist', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }


    };

    return (
        <div className='h-screen bg-blue-50'>
            <div className="w-[100%]  mt-10 max-md:mt-2 md:flex justify-center max-xl:px-2 items-center">
                {loader ? <div className='flex justify-center items-center mt-32'>
                    <BarLoader color="blue"
                    />
                </div>
                    :
                    <div className='text-left overflow-y-auto max-h-[500px]  rounded-md md:w-[80%]'>
                        <table className='w-[100%] border-2 border-collapse  rounded-md '>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white border-2 border-slate-950 text-xl font-semibold'>
                                    <th className='py-2 px-4'>SR.No</th>
                                    <th className='py-2 px-4 '>Name</th>
                                    <th className='py-2 px-4 ' >Semester</th>
                                    <th className='py-2 px-4 '>Shift</th>
                                    <th className='py-2 px-4'>Photo</th>
                                    <th className='py-2 px-4'>Edit</th>
                                </tr>
                            </thead>
                            {tTList?.length === 0 ?
                                <tr className=''>
                                    <td className='py-2 px-4 w-24'></td>
                                    <td className='py-2 px-4 w-24'></td>
                                    <td className='py-2 px-4 w-44'>No Data Found</td>
                                    <td className='py-2 px-4 w-20'></td>
                                    <td className='py-2 px-4 w-20'></td>
                                    <td className='py-2 px-4 w-20'></td>
                                </tr>
                                :
                                <tbody className='bg-slate-800 text-white '>

                                    {tTList?.map((TT, index) => (
                                        <tr key={TT._id} className='border-2 border-gray-700'>
                                            <td className='py-2 px-4'>{index + 1}</td>
                                            <td className='py-2 px-4'>{TT.name}</td>
                                            <td className='py-2 px-4'>{TT.semester.name}</td>
                                            <td className='py-2 px-4'>{TT.shift.name}</td>
                                            <td className='py-2 px-4' >
                                                <Link to={TT.photo} target='_blank'><img className='w-[100px] h-[100px]' src={TT.photo} alt="" />
                                                </Link>
                                            </td>

                                            <td className='  py-2 px-4'>
                                                <div className='flex flex-row gap-2 justify-left'>
                                                    <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(TT)}  >Update</button>
                                                    <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(TT)} >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            }
                        </table>
                    </div>
                }
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>

                <div className='w-[100%] md:w-[600px] text-center  bg-white pb-10 mt-10 '>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Update Time Table</h1>

                    <div className='mt-6 flex max-md:flex-col justify-between  items-center md:flex-row px-12 '>
                        <label htmlFor='semesters' className='font-semibold text-xl'>
                            Select Semester:
                        </label>
                        <Select
                            id='semesters'
                            className='max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
                            placeholder='Select Semester'
                            defaultValue={semesterPlaceholder}
                            onChange={handleChangeSemester}
                        >
                            {semesterList.map((semester) => (
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
                            defaultValue={shiftPlaceholder}
                            onChange={handleChangeShift}
                        >
                            {shiftList.map((shift) => (
                                <Option key={shift._id} value={shift._id}>
                                    {shift.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <form className='mt-2 text-black' onSubmit={handleOnSubmit}>
                        <input
                            type='text'
                            className='mt-5 text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[85%] '
                            placeholder='Name e.g.(FYFS)'
                            value={tTName}
                            onChange={(e) => setTTName(e.target.value)}
                            required
                        />
                        <label className='border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5'>
                            <input type='file' style={{ display: 'none' }} onChange={handleFileChange} />
                            Upload Time Table
                        </label>
                        <br />
                        <button className='mt-16 max-md:mt-5 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                            Update Time Table
                        </button>
                    </form>
                </div>
               
            </Modal>

            <Modal open={openDelete} onClose={onCloseDeleteModal} center classNames={{ modal: 'deleteModal' }}>
                <h1>Delete Record ?</h1>
                <form className='flex flex-row gap-4 mt-5' onSubmit={handleDelete}>
                    <button className='py-1 px-4 text-blue-600 border-2 border-blue-600 rounded-md' onClick={onCloseDeleteModal}>Cancel</button>
                    <button className='py-1 px-4 text-red-600 border-2 border-red-600 rounded-md'>Delete</button>
                </form>
            </Modal> 
        </div>
    )
}

export default ManageTimeTable
