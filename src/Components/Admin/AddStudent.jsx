import React, { useState, useEffect } from 'react'
import img1 from '../../Images/add_faculty.png'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrNo, setEnrNo] = useState('');
  const [phone, setPhone] = useState('');
  // const [semester, setSemester] = useState('');
  // const [shift,setShift]=useState('')
  const [semesterList, setSemesterList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [selectedSem, setSelectedSem] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const handleChangeSemester = (value) => {
    setSelectedSem(value);
    setSelectedShift('');
    allShifts(value);
  };

  const handleChangeShift = (value) => {
    setSelectedShift(value);
  };
  const allSem = async () => {
    await axios.get(`${urlBackend}/api/v1/get-semesters`)
      .then((response) => {
        if (response.data.success) {
          setSemesterList(response.data.semesters);
        } else {
          console.error('Failed to Fetch Semesters');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const allShifts = (selectedSemesterId) => {
    axios.get(`${urlBackend}/api/v1/get-shifts/${selectedSemesterId}`)
      .then((response) => {
        if (response.data.success) {
          setShiftList(response.data.shifts);
        } else {
          console.error('Failed to Fetch Shifts');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let addOrNot = 1;
    const arr = [name, email, enrNo, password, phone, selectedSem, selectedShift];
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
        // setaddOrNot(0)
        addOrNot = 0
        if (countLoop <= 1) {

          if (index === 0) {
            toast.error('Name Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if (index === 1) {
            toast.error('Email Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          } else if (index === 2) {
            toast.error('EnrNo Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if (index === 3) {
            toast.error('Enter Password', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if (index === 4) {
            toast.error('Phone Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
          else if (index === 5) {
            toast.error('Semester Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          } else if (index === 6) {
            toast.error('Shift Field must filled', {
              autoClose: 1000,
              position: 'bottom-center'
            })
          }
        }
      }
    })

    if (addOrNot === 1) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('EnrNo', enrNo);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('semester', selectedSem);
      formData.append('shift', selectedShift);

      try {
        const response = await axios.post(`${urlBackend}/api/v1/add-student`, formData);
        console.log(response.data);
        if (response.data.success) {
          toast.success('Student Added Successfully!', {
            autoClose: 1000,
            position: "bottom-center"
          });

        }
        else {
          toast.error('Enrollment No already exists', {
            autoClose: 1000,
            position: "bottom-center"
          });
        }
      } catch (error) {

        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 2000
        });
      }
    }
  };

  useEffect(() => {
    allSem()
  }, [])

  return (
    <div className='h-screen overflow-y-auto  bg-blue-50'>
      <div className="w-[100%] mt-5 max-md:mt-2  flex justify-center items-center">
        <div className="w-[80%] sm:w-[90%] max-[806px]:w-[96%] flex md:flex-row max-md:flex-col-reverse max-md:pb-10 p-1 bg-white shadow-xl rounded-md  ">
          <div className='w-[100%] text-center mt-2  bg-white pb-2'>
            <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Student</h1>
            <form className='mt-4 text-black flex flex-col justify-center items-center' onSubmit={handleSubmit}>
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} required />
              <input type="email" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Enrollment No' onChange={(e) => setEnrNo(e.target.value)} value={enrNo} required />
              <input type="password" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />
              <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='phone' onChange={(e) => setPhone(e.target.value)} value={phone} required />
              <div className='w-[100%] flex flex-col justify-center items-center px-[10%]'>
                <div className='mt-6 flex max-md:flex-col justify-between  items-center md:flex-row  w-[100%]'>
                  <label htmlFor='semesters' className='font-semibold text-xl'>
                    Select Semester:
                  </label>
                  <Select
                    id='semesters'
                    className='max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
                    placeholder='Select Semester'
                    onChange={handleChangeSemester}
                  >
                    {semesterList?.map((semester) => (
                      <Option key={semester._id} value={semester._id}>
                        {semester.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className='mt-4 flex max-md:flex-col justify-between  items-center md:flex-row w-[100%]'>
                  <label htmlFor='shifts' className='font-semibold text-xl'>
                    Select Shift:
                  </label>
                  <Select
                    id='shifts'
                    className='max-md:w-[80%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
                    placeholder='Select Shift'
                    onChange={handleChangeShift}
                  >
                    {shiftList?.map((shift) => (
                      <Option key={shift._id} value={shift._id}>
                        {shift.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <br />
              <button className='mt-2 w-[80%] bg-blue-800 rounded-lg py-2 text-xl text-white cursor-pointer hover:bg-blue-500'>
                Add Student
              </button>
            </form>
          </div>
          <div className='w-[100%] max-xl:hidden '>
            <img className='w-[100%] h-[100%]' src={img1} alt="" />
          </div>
        </div>
      </div >
    </div >
  )
}