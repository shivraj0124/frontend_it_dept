import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify'
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
function ManageTimeTable() {
    const [timeTableList, setTimeTableList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedTimeTable, setSelectedTimeTable] = useState(null);
    const [selectedTimeTableId, setSelectedTimeTableId] = useState(null);//for delete record
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [link,setLink ] = useState('');
    
    const [loader, setLoader] = useState(true)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    useEffect(() => {
        // Fetch faculty details
        axios.get('http://localhost:3000/api/v1/get-timetables')
            .then((response) => {
                if (response.data.success) {
                    setTimeTableList(response.data.timeTable);
                } else {
                    console.error('Failed to fetch faculty details');
                }
                setLoader(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const onOpenModal = (timeTable) => {
        setOpen(true);
        setSelectedTimeTable(timeTable);
        // Set initial values for form fields based on the selected faculty
        setName(timeTable.name);
        setSubject(timeTable.subject);
        setLink(timeTable.link)
        
        // Clear the photo field
        

    };
    const onCloseModal = () => {
        setOpen(false);
        setSelectedTimeTable(null);
        // Clear form fields
        setName('');
        setSubject('');
        setLink('')
    };
    // const [updateOrNot, setUpdateOrNot] = useState(1)
    const updateFaculty = (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [name, subject,link];
        let countLoop = 0;
        arr.map((item, key) => {

            if (item.replace(/\s+/g, '') === '') {
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
            formData.append('name', name);
            formData.append('email', email.replace(/\s+/g, ''));
            formData.append('qualification', qualification);
            formData.append('post', post);
            formData.append('experience', experience);
            if (photo) {
                formData.append('photo', photo);
            }

            axios.put(`http://localhost:3000/api/v1/update-faculty/${selectedTimeTable._id}`, formData)
                .then((response) => {

                    if (response.data.success) {

                        // Update timeTableList with the updated faculty data
                        toast.success('Faculty Details Updated Successfully', {
                            autoClose: 2000,
                            closeButton: true,
                            position: "top-center"
                        })
                        setTimeTableList((prevTimeTableList) =>
                            prevTimeTableList.map((timeTable) =>
                                timeTable._id === selectedTimeTable._id ? response.data.updatedTimeTable : timeTable
                            )
                        );
                        onCloseModal();
                    } else {
                        toast.error('Email Already Exist',
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

    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (facultyId) => {
        setOpenDelete(true);
        setSelectedTimeTableId(facultyId)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedTimeTableId(null)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedTimeTableId._id) {
            axios.delete(`http://localhost:3000/api/v1/delete-faculty/${selectedTimeTableId._id}`)
                .then((response) => {
                    if (response.data.success) {
                        setTimeTableList((prevtimeTableList) =>
                            prevtimeTableList.filter(
                                (faculty) => faculty._id !== selectedTimeTableId._id
                            )
                        );
                        toast.success('Faculty deleted successfully !',
                            {
                                autoClose: 2000,
                                position: 'top-center'
                            })
                        // Remove the deleted faculty from the timeTableList

                    } else {
                        toast.error('Failed to delete faculty', {
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

    return (
        <div className='h-screen bg-blue-50'>
            <div className="w-100  mt-10 max-md:mt-2 md:flex justify-center max-xl:px-2 items-center">
                {loader ? <div className='flex flex-col justify-center  items-center'>
                    <BarLoader color="blue"

                    />
                </div>
                    :
                    <div className='text-center overflow-y-auto max-h-[600px]  rounded-md '>
                        <table className='w-max border-collapse rounded-md '>
                            <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white border-slate-950'>
                                    <th className='border border-gray-400  py-2 px-2'>SR.No</th>
                                    <th className='border border-gray-400 py-2 px-2'>Name</th>
                                    <th className='border border-gray-400 py-2 px-2'>Subject</th>
                                    <th className='border border-gray-400 py-2 px-2'>Notes</th>
                                    <th className='border border-gray-400 py-2 px-2'>Edit</th>
                                </tr>
                            </thead>
                            <tbody className='bg-slate-800 text-white '>
                                {timeTableList.map((timeTable, index) => (
                                    <tr key={timeTable._id}>
                                        <td className='border border-gray-400 py-2 px-2'>{index + 1}</td>
                                        <td className='border border-gray-400 py-2 px-2'>{timeTable.name}</td>
                                        <td className='border border-gray-400 py-2 px-2'>{timeTable.subject}</td>
                                        <td className='border border-gray-400 py-2 px-2'>{timeTable.link}</td>
                                                                               
                                        <td className='border border-gray-400 py-2 px-2'>
                                            <div className='flex flex-row gap-2 justify-center'>
                                                <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(timeTable)}>Update</button>
                                                <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(timeTable)}>Delete</button>
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
                <div className='w-[100%] text-center mt-5  bg-white md:p-10'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Update Faculty</h1>
                    <form className='mt-10 text-black' onSubmit={updateFaculty}>
                        <input
                            type="text"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='Qualification'
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                        />
                        <input
                            type="text"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='Post'
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                        <input
                            type="text"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='Teaching Experience'
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        />
                        <br />
                        <label className='border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5'>
                            <input type="file" name="photo" className='hidden' onChange={handleFileChange} />
                            Upload Photo
                        </label>
                        <br />
                        <button className='mt-10 w-[80%] bg-blue-800 rounded-lg py-2 text-xl max-md:text-sm text-white cursor-pointer hover:bg-blue-500' >
                            Update Faculty
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
    );
}

export default ManageTimeTable;
