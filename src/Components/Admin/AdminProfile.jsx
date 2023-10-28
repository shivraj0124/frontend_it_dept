import React, { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import toast from 'react-hot-toast';
import './AdminComponents.css';
import axios from 'axios'
function AdminProfile() {
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
                <div className='flex flex-col justify-center items-center bg-white shadow-xl p-10 text-2xl'>
                    <div className=''>
                        <BiUserCircle size={100} />
                    </div>
                    <div className=''>
                        <hr />
                        <h1 className='mt-5'>Name: admin123</h1>
                        <h1 className='text-blue-500 mt-5 cursor-pointer' onClick={openModal} >Change Password</h1>

                    </div>
                </div>
            </div>
            <Modal open={open} onClose={onCloseOpenModal} center classNames={{ modal: 'deleteModal' }}>
                <h1 className='text-2xl font-semibold pt-4'>Change Password</h1>
                <form className='flex flex-col gap-4 mt-5' onSubmit={handleSubmit}>
                    <input type="password" placeholder='Old Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword}/>
                    <input type="password" placeholder='New Password' className='text-xl max-md:text-sm font-semibold placeholder:text-slate-500 border-b-2 border-blue-300 hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>
                    <button className='py-1 px-4 bg-blue-600 border-2 text-white rounded-md'>Change Password</button>
                </form>
            </Modal>
        </div>

    )
}

export default AdminProfile
