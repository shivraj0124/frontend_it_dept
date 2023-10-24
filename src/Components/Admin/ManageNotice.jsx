import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import toast from 'react-hot-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function ManageNotice() {
    const [open, setOpen] = useState(false);
    const [openDes, setOpenDes] = useState(false);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionView, setDescriptionView] = useState('');
    const [loader, setLoader] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeList, setNoticeList] = useState([]);
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleDescriptionModal = (notice) => {
        setOpenDes(true);
        setDescriptionView(notice.description);
    };

    const onCloseDes = () => {
        setOpenDes(false);
    };

    const [openDelete, setOpenDelete] = useState(false);
    const openDeleteModal = (notice) => {
        setOpenDelete(true);
        setSelectedNotice(notice);
    };
    const onCloseDeleteModal = () => {
        setOpenDelete(false);
    };

    const handleDelete =async (e) => {
        e.preventDefault();
        try {
            if (selectedNotice && selectedNotice._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-notice/${selectedNotice._id}`);

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
            toast.error(error, {
                autoClose: 2000,
                position: 'bottom-center',
            });
        }

    };

    const onOpenModal = (notice) => {
        setOpen(true);
        setSelectedNotice(notice);
        setTitle(notice.title);
        setLink(notice.link);
        setDescription(notice.description);
    };

    const onCloseModal = () => {
        setOpen(false);
        setSelectedNotice(null);
        setTitle('');
        setLink('');
        setDescription('');
    };

    const handleOnSubmit =async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [title,description];
        let countLoop = 0;
        arr.map((item,index) => {
            // alert(item);
            item.replace(/\s+/g, '');
            if (item.trim() === '') {
                countLoop += 1;
                updateOrNot = 0;
                if (countLoop <= 1)
                    index === 0 ? toast.error(`Title Field must be filled`, {
                        autoClose: 2000,
                        position: 'bottom-center',
                    }) : toast.error(`Description Field must be filled`, {
                        autoClose: 2000,
                        position: 'bottom-center',
                    }); 
                    
            }
        });

        try {
            if (updateOrNot === 1) {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('link', link);
                formData.append('description', description);

                const response = await axios.put(`${urlBackend}/api/v1/update-notice/${selectedNotice._id}`, formData);

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
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    const getNotices =async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-notices`);

            if (response.data.success) {
                setNoticeList(response.data.notice);
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
                                    <th className="p-3  px-4 max-md:text-sm">Link</th>
                                    <th className="p-3 max-md:text-sm ">Edit</th>
                                </tr>
                            </thead>
                            {noticeList?.length === 0 ? (
                                <tr>
                                    <td className="p-3 px-4 max-md:text-sm w-24"></td>
                                    <td className="p-3 px-4 max-md:text-sm w-24"></td>
                                    <td className="p-3 px-4 max-md:text-sm w-44">No Data Found</td>
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
                                            <td className="p-3 px-5 max-md:text-sm">
                                                <Link target="_blank" to={notice.link}>
                                                    View
                                                </Link>
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
                <div className="w-[100%] md:w-[600px] mt-5 justify-center ">
                    <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse bg-white rounded-md">
                        <div className="w-[100%] text-center bg-white pb-10">
                            <h1 className="text-center font-semibold text-2xl underline underline-offset-4">Update Notice</h1>
                            <form className="mt-2 text-black" onSubmit={handleOnSubmit}>
                                <input type="text" className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <br />
                                <input type="url" className="text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2" placeholder="Link (Optional)" value={link} onChange={(e) => setLink(e.target.value)} />
                                <br />
                                <textarea className="placeholder:text-slate-400 border-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-10 w-[80%]" rows={5} placeholder="Description.." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                <br />
                                <button className="mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500">
                                    Update Notice
                                </button>
                            </form>
                        </div>
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
    );
}
