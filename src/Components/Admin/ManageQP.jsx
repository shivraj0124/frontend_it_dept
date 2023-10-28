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
function ManageQP() {
    const [open, setOpen] = useState(false);
    const [QPList, setQPList] = useState('')
    const [loader, setLoader] = useState(true)
    const [selectedQP, setSelectedQP] = useState(null)
    const [search, setSearch] = useState('')
    const [semesterList, setSemesterList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('')
    const [nName, setNName] = useState('')
    const [link, setLink] = useState('')
    const [subjectPlaceholder, setSubjectPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
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
    const FilterBySemester = (value) => {
        getQpBySemester(value)
        allSubjects(value);
    }
    const FilterBySubject = (value) => {
        getQpBySubject(value)
    }
    const allSubjects = async (selectedSemesterId) => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/subjects/${selectedSemesterId}`);

            if (response.data.success) {
                setSubjectList(response.data.subjects);
            } else {
                console.error('Failed to Fetch Subjects');
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
        getQPs()
        allSem()
    }, [])

    const getQPs =async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-qp`);

            if (response.data.success) {
                setQPList(response.data.qP);
                console.log(response.data.qP);
            } else {
                console.error('Failed to fetch Question paper details');
            }
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }

    }
    const getQpBySemester =async (value) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-qp-by-semester/${value}`);

            if (response.data.success) {
                setQPList(response.data.qp);
                setLoader(false);
                console.log(response.data.notes);
            } else {
                console.log(response.data.message);
                setInterval(() => {
                    setLoader(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setInterval(() => {
                setLoader(false);
            }, 2000);
        }

    }
    const getQpBySubject =async (value) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-qp-by-subject/${value}`);

            if (response.data.success) {
                setQPList(response.data.qp);
                setLoader(false);
                console.log(subjectId);
                console.log(response.data.qp);
            } else {
                console.log(response.data.message);
                setInterval(() => {
                    setLoader(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            setInterval(() => {
                setLoader(false);
            }, 2000);
        }

    }
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.get(`${urlBackend}/api/v1/search-qp`, {
                params: { search },
            });
            setQPList(response.data.qp);
            setInterval(() => {
                setLoader(false)
            }, 2000);

        } catch (error) {
            console.error('Error fetching notes:', error);
            setInterval(() => {
                setLoader(false)
            }, 2000);
        }
    };
    const onOpenModal = (QP) => {
        setOpen(true);
        setSelectedQP(QP)
        console.log(QP._id)
        setNName(QP.name)
        setLink(QP.link)
        allSem()
        setSemesterPlaceholder(QP.semester.name)
        setSubjectPlaceholder(QP.subject.name)
        setSelectedSem(QP.semester._id)
        setSelectedSubject(QP.subject._id)

    }
    const onCloseModal = (QP) => {
        setOpen(false);
        setSelectedQP(null)
        setNName('')
        setLink('')
        setSemesterPlaceholder('')
        setSubjectPlaceholder('')
        setSelectedSem('')
        setSelectedSubject('')
    }
    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (QP) => {
        setOpenDelete(true);
        setSelectedQP(QP)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedQP(null)
    }
    const handleDelete =async (e) => {
        e.preventDefault();
        try {
            if (selectedQP._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-qp/${selectedQP._id}`);

                if (response.data.success) {
                    getQPs();
                    setQPList((prevQPList) =>
                        prevQPList.filter((QP) => QP._id !== selectedQP._id)
                    );
                    toast.success('QP deleted successfully !', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete QP', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
                onCloseDeleteModal();
            }
        } catch (error) {
            toast.error(error, {
                autoClose: 2000,
                position: 'bottom-center',
            });
        }


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [nName, link, selectedSubject, selectedSem];
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

        try {
            if (updateOrNot === 1) {
                const formData = new FormData();
                formData.append('name', nName);
                formData.append('link', link);
                formData.append('semester', selectedSem);
                formData.append('subject', selectedSubject);

                const response = await axios.put(`${urlBackend}/api/v1/update-qp/${selectedQP._id}`, formData);

                if (response.data.success) {
                    getQPs();
                    setQPList((prevQPList) =>
                        prevQPList.map((QP) => (QP._id === selectedQP._id ? response.data.updatedQP : QP))
                    );
                    toast.success('QP Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: 'bottom-center',
                    });

                    onCloseModal();
                } else {
                    toast.error('QP or Name is already exist', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    return (
        <div className='h-screen bg-blue-50'>
            <div className="w-[100%]  max-md:mt-2 md:flex flex-col justify-center  items-center">
                <div className=" px-2 flex  w-[100%] flex-row justify-between sticky top-0 p-2" style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                    <div className='w-[60%]'>
                        <button className='py-2 w-[60%]  max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={getQPs}>All Question Papers</button>
                    </div>
                    <form onSubmit={handleSearch} className='w-[100%] flex justify-center items-center max-lg:w-[100%] '>
                        <input type="text " className=' w-[100%] rounded-xl h-[40px] max-lg:h-[30px] bg-blue-50  px-4 focus:border-blue-400 focus:outline-none border' placeholder='Search Here ....' value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>
                <div className=" flex w-[100%] flex-row justify-between sticky top-0 p-2 gap-4 " >
                    <div className=" flex max-md:flex-col justify-center  items-center md:flex-row w-[100%]">
                        <label htmlFor="semesters" className='font-semibold text-xl max-md:text-[15px]'>
                            Select Semester:
                        </label>
                        <Select
                            id="semesters"
                            className="max-md:text-sm max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none"
                            placeholder='QP By Semester'
                            onChange={FilterBySemester}
                        >
                            {semesterList?.map((semester) => (
                                <Option key={semester._id} value={semester._id}>
                                    {semester.name}
                                </Option>
                            ))}

                        </Select>
                    </div>
                    <div className="flex max-md:flex-col justify-center  items-center md:flex-row w-[100%]">
                        <label htmlFor="semesters" className='font-semibold text-xl max-md:text-[15px] '>
                            Select Subject:
                        </label>
                        <Select
                            id="semesters"
                            className="max-md:text-sm max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none placeholder-blue-500 "
                            placeholder='QP By Subject'
                            onChange={FilterBySubject}
                        >
                            {
                                subjectList?.map((subject) => {
                                    return <Option key={subject._id} value={subject._id} >{subject.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                </div>
                {loader ? <div className='flex justify-center items-center mt-32'>
                    <BarLoader color="blue"
                    />
                </div>
                    :
                    <div className='md:w-[100%] px-2 pb-2'>
                        <div className='text-left overflow-y-auto max-h-[500px] max-xl:max-h-[460px] rounded-md w-[100%]'>
                        <table className='w-[100%] border-2  rounded-md '>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white border-2 border-slate-950'>
                                    <th className='  p-2 px-4'>SR.No</th>
                                    <th className='  p-2 px-4 '>Name</th>
                                    <th className='  p-2 px-4 ' >Semester</th>
                                    <th className='  p-2 px-4 '>Subject</th>
                                    <th className='  p-2 px-4'>QPs</th>
                                    <th className='  p-2 px-4'>Edit</th>
                                </tr>
                            </thead>
                            {QPList?.length === 0 ?
                                <tr className=''>
                                    <td className='p-2 px-4 w-24'></td>
                                    <td className='p-2 px-4 w-24'></td>
                                    <td className='p-2 px-4 w-44'>No Data Found</td>
                                    <td className='p-2 px-4 w-20'></td>
                                    <td className='p-2 px-4 w-20'></td>
                                    <td className='p-2 px-4 w-20'></td>
                                </tr>
                                :
                                <tbody className='bg-slate-800 text-white '>

                                    {QPList?.map((QP, index) => (
                                        <tr key={QP._id} className='border-2 border-gray-700'>
                                            <td className='  p-2 px-4'>{index + 1}</td>
                                            <td className='  p-2 px-4'>{QP.name}</td>
                                            <td className='  p-2 px-4'>{QP.semester.name}</td>
                                            <td className='  p-2 px-4'>{QP.subject.name}</td>
                                            <td className='  p-2 px-4' ><Link target="_blank" to={QP.link}>view</Link></td>

                                            <td className='  py-2 px-4'>
                                                <div className='flex flex-row gap-4 justify-left'>
                                                    <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(QP)} >Update</button>
                                                    <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(QP)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            }
                        </table>
                    </div>
                    </div>
                }
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>

                <div className='w-[100%] text-center  bg-white pb-10 mt-10'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Update Question Paper</h1>

                    <div className="mt-14 max-md:mt-5 flex max-md:flex-col justify-between  items-center md:flex-row px-12 ">
                        <label htmlFor="semesters" className='font-semibold text-xl'>
                            Select Semester:
                        </label>
                        <Select
                            id="semesters"
                            className="max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none"
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
                    <div className="mt-5 flex max-md:flex-col justify-between  items-center md:flex-row px-12">
                        <label htmlFor="semesters" className='font-semibold text-xl'>
                            Select Subject:
                        </label>
                        <Select
                            id="semesters"
                            className="max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none placeholder-blue-500"
                            defaultValue={subjectPlaceholder}
                            onChange={handleChangeSubject}
                        >
                            {
                                subjectList?.map((subject) => {
                                    return <Option key={subject._id} value={subject._id} >{subject.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <form className='mt-5 text-black' onSubmit={handleSubmit} >
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name'
                            onChange={(e) => setNName(e.target.value)} value={nName} />
                        <input type="url" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Link' onChange={(e) => setLink(e.target.value)} value={link} />

                        <br />
                        <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                            Update
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

export default ManageQP
