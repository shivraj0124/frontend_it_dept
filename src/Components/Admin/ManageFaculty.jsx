import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
import no_data_found from '../../Images/no_data_found.png'
import {Link} from 'react-router-dom'
function ManageFaculty() {
    const [facultyList, setFacultyList] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);//for delete record
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [qualification, setQualification] = useState('');
    const [post, setPost] = useState('');
    const [experience, setExperience] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loader, setLoader] = useState(true)
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    useEffect(() => {
        // Fetch faculty details
        getAllFaculties()
    }, []);
    const getAllFaculties =async () => {
        setLoader(true)
        try {
            const response = await axios.get(`${urlBackend}/api/v1/manage-faculty`);

            if (response.data.success) {
                setFacultyList(response.data.faculties);
            } else {
                console.error('Failed to fetch faculty details');
            }

            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            const response = await axios.get(`${urlBackend}/api/v1/search-faculty`, {
                params: { search },
            });
            setFacultyList(response.data.faculties);
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
    const onOpenModal = (faculty) => {
        setOpen(true);
        setSelectedFaculty(faculty);
        // Set initial values for form fields based on the selected faculty
        setName(faculty.name);
        setEmail(faculty.email);
        setPhone(faculty.phone);
        setQualification(faculty.qualification);
        setPost(faculty.post);
        setExperience(faculty.experience);
        // Clear the photo field
        setPhoto(null);

    };
    const onCloseModal = () => {
        setOpen(false);
        setSelectedFaculty(null);
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setQualification('');
        setPost('');
        setExperience('');
        setPhoto(null);
    };
    // const [updateOrNot, setUpdateOrNot] = useState(1)
    const updateFaculty = async (e) => {
        e.preventDefault()
        let updateOrNot = 1;
        const arr = [name, email, phone, qualification, post, experience, photo];
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
                        toast.error('Name Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    } else if (index === 1) {
                        toast.error('Email Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    } else if (index === 2) {
                        toast.error('Phone Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    } else if (index === 3) {
                        toast.error('Qualification Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 4) {
                        toast.error('Post Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 5) {
                        toast.error('Experience Field must filled', {
                            autoClose: 1000,
                            position: 'bottom-center'
                        })
                    }
                    else if (index === 6) {
                        toast.error('Experience Field must filled', {
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
                formData.append('name', name);
                formData.append('email', email.replace(/\s+/g, ''));
                formData.append('phone', phone);
                formData.append('qualification', qualification);
                formData.append('post', post);
                formData.append('experience', experience);
                if (photo) {
                    formData.append('photo', photo);
                }

                const response = await axios.put(`${urlBackend}/api/v1/update-faculty/${selectedFaculty._id}`, formData);

                if (response.data.success) {
                    // Update facultyList with the updated faculty data
                    setFacultyList((prevFacultyList) =>
                        prevFacultyList.map((faculty) =>
                            faculty._id === selectedFaculty._id ? response.data.updatedFaculty : faculty
                        )
                    );
                    toast.success('Faculty Details Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: "bottom-center"
                    });
                    onCloseModal();
                } else {
                    toast.error('Email or phone Already Exist', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const [openDelete, setOpenDelete] = useState(false)
    const onOpenDeleteModal = (faculty) => {
        setOpenDelete(true);
        setSelectedFaculty(faculty)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedFaculty(null)
    }

    const handleDelete =async (e) => {
        e.preventDefault();
        console.log(selectedFaculty)
        try {
            if (selectedFaculty._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-faculty/${selectedFaculty._id}`);

                if (response.data.success) {
                    setFacultyList((prevFacultyList) =>
                        prevFacultyList.filter((faculty) => faculty._id !== selectedFaculty._id)
                    );
                    toast.success('Faculty deleted successfully !', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete faculty', {
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

    return (
        <div className='h-screen bg-blue-50'>
            <div className="w-100  max-md:mt-2 md:flex flex-col justify-center  items-center pb-20">
                <div className=" px-2 flex  w-[100%] flex-row justify-between sticky top-0 p-2" style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                    <div className='w-[60%]'>
                        <button className='py-2 w-[60%]  max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={getAllFaculties}>All Faculties</button>
                    </div>
                    <form onSubmit={handleSearch} className='w-[100%] flex justify-center items-center max-lg:w-[100%] '>
                        <input type="text " className=' w-[100%] rounded-xl h-[40px] max-lg:h-[30px] bg-blue-50  px-4 focus:border-blue-400 focus:outline-none border' placeholder='Search Here ....' value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>
                {loader ? (
                    <div className="flex justify-center items-center mt-32">
                        <BarLoader color="blue" />
                    </div>
                ) : (
                        <div className='md:w-[100%] px-2'>
                        <div className='text-left overflow-y-auto max-xl:max-h-[400px] max-h-[500px] rounded-md  md:w-[100%]  overflow-x-auto mt-10 '>
                            <table className='w-[100%] border-collapse rounded-md'>
                                <thead className='sticky top-0  '>
                                    <tr className='bg-slate-950 text-white border-slate-950 rounded-md'>
                                        <th className='   py-2 px-3 max-md:text-sm'>SR.No</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Name</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Email</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>phone</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Post</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Qualification</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Experience</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Photo</th>
                                        <th className='  py-2 px-3 max-md:text-sm'>Edit</th>
                                    </tr>
                                </thead>
                                {!loader && facultyList?.length <= 0 ?
                                    <tr className='rounded-md border-2'>
                                        <td className='p-2 px-3 w-20'></td>
                                        <td className='p-2 px-3 w-20'></td>
                                        <td className='p-2 px-3 w-10'></td>
                                        <td className='p-2 px-3 w-10'></td>
                                        <td className='p-6 px-3 md:w-44 font-semibold'>No Data Found</td>
                                            <td className='p-2 px-3 w-10 '></td>
                                            <td className='p-2 w-10'></td>
                                            <td className='p-2 px-3 w-10'></td>
                                            <td className='p-2 px-3 w-10'></td>
                                    </tr>
                                    :
                                    <tbody className='bg-slate-800 text-white rounded-md '>
                                        {facultyList?.map((faculty, index) => (
                                            <tr key={faculty._id} className='border-b-2 border-gray-500 rounded-md'>
                                                <td className='  py-2 px-3'>{index + 1}</td>
                                                <td className='  py-2 px-3'>{faculty.name}</td>
                                                <td className='  py-2 px-3 text-blue-400' target='_blank' ><a href={`mailto:${faculty.email}`}>{faculty.email}</a></td>
                                                <td className='  py-2 px-3'>{faculty.phone}</td>
                                                <td className='  py-2 px-3'>{faculty.post}</td>
                                                <td className='  py-2 px-3'>{faculty.qualification}</td>
                                                <td className='  py-2 px-3'>{faculty.experience}</td>
                                                <td className=' '>
                                                    <Link to={faculty.photo} target='_blank'><img className='w-[100px] h-[100px]' src={faculty.photo} alt="" /></Link>
                                                </td>
                                                <td className='  py-2 px-2'>
                                                    <div className='flex flex-row gap-2 justify-center'>
                                                        <button className='text-white font-semibold  bg-green-700 py-1 px-2 rounded-md' onClick={() => onOpenModal(faculty)}>Update</button>
                                                        <button className='text-white font-semibold bg-red-700  py-1 px-2 rounded-md' onClick={() => onOpenDeleteModal(faculty)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                }
                            </table>
                        </div>
                    </div>)
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
                            type="number"
                            className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2'
                            placeholder='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

export default ManageFaculty;
