import React,{useEffect,useState} from 'react'
import themeHook from '../Admin/ContextP'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import '../Admin/AdminComponents.css';
import lottie from 'lottie-web';
import animationData2 from '../../lottie/654L0pmYVj (1).json'
function FacultyProfile() {
    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: document.getElementById('lottie-container2'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData2, // Your animation data
        });
        return () => anim.destroy(); // Clean up animation on component unmount
    }, []);
    const {auth,setAuth,userId}=themeHook()
    const [open, setOpen] = useState(false);
    const [openF,setOpenF]=useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [qualification, setQualification] = useState('');
    const [post, setPost] = useState('');
    const [experience, setExperience] = useState('');
    const [photo, setPhoto] = useState(null);

    const urlBackend = import.meta.env.VITE_BACKEND_API
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const openModal = () => {
        setOpen(true)
    }
    const onCloseOpenModal = () => {
        setOpen(false)
        setOldPassword('')
        setNewPassword('')
    }

    const onOpenModal = () => {
        setOpenF(true);

        // Set initial values for form fields based on the selected faculty
        setName(auth?.user?.name);
        setEmail(auth?.user?.email);
        setPhone(auth?.user?.phone);
        setQualification(auth?.user?.qualification);
        setPost(auth?.user?.post);
        setExperience(auth?.user?.experience);
        // Clear the photo field
        setPhoto(null);

    };
    const onCloseModal = () => {
        setOpenF(false);
    
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setQualification('');
        setPost('');
        setExperience('');
        setPhoto(null);
    };
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
                console.log("hello", auth)
                const response = await axios.put(`${urlBackend}/api/v4/update-profile/${userId}`, formData);

                if (response.data.success) {
                    // Update facultyList with the updated faculty data
                    setAuth({user:response.data.faculty})
                    console.log(response.data.faculty)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auth?.user?._id)
        if (oldPassword === newPassword) {
            toast.error("Please enter new password")
        } else {
            console.log(auth?.user?._id)

            try {
                const data = {
                    oldPassword, newPassword
                }
                console.log(data)
                const response = await axios.put(`${urlBackend}/api/v4/update-password/${userId}`, data)
                console.log(auth?.user?._id,"hello")
                if (response.data.success) {
                    toast.success("Password Changed Successfully!")
                    onCloseOpenModal()
                } else {
                    toast.error(response.data.message)
                }

            } catch (error) {
                toast.error('error')
            }
        }

    }
    // console.log(auth)
  return (
      <div className='min-h-screen overflow-y-scroll pb-10 bg-blue-50'>
        
          <div className="w-[100%] mt-5 max-md:mt-2 flex justify-center  items-center ">
              <div className='  flex flex-col justify-center items-center bg-white shadow-2xl p-4 text-xl rounded-2xl'>
                  <div className='flex items-center justify-center'>
                      {/* <BiUserCircle size={100} /> */}
                      <div className=' w-[100px] h-[100px]' id="lottie-container2" />
                  </div>
                  <div className=''>
                      <hr />
                      <p className='mt-5 text-gray-800'>Name: {auth?.user?.name}</p>
                      <p className='mt-5 text-gray-800'>Post: {auth?.user?.post}</p>
                      <p className='mt-5 text-gray-800'>Email: {auth?.user?.email}</p>
                      <p className='mt-5 text-gray-800'>phone: {auth?.user?.phone}</p>
                      <p className='mt-5 text-gray-800'>Qualification: {auth?.user?.qualification}</p>
                      <p className='mt-5 text-gray-800'>Experience: {auth?.user?.experience}</p>
                      <div className='flex flex-row justify-between pr-4'>
                      <p className='text-blue-500 mt-5 cursor-pointer' onClick={openModal} >Change Password</p>
                      <p className='text-green-500 mt-5 cursor-pointer' onClick={onOpenModal} >Edit</p>
                      </div>
                  </div>
              </div>
          </div>
          <Modal open={open} onClose={onCloseOpenModal} center classNames={{ modal: 'deleteModal' }}>
              <h1 className='text-2xl font-semibold pt-4'>Change Password</h1>
              <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                  <input type="password" placeholder='Old Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} required/>
                  <input type="password" placeholder='New Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required/>
                  <button className='py-1 px-4 bg-blue-600 border-2 text-white rounded-md'>Change Password</button>
              </form>
          </Modal>
          <Modal open={openF} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>
              <div className='w-[100%] text-center mt-5  bg-white md:p-10'>
                  <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Edit Details</h1>
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
                          Submit
                      </button>
                  </form>
              </div>
          </Modal>

    </div>
  )
}

export default FacultyProfile
