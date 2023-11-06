import React, { useState, useEffect } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import './AdminComponents.css';
import axios from 'axios'
import lottie from 'lottie-web';
import animationData2 from '../../lottie/654L0pmYVj (1).json'
function AdminProfile() {
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
    const [open, setOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const openModal = () => {
        setOpen(true)
    }
    const onCloseOpenModal = () => {
        setOpen(false)
        setOldPassword('')
        setNewPassword('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (oldPassword === newPassword) {
            toast.error("Please enter new password")
        } else {

            try {
                const data = {
                    oldPassword, newPassword
                }
                const response = await axios.put(`${urlBackend}/api/v1/update-password`, data)
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
    return (
        <div className='min-h-screen overflow-y-scroll pb-10 bg-blue-50'>
            <div className="w-[100%] mt-5 max-md:mt-2 flex justify-center  items-center ">
                <div className='h-[70%] flex flex-col justify-center items-center bg-white shadow-2xl rounded-2xl p-10 text-2xl'>
                    <div className='flex items-center justify-center'>
                        <div className=' w-[100px] h-[100px]' id="lottie-container2" />
                    </div>
                    <div className=''>
                        <hr />
                        <h1 className='mt-5'>Name:admin123</h1>
                        <p className='text-blue-600 mt-5  text-xl cursor-pointer' onClick={openModal} >Change Password</p>

                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseOpenModal} center classNames={{ modal: 'deleteModal' }}>
                <h1 className='text-2xl font-semibold pt-4'>Change Password</h1>
                <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                    <input type="password" placeholder='Old Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                    <input type="password" placeholder='New Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                    <button className='py-1 px-4 bg-blue-600 border-2 text-white rounded-md'>Change Password</button>
                </form>
            </Modal>
        </div>

    )
}

export default AdminProfile

