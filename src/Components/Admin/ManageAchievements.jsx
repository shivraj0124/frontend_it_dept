import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import BarLoader from 'react-spinners/BarLoader'
import { Link } from 'react-router-dom'
function ManageAchievements() {
    const [open, setOpen] = useState(false);
    const [openDes, setOpenDes] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionView, setDescriptionView] = useState('');
    const [loader, setLoader] = useState(true);
    const [aList, setAList] = useState([]);
    const [selectedAchievement, setSelectedAchievement] = useState(null); // Initialize with null
    const [photo, setPhoto] = useState(null);
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };
    const handleDescriptionModal = (achievement) => {
        setOpenDes(true);
        setDescriptionView(achievement.description);
    };

    const onCloseDes = () => {
        setOpenDes(false);
    };

    const getAllAchievements =async ()=>{
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-achievements`);

            if (response.data.success) {
                setAList(response.data.achievements);
            } else {
                console.error('Failed to fetch Achievement details');
            }

            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const onOpenModal = (achievement) => {
        setOpen(true);
        setSelectedAchievement(achievement);
        setTitle(achievement.title);
        setDescription(achievement.description)
        setPhoto(null);
    };
    const onCloseModal = () => {
        setOpen(false);
        setSelectedAchievement(null);
        setTitle('');
        setDescription('')
        setPhoto(null);
    };

    const handleUpdate =async (e) => {
        e.preventDefault();
        let updateOrNot = 1;
        const arr = [title,description,photo];
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
                    } else if (index === 1) {
                        toast.error('Description Field must filled', {
                            autoClose: 2000,
                            position: 'bottom-center'
                        })
                    } else {
                        toast.error('Must Upload Photo', {
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
                formData.append('description', description);

                if (photo) {
                    formData.append('photo', photo);
                }

                const response = await axios.put(`${urlBackend}/api/v1/update-achievement/${selectedAchievement._id}`, formData);

                if (response.data.success) {
                    getAllAchievements();
                    setAList((prevAList) =>
                        prevAList.map((achievement) =>
                            achievement._id === selectedAchievement._id ? response.data.updatedAchievement : achievement
                        )
                    );
                    toast.success('Achievement Details Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: 'bottom-center',
                    });
                    onCloseModal();
                } else {
                    toast.error('Achievement with This Title Already Exists', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }


    };
    const [openDelete, setOpenDelete] = useState(false);
    const openDeleteModal = (achievement) => {
        setOpenDelete(true);
        setSelectedAchievement(achievement);
    };
    const onCloseDeleteModal = () => {
        setOpenDelete(false);
    };
    const handleDelete=async (e)=>{
        e.preventDefault();
        try {
            if (selectedAchievement && selectedAchievement._id) {
                const response = await axios.delete(`${urlBackend}/api/v1/delete-achievement/${selectedAchievement._id}`);

                if (response.data.success) {
                    getAllAchievements();
                    setAList((prevAList) =>
                        prevAList.filter((achievement) => achievement._id !== selectedAchievement._id)
                    );
                    toast.success('Achievement deleted successfully !', {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                } else {
                    toast.error('Failed to delete Achievement', {
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
    useEffect(()=>{
      getAllAchievements()
    },[])
  return (
      <div className="h-screen bg-blue-50 ">
          <div className="w-[100%] mt-10 max-md:mt-2 flex justify-center  items-center px-2">
              {loader ? (
                  <div className="flex justify-center items-center mt-32">
                      <BarLoader color="blue" />
                  </div>
              ) : (
                      <div className="text-left overflow-y-auto h-[460px]  rounded-md w-[100%]">
                      <table className="w-[100%] border-2 border-collapse rounded-md">
                          <thead className="sticky top-0">
                              <tr className="bg-slate-950 text-white border-2 border-slate-950 text-lg">
                                  <th className="p-2 px-4 max-md:text-sm">SR.No</th>
                                  <th className="p-2 px-4 max-md:text-sm">Title</th>
                                  <th className="p-2 px-4 max-md:text-sm">Description</th>
                                  <th className="p-2 px-4 max-md:text-sm">Photo</th> 
                                  <th className="p-2 max-md:text-sm">Edit</th>
                              </tr>
                          </thead>
                          {aList?.length === 0 ? (
                              <tr>
                                      <td className="p-2 px-4 max-md:text-sm w-24"></td>
                                      <td className="p-2 px-4 max-md:text-sm w-24"></td>
                                      <td className="p-2 px-4 max-md:text-sm w-44">No Data Found</td>
                                      <td className="p-2 px-4 w-20"></td>
                                      <td className="p-2 px-4 w-20"></td>
                              </tr>
                          ) : (
                              <tbody className="bg-slate-800 text-white">
                                          {aList?.map((achievement, index) => (
                                      <tr key={achievement._id} className="border-2 border-gray-700">
                                                  <td className="p-2 px-4 max-md:text-sm">{index + 1}</td>
                                                  <td className="p-2 px-4 max-md:text-sm">{achievement.title}</td>
                                                  <td onClick={() => handleDescriptionModal(achievement)} className='cursor-pointer p-3 px-4  max-md:text-sm '>View</td>
                                          <td className='p-2 px-4'>
                                                      <Link to={achievement.photo} target='_blank'> <img className='w-[100px] h-[100px]' src={achievement.photo} alt="img" /></Link>
                                          </td>
                                          <td className="p-2 px-4  max-md:text-sm">
                                                      <div className="flex flex-row gap-6 justify-left min-[1150px]:w-[80px]">
                                                          <button className="text-white font-semibold bg-green-700 py-1 px-2 rounded-md" onClick={()=>onOpenModal(achievement)}>Update</button>
                                                          <button className="text-white font-left bg-red-700 py-1 px-2 rounded-md" onClick={() => openDeleteModal(achievement)}>Delete</button>
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
              <div className="w-[100%] mt-6 rounded-md">
                  <h1 className="text-blue-800 text-xl font-semibold">Description</h1>
                  <p className="mt-4">{descriptionView}</p>
              </div>
          </Modal>
          <Modal open={open} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>
              <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse bg-white rounded-md">
                  <div className='w-[100%] text-center  bg-white pb-10'>
                      <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-5'>Update Achievement</h1>
                      <form className='mt-10 text-black' onSubmit={handleUpdate}>
                          <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                          <br />
                          <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-10 w-[80%]  ' rows={5} placeholder='Description..' value={description} onChange={(e) => setDescription(e.target.value)} required>
                          </textarea>
                          <br />
                          <label className=' border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-5 max-md:w-[80%] rounded-md'>
                              <input type="file" name="photo" className='hidden' onChange={handleFileChange} />
                              Upload Photo
                          </label>
                          <br />
                          <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-lg text-white cursor-pointer hover:bg-blue-500'>
                              Update Achievement
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
    
  )
}

export default ManageAchievements
