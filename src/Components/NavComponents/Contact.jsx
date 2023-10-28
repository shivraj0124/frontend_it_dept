import React,{useState} from 'react'
import img1 from '../../Images/contact.jpg'
import axios from 'axios'
import toast from 'react-hot-toast'
function Contact() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState('')
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const data={
        name,
        email,
        message
      }
      const response= await axios.post(`${urlBackend}/api/v3/Contact`,data)
      if(response.data.success){
          toast.success("Message sent successfully !")
      }

    }catch(error){
      toast.error('Something went wrong')
    }
    setName('')
    setEmail('')
    setMessage('')
  }
  return (
    <div className='pt-5  h-screen flex justify-center bg-blue-50 overflow-y-auto'>
      
        <div className="max-md:w-[96%] md:w-[60%] md:mt-16 flex md:flex-row max-md:flex-col fixed bg-white shadow-xl rounded-md p-6 gap-x-4">
          <div className='w-[100%] max-md:hidden bg-red-100'>
            <img className='w-[100%] h-[100%]' src={img1} alt="" />
          </div>
          <div className='w-[100%] text-center mt-2  bg-white'>
            <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Contact</h1>
            <form className='mt-4 text-black flex flex-col justify-center items-center' onSubmit={handleSubmit} >
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} required />
              <input type="email" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[100%] my-2' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required />
              <textarea className='placeholder:text-slate-400 border-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none rounded-md p-5 text-xl font-semibold max-xl:mt-2 mt-5 w-[100%]  ' rows={5} placeholder='Message..' onChange={(e) => setMessage(e.target.value)} value={message} required>

              </textarea>
              <button className='mt-5   w-[100%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                Submit
              </button>
            </form>
          </div>
         
        </div>
      </div>
  
  )
}

export default Contact
