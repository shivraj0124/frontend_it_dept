import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {toast} from 'react-toastify'
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
import {Link} from 'react-router-dom'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions';
function ManageNotes() {
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
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedSubject('');
        allSubjects(value);
    };
    const handleChangeSubject = (value) => {
        setSelectedSubject(value);
        console.log(value);
    }
    const allSubjects = (selectedSemesterId) => {
        axios.get(`http://localhost:3000/api/v1/subjects/${selectedSemesterId}`).then((response) => {
            if (response.data.success) {
                setSubjectList(response.data.subjects);
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
       getNotes()
    }, [])
        const getNotes=()=>{
        axios.get('http://localhost:3000/api/v1/get-notes').then((response) => {
            if (response.data.success) {
                setNotesList(response.data.notes);
                console.log(response.data.notes)

            } else {
                console.error('Failed to fetch Time Table details');
            }
            setLoader(false)
        })
            .catch((error) => {
                console.error('Error:', error);
            });
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
    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedNote._id) {
            axios.delete(`http://localhost:3000/api/v1/delete-note/${selectedNote._id}`)
                .then((response) => {
                    if (response.data.success) {
                        getNotes()
                        setNotesList((prevNoteList) =>
                            prevNoteList.filter(
                                (note) => note._id !== selectedNote._id
                            )
                        );
                        toast.success('Note deleted successfully !',
                            {
                                autoClose: 2000,
                                position: 'top-center'
                            })
                    } else {
                        toast.error('Failed to delete note', {
                            autoClose: 2000,
                            position: 'top-center'
                        });
                    }
                    onCloseDeleteModal();
                })
                .catch((error) => {
                    toast.error(error, {
                        autoClose: 2000,
                        position: 'top-center'
                    });
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
                        position: 'top-center'
                    })
            }
        })

        if (updateOrNot === 1) {
            const formData = new FormData();
            formData.append('name', nName);
            formData.append('link', link);
            formData.append('semester', selectedSem);
            formData.append('subject', selectedSubject);


            axios.put(`http://localhost:3000/api/v1/update-note/${selectedNote._id}`, formData)
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
                            position: "top-center"
                        })
                        
                        onCloseModal();
                    } else {
                        toast.error('Note or Name is already exist',
                            {
                                autoClose: 2000,
                                position: 'top-center'
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
            <div className="w-100  mt-10 max-md:mt-2 md:flex justify-center max-xl:px-2 items-center">
                {loader ? <div className='flex flex-col justify-center  items-center'>
                    <BarLoader color="blue"

                    />
                </div>
                    :
                    <div className='text-center overflow-y-auto max-h-[600px]  rounded-md '>
                        <table className='w-max border-2 rounded-md '>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white border-2 border-slate-950'>
                                    <th className='   py-2 px-2'>SR.No</th>
                                    <th className='  py-2 px-2'>Name</th>
                                    <th className='  py-2 px-2'>Semester</th>
                                    <th className='  py-2 px-2'>Subject</th>
                                    <th className='  py-2 px-2'>Notes</th>
                                    <th className='  py-2 px-2'>Edit</th>
                                </tr>
                            </thead>
                            <tbody className='bg-slate-800 text-white '>
                                {notesList.map((note, index) => (
                                    <tr key={note._id} className='border-2 border-gray-700'>
                                        <td className='  py-2 px-2'>{index + 1}</td>
                                        <td className='  py-2 px-2'>{note.name}</td>
                                        <td className='  py-2 px-2'>{note.semester.name}</td>
                                        <td className='  py-2 px-2'>{note.subject.name}</td>
                                        <td className='  py-2 px-2' ><Link target="_blank" to={note.link}>view</Link></td>

                                        <td className='  py-2 px-2'>
                                            <div className='flex flex-row gap-2 justify-center'>
                                                <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(note)} >Update</button>
                                                <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(note)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
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
                            {semesterList.map((semester) => (
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
                                subjectList.map((subject) => {
                                    return <Option key={subject._id} value={subject._id} >{subject.name}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <form className='mt-5 text-black' onSubmit={handleSubmit} >
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name'
                            onChange={(e) => setNName(e.target.value)} value={nName} />
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Link' onChange={(e) => setLink(e.target.value)} value={link} />

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

export default ManageNotes
