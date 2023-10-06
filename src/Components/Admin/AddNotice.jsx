import React,{useState} from 'react'
// import img1 from '../../Images/add_faculty.png'
import axios from 'axios'
import {toast} from 'react-toastify'
export default function AddNotice() {
    const [title,setTitle]=useState('')
    const [link,setLink]=useState('')
    const [description,setDescription]=useState('')

    // alert('Hello')
    const handleOnSubmit=async (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:3000/api/v1/add-notice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Notice Added Successfully!', {
                    autoClose: 2000,
                    position: 'top-center',
                });
            } else {
                toast.error('Failed to Add Notice', {
                    autoClose: 2000,
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to Add Notice ', {
                autoClose: 2000,
                position: 'top-center',
            });
        }
    }
    return (
        <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
        <div className="w-100 mt-16 justify-center max-xl:px-2 xl:px-36 ">
            <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse p-3 bg-white shadow-xl rounded-md">
                <div className='w-[100%] text-center  bg-white pb-10'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Notice</h1>
                    <form className='mt-10 text-black' onSubmit={handleOnSubmit}>
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' onChange={(e)=>setTitle(e.target.value)} />
                        <br />
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Link (Optional)' onChange={(e)=>setLink(e.target.value)} />
                        <br />
                        <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold mt-10 w-[80%]  ' rows={5}  placeholder='Description..' onChange={(e)=>setDescription(e.target.value)}>

                        </textarea>
                        <br />
                        <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                            Add Notice
                        </button>
                    </form>
                </div>
                {/* <div className='w-[100%] max-md:hidden'>
                    <img className='w-[100%] h-[100%]' src={img1} alt="" />
                </div> */}

            </div>
        </div>
        </div>

    )
}
// x2FnvrxDpPLhLaUe --password
//  mongodb+srv://connectitdept:<password>@cluster0.zpkisx0.mongodb.net/?retryWrites=true&w=majority
