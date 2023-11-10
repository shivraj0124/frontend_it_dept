
import React, { useEffect, useState } from 'react'
import themeHook from '../Admin/ContextP'
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import '../Admin/AdminComponents.css';
import BarLoader from 'react-spinners/BarLoader';
import lottie from 'lottie-web';
import animationData2 from '../../lottie/654L0pmYVj (1).json'

function StudentProfile() {
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
    const [loader, setLoader] = useState(true);
    const { auth, setAuth, userId } = themeHook()
    const [open, setOpen] = useState(false);
    const [openF, setOpenF] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [user,setUser]=useState({})

    const urlBackend = import.meta.env.VITE_BACKEND_API
    

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
        setName(user?.Name);
        setEmail(user?.Email);
        setPhone(user?.Phone);
        // Clear the photo field

    };
    const onCloseModal = () => {
        setOpenF(false);

        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
       
    };
    const updateStudent = async (e) => {
        e.preventDefault()
        let updateOrNot = 1;
        const arr = [name, email, phone];
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
                    } 
                }
            }
        })
        try {
            if (updateOrNot === 1) {
                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Email', email.replace(/\s+/g, ''));
                formData.append('Phone', phone);
                formData.append('EnrollmentNo',user?.EnrollmentNo);
             
               
                console.log("hello", auth)
                const response = await axios.put(`${urlBackend}/api/v2/update-profile/${userId}`, formData);

                if (response.data.success) {
                    // Update facultyList with the updated faculty data
                    setAuth({ user: response.data.student })
                    setUser(response.data.student)
                    console.log(response.data.student)
                    toast.success('Profile Updated Successfully', {
                        autoClose: 2000,
                        closeButton: true,
                        position: "bottom-center"
                    });
                    getStudent()
                    onCloseModal();
                } else {
                    toast.error(response.data.message, {
                        autoClose: 2000,
                        position: 'bottom-center',
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

    };
    const getStudent =async()=>{
        
        try{
          const response=await axios.get(`${urlBackend}/api/v2/profile/${userId}`)
          if(response.data.success){
            setUser(response.data.student)
            console.log(response.data,user)
          }else{
            toast.error('Something went wrong')
          }
        }catch(err){
       console.log('Error')
        }
        setLoader(false)
    }
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
                const response = await axios.put(`${urlBackend}/api/v2/change-password/${userId}`, data)
                console.log(auth?.user?._id, "hello")
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
    useEffect(()=>{
        getStudent()
        console.log(user);
    },[])
    // console.log(auth)
    return (
        <div className='min-h-screen overflow-y-scroll pb-10 bg-blue-50'>
 {loader ? (
              <div className="flex justify-center items-center mt-32">
                  <BarLoader color="blue" />
              </div>
          ) :(
            <div className="w-[100%] mt-5 max-md:mt-2 flex justify-center  items-center ">
                
                <div className='flex flex-col  justify-center items-center bg-white shadow-2xl p-4 text-xl rounded-3xl'>
                            <div className='flex items-center justify-center'>
                                <div className=' w-[100px] h-[110px]' id="lottie-container2" />
                            </div>
                    <div className=''>
                        <hr />
                        <p className='mt-5 text-gray-800'>Name: {user?.Name}</p>
                                <p className='mt-5 text-gray-800'>Enrollment No: {user?.EnrollmentNo}</p>
                                <p className='mt-5 text-gray-800'>Email: {user?.Email}</p>
                                <p className='mt-5 text-gray-800'>phone: {user?.Phone}</p>
                                <p className='mt-5 text-gray-800'>Semester: {user?.Semester?.name}</p>
                                <p className='mt-5 text-gray-800'>Shift: {user?.Shift?.name}</p>
                       
                        <div className='flex flex-row justify-between pr-4'>
                            <h1 className='text-blue-500 mt-5 cursor-pointer' onClick={openModal} >Change Password</h1>
                            <h1 className='text-green-500 mt-5 cursor-pointer' onClick={onOpenModal} >Edit</h1>
                        </div>
                    </div>
                </div>
            </div>
    )}
            <Modal open={open} onClose={onCloseOpenModal} center classNames={{ modal: 'deleteModal' }}>
                <h1 className='text-2xl font-semibold pt-4'>Change Password</h1>
                <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                    <input type="password" placeholder='Old Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} required />
                    <input type="password" placeholder='New Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required />
                    <button className='py-1 px-4 bg-blue-600 border-2 text-white rounded-md'>Change Password</button>
                </form>
            </Modal>
            <Modal open={openF} onClose={onCloseModal} center classNames={{ modal: 'updateModal' }}>
                <div className='w-[100%] text-center mt-5  bg-white md:p-10'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Edit Details</h1>
                    <form className='mt-10 text-black' onSubmit={updateStudent}>
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

export default StudentProfile
