import React, { useState } from 'react'
import img1 from '../../Images/add_faculty.png'
import axios from 'axios'
import toast from 'react-hot-toast';
export default function AddFaculty() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone]= useState('');
  const [password, setPassword] = useState('');
  const [qualification, setQualification] = useState('');
  const [post, setPost] = useState('');
  const [experience, setExperience] = useState('');
  const [photo, setPhoto] = useState(null);
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updateOrNot = 1;
    const arr = [name, email,phone, qualification, post, experience,photo];
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
          } else if(index === 3){
            toast.error('Qualification Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if(index === 4){
            toast.error('Post Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if(index === 5){
            toast.error('Experience Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if(index === 6){
            toast.error('Experience Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
        }
      }
    })
    if (photo === null) {
      toast.error('Please Upload the Photo')
      updateOrNot = 0
    }
    if (updateOrNot === 1) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('qualification', qualification);
      formData.append('post', post);
      formData.append('experience', experience);
      formData.append('photo', photo);
      console.log(photo)
      try {
        const response = await axios.post(`${urlBackend}/api/v1/add-faculty`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the correct content type
          },
        });
        console.log(response.data);
        if (response.data.success) {
          toast.success('Registration Successfully!', {
            autoClose: 1000,
            position: "bottom-center"
          });

        }
        else {
          toast.error('Email already exists', {
            autoClose: 1000,
            position: "bottom-center"
          });
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.warn(error.response.data.message, {
            autoClose: 2000,
            position: 'bottom-center'
          });
        } else {
          toast.error(error.message, {
            position: "bottom-center",
            autoClose: 2000
          });
        }
      }
    }
  };

  return (
    <div className='min-h-screen overflow-y-scroll pb-10 bg-blue-50'>
      <div className="w-[100%] mt-5 max-md:mt-2 flex justify-center  items-center ">
        <div className="w-[80%] max-[806px]:w-[96%] flex md:flex-row max-md:flex-col-reverse p-1 bg-white shadow-xl rounded-md xl:pb-10">
          <div className='w-[100%] text-center mt-2 max-md:pb-4 pb-2 bg-white'>
            <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Faculty</h1>
            <form className='mt-4 max-lg:mt-2 text-black flex flex-col justify-center items-center' onSubmit={handleSubmit}>
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} required />
              <input type="email" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
              <input type="phone" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Phone' onChange={(e) => setPhone(e.target.value)} value={phone} required />
              <input type="password" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Qualification' onChange={(e) => setQualification(e.target.value)} value={qualification} required />
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Post' onChange={(e) => setPost(e.target.value)} value={post} required />
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Teaching Experience' onChange={(e) => setExperience(e.target.value)} value={experience} required />
              <label className='lg:w-[40%] border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] px-[12px] inline-block cursor-pointer mt-2'>
                <input type="file" name="photo" className='hidden' onChange={handleFileChange} required />
                Upload Photo
              </label>
              <br />
              <button className='   w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                Add Faculty
              </button>
            </form>
          </div>
          <div className='w-[100%] max-lg:hidden'>
            <img className='w-[100%] h-[100%]' src={img1} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
