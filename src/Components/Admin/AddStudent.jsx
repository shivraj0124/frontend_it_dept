import React, { useState, useEffect } from 'react'
import img1 from '../../Images/add_faculty.png'
import * as XLSX from 'xlsx'
import axios from 'axios'
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import './AdminComponents.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enrNo, setEnrNo] = useState('');
  const [phone, setPhone] = useState('');
  const [excelFile, setExcelFile] = useState(null);
  const [semesterList, setSemesterList] = useState([]);
  const [shiftList, setShiftList] = useState([]);
  const [selectedSem, setSelectedSem] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const [openAdd, setOpenAdd] = useState(false);
  const onOpenAddModal = () => {
    setOpenAdd(true)
  }
  const onCloseAddModal = () => {
    setOpenAdd(false)
  }
  const handleChangeSemester = (value) => {
    setSelectedSem(value);
    setSelectedShift('');
    allShifts(value);
  };

  const handleChangeShift = (value) => {
    setSelectedShift(value);
  };
  const allSem = async () => {
    try {
      const response = await axios.get(`${urlBackend}/api/v1/get-semesters`);

      if (response.data.success) {
        setSemesterList(response.data.semesters);
      } else {
        console.error('Failed to Fetch Semesters');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const allShifts =async (selectedSemesterId) => {
    try {
      const response = await axios.get(`${urlBackend}/api/v1/get-shifts/${selectedSemesterId}`);

      if (response.data.success) {
        setShiftList(response.data.shifts);
      } else {
        console.error('Failed to Fetch Shifts');
      }
    } catch (error) {
      console.error('Error:', error);
    }

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
      formData.append('Name', name);
      formData.append('Email', email);
      formData.append('EnrollmentNo', enrNo);
      formData.append('Password', password);
      formData.append('Phone', phone);
      formData.append('Semester', selectedSem);
      formData.append('Shift', selectedShift);

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

  // excel
  const [excelData, setExcelData] = useState(null);
  // handle File
  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }

  // submit function
  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (excelFile !== null) {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        console.log('Hello')
        const worksheetName = workbook.SheetNames[0];
        console.log('Hello 2')
        const worksheet = workbook.Sheets[worksheetName];
        console.log('Hello 3')
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log('Hello3 4')
        setExcelData(data);
        const response = await axios.post(`${urlBackend}/api/v1/upload-excel-file`, { data: JSON.stringify(data), semShift: { Semester: selectedSem, Shift: selectedShift } })
        console.log(response);
        if (response.data.success) {
          toast.success('Excel uploaded  Successfully!', {
            autoClose: 2000,
            position: "bottom-center"
          });

        }
        else {
          toast.error(response.data.message, {
            autoClose: 2000,
            position: "bottom-center"
          });
          console.log()
        }
      }
      else {
        setExcelData(null);
        console.log(response.data.message)
      }
    } catch (err) {
      console.log('error');
    }
    console.log(excelData)
  }

  useEffect(() => {
    allSem()
  }, [])

  return (
    <div className='h-screen overflow-y-auto  bg-blue-50'>
      <div className="w-[100%] mt-5 max-md:mt-2  flex flex-col justify-center items-center">
        <button className='md:hidden mt-1 w-max bg-blue-800 rounded-lg px-5 py-2 text-lg text-white cursor-pointer hover:bg-blue-500 flex justify-end' onClick={onOpenAddModal}>
          Upload Excel
        </button>
        <div className="mt-2 w-[80%] sm:w-[90%] max-[806px]:w-[96%] flex md:flex-row py-2 pb-5 md:h-[500px] bg-white max-md:flex-col shadow-xl rounded-md  ">
        
          <div className='w-[100%] text-center mt-2  '>
            <h1 className='text-center font-semibold text-2xl underline underline-offset-4'>Add Student</h1>
            <form className='mt-4 text-black flex flex-col justify-center items-center ' onSubmit={handleSubmit}>
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
          <div className='w-[100%] max-md:hidden flex flex-col justify-center gap-y-5 items-center'>
            <div>
              <p className='text-xl'>
                Upload Excel File
              </p>
            </div>
            <button className='mt-1 w-max bg-blue-800 rounded-lg px-5 py-2 text-lg text-white cursor-pointer hover:bg-blue-500 flex justify-end' onClick={onOpenAddModal}>
              Upload Excel
            </button>
          </div>
        </div>
      </div >
      <Modal open={openAdd} onClose={onCloseAddModal} center classNames={{ modal: 'updateModal' }}>
        <div className="w-[100%] flex md:flex-row- max-md:flex-col-reverse bg-white rounded-md">
          <div className='w-[100%] text-center  bg-white'>
            <h1 className='text-center font-semibold text-2xl underline underline-offset-4 mt-5'>Upload Excel</h1>
            <div className='w-[100%] flex flex-col justify-center items-center px-5 max-sm:px-6'>
              <div className='mt-6 flex max-md:flex-col justify-between  items-center md:flex-row  w-[100%]'>
                <label htmlFor='semesters' className='font-semibold text-xl w-[100%]'>
                  Select Semester:
                </label>
                <Select
                  id='semesters'
                  className='max-md:w-[100%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
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
                  className='max-md:w-[100%] md:w-[57%] font-semibold md:ml-3 focus:outline-none'
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
            <form className=' text-black flex flex-col justify-center items-center w-[100%]' onSubmit={handleExcelSubmit}>
    
              <label className='mt-5 w-[80%] border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] inline-block cursor-pointer px-2  rounded-md'>
                <input type="file" className='w-[80%] hidden  bg-red-100 ' onChange={handleFile} />
                Upload Excel
              </label>

              <button className='mt-8 w-[80%] bg-blue-800 rounded-lg py-2 text-lg text-white cursor-pointer hover:bg-blue-500'>
                Add Students
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div >
  )
}