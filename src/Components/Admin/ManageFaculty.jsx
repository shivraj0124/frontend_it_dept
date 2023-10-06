import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from 'react-toastify'
import './AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader'
function ManageFaculty() {
    const [facultyList, setFacultyList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedFacultyId, setSelectedFacultyId] = useState(null);//for delete record
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [qualification, setQualification] = useState('');
    const [post, setPost] = useState('');
    const [experience, setExperience] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loader, setLoader] = useState(true)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    useEffect(() => {
        // Fetch faculty details
        axios.get('http://localhost:3000/api/v1/manage-faculty')
            .then((response) => {
                if (response.data.success) {
                    setFacultyList(response.data.faculties);
                } else {
                    console.error('Failed to fetch faculty details');
                }
                setLoader(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const onOpenModal = (faculty) => {
        setOpen(true);
        setSelectedFaculty(faculty);
        // Set initial values for form fields based on the selected faculty
        setName(faculty.name);
        setEmail(faculty.email);
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
        setQualification('');
        setPost('');
        setExperience('');
        setPhoto(null);
    };
    // const [updateOrNot, setUpdateOrNot] = useState(1)
    const updateFaculty = (e) => {
        e.preventDefault();
        let updateOrNot=1;
        const arr = [name, email, qualification, post, experience];
        let countLoop=0;
        arr.map((item, key) => {
            
            if (item.replace(/\s+/g, '') === '') {
                countLoop += 1
                // setUpdateOrNot(0)
                updateOrNot=0
                if(countLoop <= 1)
                toast.error('Every Field must filled',{
                    autoClose:2000,
                    position:'top-center'
                })
                
            }
        })
        if(updateOrNot===1) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email.replace(/\s+/g, ''));
            formData.append('qualification', qualification);
            formData.append('post', post);
            formData.append('experience', experience);
            if (photo) {
                formData.append('photo', photo);
            }

            axios.put(`http://localhost:3000/api/v1/update-faculty/${selectedFaculty._id}`, formData)
                .then((response) => {
                    
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
                            position: "top-center"
                        })
                        
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
        setSelectedFacultyId(facultyId)
    }
    const onCloseDeleteModal = () => {
        setOpenDelete(false)
        setSelectedFacultyId(null)
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (selectedFacultyId._id) {
            axios.delete(`http://localhost:3000/api/v1/delete-faculty/${selectedFacultyId._id}`)
                .then((response) => {
                    if (response.data.success) {
                        setFacultyList((prevFacultyList) =>
                            prevFacultyList.filter(
                                (faculty) => faculty._id !== selectedFacultyId._id
                            )
                        );
                        toast.success('Faculty deleted successfully !',
                            {
                                autoClose: 2000,
                                position: 'top-center'
                            })
                        // Remove the deleted faculty from the facultyList
                        
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
            <div className="w-100  mt-10 max-md:mt-2 md:flex justify-center max-xl:px-2 items-center pb-20">
                {loader ? <div className='flex flex-col justify-center  items-center'>
                    <BarLoader color="blue"

                    />
                </div>
                    :
                    <div className='text-center overflow-y-auto max-xl:max-h-[500px] max-h-[600px] rounded-md '>
                        <table className='w-max border-collapse rounded-md '>
                        <thead className='sticky top-0 '>
                                <tr className='bg-slate-950 text-white border-slate-950'>
                                <th className='   py-2 px-2'>SR.No</th>
                                <th className='  py-2 px-2'>Name</th>
                                <th className='  py-2 px-2'>Email</th>
                                <th className='  py-2 px-2'>Post</th>
                                <th className='  py-2 px-2'>Qualification</th>
                                <th className='  py-2 px-2'>Experience</th>
                                <th className='  py-2 px-2'>Photo</th>
                                <th className='  py-2 px-2'>Edit</th>
                            </tr>
                        </thead>
                            <tbody className='bg-slate-800 text-white '>
                            {facultyList.map((faculty, index) => (
                                <tr key={faculty._id} className='border-2 border-gray-700'>
                                    <td className='  py-2 px-2'>{index + 1}</td>
                                    <td className='  py-2 px-2'>{faculty.name}</td>
                                    <td className='  py-2 px-2'>{faculty.email}</td>
                                    <td className='  py-2 px-2'>{faculty.post}</td>
                                    <td className='  py-2 px-2'>{faculty.qualification}</td>
                                    <td className='  py-2 px-2'>{faculty.experience}</td>
                                    <td className='  py-2 px-2'>
                                        <img className='w-[100px] h-[100px]' src={faculty.photo} alt="" />
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

export default ManageFaculty;
