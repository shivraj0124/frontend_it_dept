import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import toast from 'react-hot-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import themeHook from '../Admin/ContextP'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import '../Admin/AdminComponents.css'
export default function FManageNotices() {
    const [open, setOpen] = useState(false);
    const [openDes, setOpenDes] = useState(false);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionView, setDescriptionView] = useState('');
    const [loader, setLoader] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeList, setNoticeList] = useState([]);
    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('')
    const [shiftPlaceholder, setShiftPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
    const {auth}=themeHook();
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleDescriptionModal = (notice) => {
        setOpenDes(true);
        setDescriptionView(notice.description);
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
    const onCloseDes = () => {
        setOpenDes(false);
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

    }

    const allSem = async () => {
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
    const [openDelete, setOpenDelete] = useState(false);
    const openDeleteModal = (notice) => {
        setOpenDelete(true);
        setSelectedNotice(notice);
    };
    const onCloseDeleteModal = () => {
        setOpenDelete(false);
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            if (selectedNotice && selectedNotice._id) {
                const response = await axios.delete(`${urlBackend}/api/v4/delete-notice/${selectedNotice._id}`);

                if (response.data.success) {
                    getNotices();
                    setNoticeList((prevNoticeList) =>
                        prevNoticeList.filter((notice) => notice._id !== selectedNotice._id)
                    );
                    toast.success('Notice deleted successfully!', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete Notice', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }

                onCloseDeleteModal();
            }
        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
                position: 'bottom-center',
            });
        }

    };

    const onOpenModal = (notice) => {
        setOpen(true);
        allSem()
        setSelectedNotice(notice);
        setTitle(notice.title);
        setLink(notice.link);
        setDescription(notice.description);
        setSemesterPlaceholder(notice.semester.name)
        setShiftPlaceholder(notice.shift.name)
        setSelectedSem(notice.semester._id)
        setSelectedShift(notice.shift._id)
    };

    const onCloseModal = () => {
        setOpen(false);
        setSelectedNotice(null);
        setTitle('');
        setLink('');
        setDescription('');
        setSemesterPlaceholder('')
        setShiftPlaceholder('')
        setSelectedSem('')
        setSelectedShift('')
    };

    const handleOnSubmit =async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [title, description];
        let countLoop = 0;

        arr.forEach((item, index) => {
            item = item.replace(/\s+/g, ''); // Assign the result back to the variable
            if (item.trim() === '') {
                countLoop += 1;
                updateOrNot = 0;
                if (countLoop <= 1)
                    index === 0
                        ? toast.error(`Title Field must be filled`, {
                            autoClose: 2000,
                            position: 'bottom-center',
                        })
                        : toast.error(`Description Field must be filled`, {
                            autoClose: 2000,
                            position: 'bottom-center',
                        });
            }
        });

        if (updateOrNot === 1) {
            try {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('link', link);
                formData.append('description', description);
                formData.append('semester', selectedSem);
                formData.append('shift', selectedShift);

                const response = await axios.put(
                    `${urlBackend}/api/v4/update-notice/${selectedNotice._id}`,
                    formData
                );

                if (response.data.success) {
                    getNotices();
                    setNoticeList((prevNoticeList) =>
                        prevNoticeList.map((notice) =>
                            notice._id === selectedNotice._id ? response.data.updatedNotice : notice
                        )
                    );
                    toast.success('Notice Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: 'bottom-center',
                    });
                    onCloseModal();
                } else {
                    toast.error('Notice with this Title already exists', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

    };

    const getNotices =async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v4/get-notices/${auth?.user?.phone}`);

            if (response.data.success) {
                setNoticeList(response.data.fNotice);
            } else {
                console.error('Failed to fetch Notice details');
            }

            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    useEffect(() => {
        getNotices();
    }, []);

    return (
        <div className="h-screen bg-blue-50">
            <div className="w-[100%] mt-10 max-md:mt-2 flex justify-center items-center">
                {loader ? (
                    <div className="flex justify-center items-center mt-32">
                        <BarLoader color="blue" />
                    </div>
                ) : (
                    <div className="text-left overflow-y-auto max-h-[500px] rounded-md w-[100%] px-2">
                        <table className="w-[100%]  border-2 border-collapse rounded-md">
                            <thead className="sticky top-0">
                                <tr className="bg-slate-950 text-white border-2 border-slate-950">
                                    <th className="p-3 px-4   max-md:text-sm">SR.No</th>
                                    <th className="p-3 px-4  max-md:text-sm">Title</th>
                                    <th className="p-3 px-4  max-md:text-sm">Description</th>
                                    <th className="p-3 px-4  max-md:text-sm">Semester</th>
                                    <th className="p-3 px-4  max-md:text-sm">Shift</th>
                                    <th className="p-3  px-4 max-md:text-sm">Link</th>
                                    <th className="p-3 max-md:text-sm ">Edit</th>
                                </tr>
                            </thead>
                            {noticeList?.length === 0 ? (
                                <tr>
                                    <td className="p-3 px-4 max-md:text-sm w-24"></td>
                                    <td className="p-3 px-4 max-md:text-sm w-24"></td>
                                    <td className="p-3 px-4 w-20"></td>
                                    <td className="p-3 px-4 max-md:text-sm w-44">No Data Found</td>
                                    <td className="p-3 px-4 w-20"></td>
                                    <td className="p-3 px-4 w-20"></td>
                                    <td className="p-3 px-4 w-20"></td>
                                </tr>
                            ) : (
                                <tbody className="bg-slate-800 text-white">
                                    {noticeList?.map((notice, index) => (
                                        <tr key={notice._id} className="border-2 border-gray-700 ">
                                            <td className="p-3 px-5   max-md:text-sm">{index + 1}</td>
                                            <td className="p-3 px-5    max-md:text-sm">{notice.title}</td>
                                            <td onClick={() => handleDescriptionModal(notice)} className='cursor-pointer p-3 px-4  max-md:text-sm '>View</td>
                                            <td className="p-3 px-5    max-md:text-sm">{notice.semester.name}</td>
                                            <td className="p-3 px-5    max-md:text-sm">{notice.shift.name}</td>
                                            <td className="p-3 px-5 max-md:text-sm">
                                               { notice.link.length === 0 ?  <p>No Link</p>:<Link target="_blank" to={notice.link}>
                                                    View
                                                </Link>
}
                                            </td>
                                            <td className="p-3  max-md:text-sm ">
                                                <div className="flex flex-row gap-2 justify-start min-[1150px]:w-[80px]">
                                                    <button className="text-white font-semibold bg-green-700 py-1 px-2 rounded-md" onClick={() => onOpenModal(notice)}>Update</button>
                                                    <button className="text-white font-semibold bg-red-700 py-1 px-2 rounded-md " onClick={() => openDeleteModal(notice)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </table>
                    </div>
                )}
            </div>
            <Modal open={openDes} onClose={onCloseDes} center classNames={{ modal: 'desModal' }}>
                <div className="w-[100%] mt-6">
                    <h1 className="text-blue-800 text-xl font-semibold">Description</h1>
                    <p className="mt-4">{descriptionView}</p>
                </div>
            </Modal>
            <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>
                <div className='md:w-[700px] max-md:w-[450px]  mt-5  bg-white '>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-4'>Add Notice</h1>
                    <div className='flex flex-row max-md:flex-col  w-[100%]  justify-center mt-6 '>
                        <div className='mt-2 flex max-md:flex-col  items-center w-[100%] flex-row  '>
                            <label htmlFor='semesters' className='font-semibold text-xl'>
                                Select Semester:
                            </label>
                            <Select
                                id='semesters'
                                className='max-md:w-[80%] md:w-[57%] font-semibold  focus:outline-none'
                                placeholder='Select Semester'
                                defaultValue={semesterPlaceholder}
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
                                defaultValue={shiftPlaceholder}
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
                    <form className='mt-2 text-black w-[100%] flex flex-col justify-center ' onSubmit={handleOnSubmit} >
                        <input
                            type='text'
                            className='mt-2 text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] '
                            placeholder='Name e.g.(FYFS)'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input type="url" className='text-xl font-semibold placeholder:text-slate-400 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' placeholder='Link (Optional)' onChange={(e) => setLink(e.target.value)} value={link} />
                        <br />
                        <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-2 w-[100%]  ' rows={5} placeholder='Description..' onChange={(e) => setDescription(e.target.value)} value={description} required>

                        </textarea>
                        <br />
                        <button className='mt-2 max-md:mt-5 w-[100%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                            Update Notice
                        </button>
                    </form>
                </div>

            </Modal>
            <Modal open={openDelete} onClose={onCloseDeleteModal} center classNames={{ modal: 'deleteModal' }}>
                <h1>Delete Record ?</h1>
                <form className="flex flex-row gap-4 mt-5" onSubmit={handleDelete}>
                    <button className="py-1 px-4 text-blue-600 border-2 border-blue-600 rounded-md" onClick={onCloseDeleteModal}>Cancel</button>
                    <button className="py-1 px-4 text-red-600 border-2 border-red-600 rounded-md">Delete</button>
                </form>
            </Modal>
        </div>
    );
}
