import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import BarLoader from 'react-spinners/BarLoader'
function AcademicAchievements() {
    const navigate = useNavigate()
    const [imageList, setImageList] = useState([])
    const [selectedImage, setSelectedImage] = useState('')
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [loader, setLoader] = useState(true);
    const [title, setTitle] = useState('');
    const [photo, setPhoto] = useState(null);
    const [search, setSearch] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const [image, setImage] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setPhoto(selectedFile);
    };
    const onOpenAddModal = () => {
        setOpenAdd(true)
    }
    const onCloseAddModal = () => {
        setOpenAdd(false)
    }
    const onOpenModal = (image) => {
        setOpen(true);
        setSelectedImage(image);
        console.log(image)
        setTitle(image.title);
        setPhoto(null);
    };
    const onCloseModal = () => {
        setOpen(false);
        setSelectedImage(null);
        setTitle('');

        setPhoto(null);
    };

    const openDeleteModal = (image) => {
        setOpenDelete(true);
        setSelectedImage(image);
    };
    const onCloseDeleteModal = () => {
        setOpenDelete(false);
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('photo', photo);

        try {
            const response = await axios.post(`${urlBackend}/api/v1/add-academicAch`, formData);

            if (response.data.success) {
                fetchImages()
                toast.success('Image uploaded successfully');
                onCloseAddModal()
            } else {
                // Handle the error
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(search)
        setLoader(true);
        try {
            const response = await axios.get(`${urlBackend}/api/v1/search-academicAch`, {
                params: { search },
            });
            setImageList(response.data.images);
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
    const fetchImages = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-academicAch`);
            const data = response.data;

            console.log(data)
            if (data.success) {
                setImageList(data.images);

            } else {
                console.log('Failed to fetch Images');
            }
            setLoader(false)
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to fetch Images')
            setLoader(false)
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [title];
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
                        toast.error('Title Field must filled', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    }
                }
            }
        })
        try {
            if (updateOrNot === 1) {
                const formData = new FormData();
                formData.append('title', title);
                if (photo) {
                    formData.append('photo', photo);
                }

                const response = await axios.put(`${urlBackend}/api/v1/update-academicAch/${selectedImage._id}`, formData);

                if (response.data.success) {
                    await fetchImages();
                    setImageList((prevAList) =>
                        prevAList.map((image) =>
                            image._id === selectedImage._id ? response.data.updatedImage : image
                        )
                    );
                    toast.success('Image Details Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: "bottom-center"
                    });
                    onCloseModal();
                } else {
                    toast.error('Image with This Title Already Exists', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }


    };
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            if (selectedImage && selectedImage._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-academicAch/${selectedImage._id}`);

                if (response.data.success) {
                    setImageList((prevAList) =>
                        prevAList.filter((image) => image._id !== selectedImage._id)
                    );
                    toast.success('Image deleted successfully !', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete record', {
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

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <div>
            <div className="h-screen bg-blue-50 ">
                <div className="w-[100%]  md:flex flex-col justify-center  items-center ">

                    <div className=" lg:py-2 px-2 flex  w-[100%] flex-row-reverse justify-between sticky top-0 p-1 gap-x-2" style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                        <div className='w-[60%] flex justify-center items-center'>
                            <button className='py-1 lg:py-2 px-4 w-[80%]  max-md:text-sm font-semibold bg-blue-700 text-white rounded-md shadow-md hover:bg-blue-700 hover:text-white' onClick={onOpenAddModal}>Add Image</button>
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
                        <div className='md:w-[100%] px-2 pb-2 mt-2'>
                            <div className="text-left overflow-y-auto max-h-[500px] max-xl:max-h-[460px] rounded-md w-[100%]">
                                <table className="w-[100%] border-2  rounded-md">
                                    <thead className="sticky top-0">
                                        <tr className="bg-slate-950 text-white border-2 border-slate-950 text-lg">
                                            <th className="p-2 px-4 max-md:text-sm">SR.No</th>
                                            <th className="p-2 px-4 max-md:text-sm">Title</th>
                                            <th className="p-2 px-4 max-md:text-sm">Photo</th>
                                            <th className="p-2 max-md:text-sm">Edit</th>
                                        </tr>
                                    </thead>
                                    {imageList?.length === 0 ? (
                                        <tr>
                                            <td className="p-2 px-4 max-md:text-sm w-24"></td>
                                            <td className="p-2 px-4 w-20"></td>
                                            <td className="p-2 px-4 max-md:text-sm w-44">No Data Found</td>
                                            <td className="p-2 px-4 w-20"></td>
                                        </tr>
                                    ) : (
                                        <tbody className="bg-slate-800 text-white">
                                            {imageList?.map((image, index) => (
                                                <tr key={image._id} className="border-2 border-gray-700">
                                                    <td className="p-2 px-2 max-md:text-sm">{index + 1}</td>
                                                    <td className="p-2 px-2 max-md:text-sm">{image.title}</td>
                                                    <td className='p-2 px-2' >
                                                        <img className='w-[100px] h-[100px]' src={image.photo} alt="img" onClick={() => navigate(image.photo)} />
                                                    </td>
                                                    <td className="p-2 px-2  max-md:text-sm">
                                                        <div className="flex flex-row gap-6 justify-left min-[1150px]:w-[80px]">
                                                            <button className="text-white font-semibold bg-green-700 py-1 px-2 rounded-md" onClick={() => onOpenModal(image)}>Update</button>
                                                            <button className="text-white font-left bg-red-700 py-1 px-2 rounded-md" onClick={() => openDeleteModal(image)}>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <Modal open={openAdd} onClose={onCloseAddModal} center classNames={{ modal: 'updateModal' }}>
                    <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse bg-white rounded-md">
                        <div className='w-[100%] text-center  bg-white pb-10'>
                            <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-5'>Add image</h1>
                            <form className='mt-10 text-black' onSubmit={handleFormSubmit}>
                                <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required />
                                <br />
                                <label className=' border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] inline-block cursor-pointer mt-5 px-2 w-max rounded-md'>
                                    <input type="file" name="photo" className='hidden' onChange={handleFileChange} />
                                    upload Photo
                                </label>
                                <br />
                                <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-lg text-white cursor-pointer hover:bg-blue-500'>
                                    Add image
                                </button>
                            </form>
                        </div>
                        {/*                         
                        <div>
                            <h2>Upload an Image</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div>
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Image:</label>
                                    <input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleFileChangeN}
                                    />
                                </div>
                                <button type="submit">Upload</button>
                            </form>
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div> */}
                    </div>
                </Modal>
                <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>
                    <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse bg-white rounded-md">
                        <div className='w-[100%] text-center  bg-white pb-10'>
                            <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-5'>Update image</h1>
                            <form className='mt-10 text-black' onSubmit={handleUpdate}>
                                <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
                                <br />
                                <label className=' border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5 max-md:w-[80%] rounded-md'>
                                    <input type="file" name="photo" className='hidden' onChange={handleFileChange} />
                                    Upload Photo
                                </label>
                                <br />
                                <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-lg text-white cursor-pointer hover:bg-blue-500'>
                                    Update image
                                </button>
                            </form>
                        </div>
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
        </div>
    )
}

export default AcademicAchievements
