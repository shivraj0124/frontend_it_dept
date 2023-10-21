import React,{useState} from 'react'
// import img1 from '../../Images/add_faculty.png'
import axios from 'axios'
import toast from 'react-hot-toast';
export default function AddNotice() {
    const [title,setTitle]=useState('')
    const [link,setLink]=useState('')
    const [description,setDescription]=useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    // alert('Hello')
    const handleOnSubmit=async (e)=>{
        e.preventDefault()
        let updateOrNot = 1;
        const arr = [title, description];
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
                    }
                }
            }
        })
        if (updateOrNot === 1) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);
        formData.append('description', description);

        try {
            const response = await axios.post(`${urlBackend}/api/v1/add-notice`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Notice Added Successfully!', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            } else {
                toast.error('Failed to Add Notice', {
                    autoClose: 2000,
                    position: 'bottom-center',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to Add Notice ', {
                autoClose: 2000,
                position: 'bottom-center',
            });
        }
    }
    }
    return (
        <div className='h-screen overflow-y-scroll pb-10 bg-blue-50'>
        <div className="w-[100%] mt-5 flex justify-center items-center">
                <div className="w-[80%] max-[806px]:w-[96%] flex md:flex-row- max-md:flex-col-reverse p-3 bg-white shadow-xl rounded-md">
                <div className='w-[100%] text-center  bg-white max-md:pb-10 pb-6'>
                    <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Notice</h1>
                    <form className='mt-5 text-black' onSubmit={handleOnSubmit}>
                        <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' onChange={(e)=>setTitle(e.target.value)} required />
                        <br />
                        <input type="url" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Link (Optional)' onChange={(e)=>setLink(e.target.value)} />
                        <br />
                        <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold max-xl:mt-2 mt-10 w-[80%]  ' rows={5}  placeholder='Description..' onChange={(e)=>setDescription(e.target.value)} required>

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
