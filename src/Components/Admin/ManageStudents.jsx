import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
function ManageStudents() {
    const [open, setOpen] = useState(false);
    const [studentList, setStudentList] = useState([])
    const [loader, setLoader] = useState(true)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [search, setSearch] = useState('')
    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('')
    const [studentName, setStudentName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [EnrollmentNo, setEnrollmentNo] = useState('');
    const [phone, setPhone] = useState('');
    const [shiftPlaceholder, setShiftPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const [count,setCount]=useState(false)
   
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };
    const handleChangeShift = (value) => {
        setSelectedShift(value);
    }
    const FilterBySemester = (value) => {
        getStudentsBySemester(value)
        allShifts(value);
    }
    const FilterByShift = (value) => {
        getStudentsByShift(value)
    }
    const allShifts =async (selectedSemesterId) => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-shifts/${selectedSemesterId}`);

            if (response.data.success) {
                setShiftList(response.data.shifts);
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
    function sortDataByEnrollmentNo(studentList, ascending = true) {
        const newSortedStudents = [...studentList].sort((a, b) => {
            return ascending
                ? a.EnrollmentNo.localeCompare(b.EnrollmentNo)
                : b.EnrollmentNo.localeCompare(a.EnrollmentNo);
        });
        setStudentList(newSortedStudents);
    }
    useEffect(() => {
        getStudents()
        allSem()
        
    }, [])

    const getStudents =async () => {
       
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-students-data`);

            if (response.data.success) {
                console.log(response.data.students);
                setStudentList(response.data.students);
                sortDataByEnrollmentNo(response.data.students)
            } else {
                console.error('Failed to fetch Students details');
            }
           
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
            setLoader(false);
        }

    }
    const getStudentsBySemester =async (value) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-students-by-semester/${value}`);

            if (response.data.success) {
                setStudentList(response.data.students);
                setLoader(false);
                console.log(response.data.students);
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
    const getStudentsByShift =async (value) => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-students-by-shift/${value}`);

            if (response.data.success) {
                setStudentList(response.data.students);
                setLoader(false);
                // console.log(subjectId);
                // console.log(response.data.students);
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
            const response = await axios.get(`${urlBackend}/api/v1/search-student`, {
                params: { search },
            });
            setStudentList(response.data.students);
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

    const onOpenModal = (student) => {
        setOpen(true);
        setSelectedStudent(student)
        // console.log(student._id)
        setStudentName(student.Name)
        setEmail(student.Email)
        setEnrollmentNo(student.EnrollmentNo)
        setPhone(student.Phone)
        allSem()
        setSemesterPlaceholder(student.Semester.name)
        setShiftPlaceholder(student.Shift.name)
        setSelectedSem(student.Semester._id)
        setSelectedShift(student.Shift._id)
    }

    const onCloseModal = () => {
        setOpen(false);
        setSelectedStudent(null)
        setStudentName('')
        setEmail('')
        setEnrollmentNo('')
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
    const [openSemUpdateModal, setOpenSemUpdateModal] = useState(false)
    const [currentSemesterId, setCurrentSemesterId]=useState('')
    const [currentShiftId, setCurrentShiftId]=useState('')
    const [newSemesterId, setNewSemesterId]=useState('')
    const [newShiftId,setNewShiftId]=useState('')
    const openUpdateSemModal = () => {
        setOpenSemUpdateModal(true)
        allSem()
    }
    const closeUpdateSemModal = () => {
        setOpenSemUpdateModal(false)
    }
    const currentSemChange=(value)=>{
        allShifts(value)
        setCurrentSemesterId(value)

    }
    const currentShiftChange=(value)=>{
        setCurrentShiftId(value)
    }
    const newSemesterChange = (value) => {
        allShifts(value)
        setNewSemesterId(value)

    }
    const newShiftChange =(value)=>{
        setNewShiftId(value)
    }
    const handleChangeSemesterOfStudent=async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`${urlBackend}/api/v1/update-students-semester`, {
                currentSemesterId,
                currentShiftId,
                newSemesterId,
                newShiftId,
            });

            if (response.data.success) {
                getStudents()
                toast.success('Students updated successfully.');
                closeUpdateSemModal()

            } else {
                toast.error('Error updating students.');
            }
        } catch (error) {
            console.error('Error:', error);
            
        }
    }
    const handleDelete =async (e) => {
        e.preventDefault();
        try {
            if (selectedStudent._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-student/${selectedStudent._id}`);
                if (response.data.success) {
                    getStudents();
                    setStudentList((prevStudentList) =>
                        prevStudentList.filter(
                            (student) => student._id !== selectedStudent._id
                        )
                    );
                    toast.success(`${selectedStudent.EnrollmentNo} deleted successfully !`, {
                        autoClose: 2000,
                        position: 'bottom-center'
                    });
                } else {
                    toast.error('Failed to delete Student', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    });
                }
                onCloseDeleteModal();
            }
        } catch (error) {
            toast.error(error, {
                autoClose: 2000,
                position: 'bottom-center'
            });
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [studentName, email, EnrollmentNo, phone, selectedSem, selectedShift];
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
                        toast.error('EnrollmentNo Field must filled', {
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


        try {
            if (updateOrNot === 1) {
                const formData = new FormData();
                formData.append('Name', studentName);
                formData.append('Email', email);
                formData.append('EnrollmentNo', EnrollmentNo);
                formData.append('Password', password);
                formData.append('Phone', phone);
                formData.append('Semester', selectedSem);
                formData.append('Shift', selectedShift);

                const response = await axios.put(
                    `${urlBackend}/api/v1/update-student/${selectedStudent._id}`,
                    formData
                );

                if (response.data.success) {
                    getStudents();
                    setStudentList((prevStudentList) =>
                        prevStudentList.map((student) =>
                            student._id === selectedStudent ? response.data.student : student
                        )
                    );
                    toast.success(`${selectedStudent.EnrollmentNo} Updated Successfully`, {
                        autoClose: 2000,
                        closeButton: true,
                        position: 'bottom-center'
                    });

                    onCloseModal();
                } else {
                    toast.error('Student is Already exist', {
                        autoClose: 2000,
                        position: 'bottom-center'
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className='h-screen bg-blue-50'>
            <div className="w-[100%] md:flex flex-col justify-center  items-center">
                <div className=" flex  w-[100%] min-[600px]:flex-row max-sm:flex-col justify-between sticky top-0 p-2 gap-4" style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                    <div className='flex flex-row justify-between gap-x-1'>
                        <div className='w-max'>
                            <button className='py-2 w-max px-4 max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={getStudents}>All Students</button>
                        </div>
                        <div className='w-max'>
                            <button className='py-2 w-max px-4  max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={openUpdateSemModal}>Update Students Semester</button>
                        </div>
                       
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
                            placeholder='Students By Semester'
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
                            Select Shift:
                        </label>
                        <Select
                            id="semesters"
                            className="max-md:text-sm max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none placeholder-blue-500 "
                            placeholder='Students By Shift'
                            onChange={FilterByShift}
                        >
                            {
                                shiftList?.map((shift) => {
                                    return <Option key={shift._id} value={shift._id} >{shift.name}</Option>
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
                    <div className='md:w-[100%] px-2'>
                        <div className='text-left overflow-y-auto max-h-[480px] max-xl:max-h-[460px] rounded-md w-[100%]'>
                            <table className='w-[100%]  rounded-md '>
                                <thead className='sticky top-0 '>
                                    <tr className='bg-slate-950 text-white text-lg font-semibold'>
                                        <th className='py-2 px-4'>SR.No</th>
                                        <th className='py-2  px-4'>Enrollment No</th>
                                        <th className='py-2 px-4 '>Name</th>
                                        <th className='py-2 px-4 '>Email</th>
                                        <th className='py-2 px-4 '>Phone</th>
                                        <th className='py-2 px-4 ' >Semester</th>
                                        <th className='py-2 px-4 '>Shift</th>

                                        <th className='py-2 px-4'>Edit</th>
                                    </tr>
                                </thead>
                                {studentList?.length === 0 ?
                                    <tr className=''>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-44'>No Data Found</td>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-10'></td>
                                        <td className='py-2 px-4 w-10'></td>
                                    </tr>
                                    :
                                    <tbody className='bg-slate-800 text-white '>
                                        {studentList?.map((student, index) => (
                                            <tr key={student._id} className=''>
                                                <td className='py-2 px-4'>{index + 1}</td>
                                                <td className='py-2 px-4' >{student.EnrollmentNo}</td>
                                                <td className='py-2 px-4'>{student.Name}</td>
                                                <td className='py-2 px-4 text-blue-400' target='_blank' ><a href={`mailto:${student.Email}`} >{student.Email}</a></td>
                                                <td className='py-2 px-4' >{student.Phone}</td>
                                                <td className='py-2 px-4'>{student.Semester.name}</td>
                                                <td className='py-2 px-4'>{student.Shift.name}</td>
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
                            <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Enrollment No' onChange={(e) => setEnrollmentNo(e.target.value)} value={EnrollmentNo} required />

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
            <Modal open={openSemUpdateModal} onClose={closeUpdateSemModal} center classNames={{ modal: 'updateModal' }}>
                <div className="w-[100%] flex flex-col max-md:flex-col p-3 justify-center items-center bg-white  rounded-md">
                    <div>
                        <h1 className='text-lg font-bold text-center'>Update Semester of All Students</h1>
                        <p className='max-md:text-sm text-lg mt-2'>
                            First select the current semester and shift of students you have to change,
                            Then Select the new semester and shift which you want

                        </p>
                    </div>
                        <h1 className='text-blue-700 mt-2 text-xl'>Select Current Semester and Shift</h1>    
                    <div className='flex flex-col w-[100%] md:w-[80%] md:gap-2 mt-2'>
                        <div className=" flex max-md:flex-col justify-between  items-center md:flex-row ">
                            <label htmlFor="semesters" className='font-semibold text-lg max-md:text-[15px] w-max'>
                                Select Semester:
                            </label>
                            <Select
                                id="semesters"
                                className="max-md:text-sm w-[80%] md:w-[60%] font-semibold md:ml-3 focus:outline-none"
                                placeholder='Select Semester'
                                onChange={currentSemChange}
                            >
                                {semesterList?.map((semester) => (
                                    <Option key={semester._id} value={semester._id}>
                                        {semester.name}
                                    </Option>
                                ))}

                            </Select>
                        </div>
                        <div className="flex max-md:flex-col justify-between  items-center md:flex-row ">
                            <label htmlFor="semesters" className='font-semibold text-lg max-md:text-[15px] w-max'>
                                Select Shift:
                            </label>
                            <Select
                                id="semesters"
                                className="max-md:text-sm w-[80%] md:w-[60%] font-semibold md:ml-3 focus:outline-none placeholder-blue-500 "
                                placeholder='Select Shift'
                                onChange={currentShiftChange}
                            >
                                {
                                    shiftList?.map((shift) => {
                                        return <Option key={shift._id} value={shift._id} >{shift.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                        <h1 className='text-center text-blue-700 text-xl mt-2'>Select New Semester and Shift</h1>
                    <div className='flex flex-col w-[100%] md:w-[80%] md:gap-2 mt-2'>
                        <div className=" flex max-md:flex-col justify-between items-center md:flex-row ">
                            <label htmlFor="semesters" className='font-semibold text-lg max-md:text-[15px] max'>
                                Select Semester:
                            </label>
                            <Select
                                id="semesters"
                                className="max-md:text-sm w-[80%] md:w-[60%] font-semibold md:ml-3 focus:outline-none"
                                placeholder='Select Semester'
                                onChange={newSemesterChange}
                            >
                                {semesterList?.map((semester) => (
                                    <Option key={semester._id} value={semester._id}>
                                        {semester.name}
                                    </Option>
                                ))}

                            </Select>
                        </div>
                        <div className="flex max-md:flex-col justify-between  items-center md:flex-row">
                            <label htmlFor="semesters" className='font-semibold text-lg max-md:text-[15px] w-max'>
                                Select Shift:
                            </label>
                            <Select
                                id="semesters"
                                className="max-md:text-sm w-[80%] md:w-[60%] font-semibold md:ml-3 focus:outline-none placeholder-blue-500 "
                                placeholder='Select Shift'
                                onChange={newShiftChange}
                            >
                                {
                                    shiftList?.map((shift) => {
                                        return <Option key={shift._id} value={shift._id} >{shift.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                    <form onSubmit={handleChangeSemesterOfStudent} className='flex justify-center items-center'>
                        <button type="submit" className='mt-4 bg-blue-700 text-white py-2 px-4 rounded-md'>Update Student Semester</button>
                    </form>
                </div>
            </Modal>

        </div>
    )
}

export default ManageStudents
