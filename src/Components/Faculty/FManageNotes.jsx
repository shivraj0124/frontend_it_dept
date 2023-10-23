import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import '../Admin/AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
import { Link } from 'react-router-dom'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
import themeHook from '../Admin/ContextP'
function FManageNotes() {
    const [open, setOpen] = useState(false);
    const [notesList, setNotesList] = useState('')
    const [loader, setLoader] = useState(true)
    const [selectedNote, setSelectedNote] = useState(null)

    const [semesterList, setSemesterList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('')
    const [nName, setNName] = useState('')
    const [link, setLink] = useState('')
    const [subjectPlaceholder, setSubjectPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const {auth}=themeHook()
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedSubject('');
        allSubjects(value);
    };
    const handleChangeSubject = (value) => {
        setSelectedSubject(value);
        console.log(value);
    }
    const allSubjects =async (selectedSemesterId) => {
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
        getNotes()
    }, [])
    const getNotes =async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v4/get-notes/${auth?.user?.phone}`);

            if (response.data.success) {
                setNotesList(response.data.notes);
                console.log(response.data.notes);
            } else {
                console.error('Failed to fetch Time Table details');
            }

            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const onOpenModal = (note) => {
        setOpen(true);
        setSelectedNote(note)
        setNName(note.name)
        setLink(note.link)
        allSem()
        setSemesterPlaceholder(note.semester.name)
        setSubjectPlaceholder(note.subject.name)
        setSelectedSem(note.semester._id)
        setSelectedSubject(note.subject._id)

    }
    const onCloseModal = (note) => {
        setOpen(false);
        setSelectedNote(null)
        setNName('')
        setLink('')
        setSemesterPlaceholder('')
        setSubjectPlaceholder('')
        setSelectedSem('')
        setSelectedSubject('')
    }
    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (note) => {
        setOpenDelete(true);
        setSelectedNote(note)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedNote(null)
    }
    const handleDelete =async (e) => {
        e.preventDefault();
        try {
            if (selectedNote._id) {
                const response = await axios.delete(`${urlBackend}/api/v4/delete-note/${selectedNote._id}`);

                if (response.data.success) {
                    getNotes();
                    setNotesList((prevNoteList) =>
                        prevNoteList.filter((note) => note._id !== selectedNote._id)
                    );
                    toast.success('Note deleted successfully!', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete note', {
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

        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('name', nName);
            formData.append('link', link);
            formData.append('semester', selectedSem);
            formData.append('subject', selectedSubject);


            axios.put(`${urlBackend}/api/v4/update-note/${selectedNote._id}`, formData)
                .then((response) => {

                    if (response.data.success) {
                        getNotes()
                        // Update facultyList with the updated faculty data
                        setNotesList((prevNoteList) =>
                            prevNoteList.map((note) =>
                                note._id === selectedNote._id ? response.data.updatedNote : note
                            )
                        );
                        toast.success('Note Updated Successfully', {
                            autoClose: 2000,
                            closeButton: true,
                            position: "bottom-center"
                        })

                        onCloseModal();
                    } else {
                        toast.error('Note or Name is already exist',
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
            <div className="w-[100%]  mt-10 max-md:mt-2 flex justify-center items-center">
                {loader ? <div className='flex justify-center items-center mt-32'>
                    <BarLoader color="blue"

                    />
                </div>
                    :
                    <div className='text-left overflow-y-auto max-h-[500px]  rounded-md w-[100%] px-2'>
                        <table className='w-[100%] border-2 rounded-md '>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-lg text-white border-2 border-slate-950'>
                                    <th className='   py-2 px-4'>SR.No</th>
                                    <th className='  py-2 px-4'>Name</th>
                                    <th className='  py-2 px-4'>Semester</th>
                                    <th className='  py-2 px-4'>Subject</th>
                                    <th className='  py-2 px-4'>Notes</th>
                                    <th className='  py-2 px-4'>Edit</th>
                                </tr>
                            </thead>

                            {notesList?.length === 0 ?
                                <tr className=''>
                                    <td className='p-2 w-24'></td>
                                    <td className='p-2 w-24'></td>
                                    <td className='p-6 w-44 font-semibold'>No Data Found</td>
                                    <td className='p-2 w-20'></td>
                                    <td className='p-2 w-20'></td>
                                    <td className='p-2 w-20'></td>
                                </tr>
                                :

                                <tbody className='bg-slate-800 text-white '>
                                    {notesList?.map((note, index) => (
                                        <tr key={note._id} className='border-2 border-gray-700'>
                                            <td className='  py-2 px-4'>{index + 1}</td>
                                            <td className='  py-2 px-4'>{note.name}</td>
                                            <td className='  py-2 px-4'>{note.semester.name}</td>
                                            <td className='  py-2 px-4'>{note.subject.name}</td>
                                            <td className='  py-2 px-4' ><Link target="_blank" to={note.link}>view</Link></td>

                                            <td className='  py-2 px-4'>
                                                <div className='flex flex-row gap-4 justify-left'>
                                                    <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(note)} >Update</button>
                                                    <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(note)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                    </div>
                }
            </div>

            <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>

                <div className='w-[100%] text-center  bg-white pb-10 mt-10'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Notes</h1>

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
                            Upload
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

export default FManageNotes
