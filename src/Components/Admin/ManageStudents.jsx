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
function ManageStudents() {
    const [open, setOpen] = useState(false);
    const [studentList, setStudentList] = useState([])
    const [loader, setLoader] = useState(true)
    const [selectedStudent, setSelectedStudent] = useState(null)

    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('')
    const [studentName, setStudentName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [enrNo, setEnrNo] = useState('');
    const [phone, setPhone] = useState('');
    const [shiftPlaceholder, setShiftPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')

    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };
    const handleChangeShift = (value) => {
        setSelectedShift(value);
        console.log(value);
    }
    const allShifts = (selectedSemesterId) => {
        axios.get(`http://localhost:3000/api/v1/get-shifts/${selectedSemesterId}`).then((response) => {
            if (response.data.success) {
                setShiftList(response.data.shifts);
            } else {
                console.error('Failed to Fetch Subjects');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    const allSem = () => {
        axios.get('http://localhost:3000/api/v1/get-semesters').then((response) => {
            if (response.data.success) {
                setSemesterList(response.data.semesters);
            } else {
                console.error('Failed to Fetch Semesters');
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    };
    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = () => {
        axios.get('http://localhost:3000/api/v1/get-students').then((response) => {
            if (response.data.success) {
                console.log(response.data.students)
                setStudentList(response.data.students);

            } else {
                console.error('Failed to fetch Students details');
            }
            setLoader(false)
        })
            .catch((error) => {
                console.error('Error:', error);
                setLoader(false)
            });
    }

    const onOpenModal = (student) => {
        setOpen(true);
        setSelectedStudent(student)
        console.log(student._id)
        setStudentName(student.name)
        setEmail(student.email)
        setEnrNo(student.EnrNo)
        setPhone(student.phone)
        allSem()
        setSemesterPlaceholder(student.semester.name)
        setShiftPlaceholder(student.shift.name)
        setSelectedSem(student.semester._id)
        setSelectedShift(student.shift._id)

    }
    const onCloseModal = () => {
        setOpen(false);
        setSelectedStudent(null)
        setStudentName('')
        setEmail('')
        setEnrNo('')
        setPhone('')
        setSemesterPlaceholder('')
        setShiftPlaceholder('')
        setSelectedSem('')
        setSelectedShift('')
    }
    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (student) => {
        setOpenDelete(true);
        setSelectedStudent(student)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedStudent(null)
    }
    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedStudent._id) {
            axios.delete(`http://localhost:3000/api/v1/delete-student/${selectedStudent._id}`)
                .then((response) => {
                    if (response.data.success) {
                        getStudents()
                        setStudentList((prevStudentList) =>
                            prevStudentList.filter(
                                (student) => student._id !== selectedStudent._id
                            )
                        );
                        toast.success(`${selectedStudent.EnrNo} deleted successfully !`,
                            {
                                autoClose: 2000,
                                position: 'bottom-center'
                            })
                    } else {
                        toast.error('Failed to delete Time Table', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        });
                    }
                    onCloseDeleteModal();
                })
                .catch((error) => {
                    toast.error(error, {
                        autoClose: 2000,
                        position: 'bottom-center'
                    });
                });
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [studentName, email, enrNo, phone, selectedSem, selectedShift];
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
                // setupdateOrNot(0)
                updateOrNot = 0
                if (countLoop <= 1) {

                    if (index === 0) {
                        toast.error('Name Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 1) {
                        toast.error('Email Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    } else if (index === 2) {
                        toast.error('EnrNo Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 3) {
                        toast.error('Phone Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 4) {
                        toast.error('Semester Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    } else if (index === 5) {
                        toast.error('Shift Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                }
            }
        })


        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('name', studentName);
            formData.append('email', email);
            formData.append('EnrNo', enrNo);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('semester', selectedSem);
            formData.append('shift', selectedShift);
            axios.put(`http://localhost:3000/api/v1/update-student/${selectedStudent._id}`, formData)
                .then((response) => {

                    if (response.data.success) {
                        getStudents()
                        // Update facultyList with the updated faculty data
                        setStudentList((prevStudentList) =>
                            prevStudentList.map((student) =>
                                student._id === selectedStudent ? response.data.student : student
                            )
                        );
                        toast.success(`${selectedStudent.EnrNo} Updated Successfully`, {
                            autoClose: 2000,
                            closeButton: true,
                            position: "bottom-center"
                        })

                        onCloseModal();
                    } else {
                        toast.error('Student is Already exist',
                            {
                                autoClose: 2000,
                                position: 'bottom-center'
                            }
                        );
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
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
                    <div className='text-left overflow-y-auto max-h-[500px]  rounded-md md:w-[98%] p-0 '>
                        <table className='w-[100%] border-2 border-slate-950  border-collapse  rounded-md m-0'>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white text-lg font-semibold'>
                                    <th className='py-2 px-4'>SR.No</th>
                                    <th className='py-2 px-4 '>Name</th>
                                    <th className='py-2 px-4 '>Email</th>
                                    <th className='py-2  px-4'>Enrollment No</th>
                                    <th className='py-2 px-4 '>Phone</th>
                                    <th className='py-2 px-4 ' >Semester</th>
                                    <th className='py-2 px-4 '>Shift</th>

                                    <th className='py-2 px-4'>Edit</th>
                                </tr>
                            </thead>
                            {studentList?.length === 0 ?
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

                                    {studentList?.map((student, index) => (
                                        <tr key={student._id} className=''>
                                            <td className='py-2 px-4'>{index + 1}</td>
                                            <td className='py-2 px-4'>{student.name}</td>
                                            <td className='py-2 px-4' >{student.email}</td>
                                            <td className='py-2 px-4' >{student.EnrNo}</td>
                                            <td className='py-2 px-4' >{student.phone}</td>
                                            <td className='py-2 px-4'>{student.semester.name}</td>
                                            <td className='py-2 px-4'>{student.shift.name}</td>
                                            <td className='  py-2 px-4'>
                                                <div className='flex flex-row gap-2 justify-left'>
                                                    <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(student)}  >Update</button>
                                                    <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(student)} >Delete</button>
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

                <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse p-3 bg-white  rounded-md">
                    <div className='w-[100%] text-center mt-5  bg-white pb-2'>
                        <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Student</h1>
                        <form className='mt-2 text-black' onSubmit={handleUpdate}>
                            <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name' onChange={(e) => setStudentName(e.target.value)} value={studentName} required />
                            <input type="email" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Enrollment No' onChange={(e) => setEnrNo(e.target.value)} value={enrNo} required />

                            <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='phone' onChange={(e) => setPhone(e.target.value)} value={phone} required />
                            <div className='flex flex-col justify-center px-20'>
                                <div className='mt-2 flex max-md:flex-col justify-between  items-center md:flex-row  '>
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
                                        {semesterList?.map((semester) => (
                                            <Option key={semester._id} value={semester._id}>
                                                {semester.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='mt-2 flex max-md:flex-col justify-between  items-center md:flex-row  '>
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
                                        {shiftList?.map((shift) => (
                                            <Option key={shift._id} value={shift._id}>
                                                {shift.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <br />
                            <button className='mt-2 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                                Update Student
                            </button>
                        </form>
                    </div>
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

export default ManageStudents
