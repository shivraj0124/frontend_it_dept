import { useState, useEffect } from 'react'
// import { Data } from './Components/Data'
import * as XLSX from 'xlsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import '../Components/Admin/AdminComponents.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
function TestUpload() {
    
    // on change states
    const [openAdd, setOpenAdd] = useState(false);
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [semesterList, setSemesterList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [selectedSem, setSelectedSem] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const onOpenAddModal = () => {
        setOpenAdd(true)
    }
    const onCloseAddModal = () => {
        setOpenAdd(false)
    }
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

    const allShifts = async (selectedSemesterId) => {
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
    const handleChangeSemester = (value) => {
        setSelectedSem(value);
        setSelectedShift('');
        allShifts(value);
    };

    const handleChangeShift = (value) => {
        setSelectedShift(value);
    };
    // submit
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
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }
    
    // submit function
    const handleSubmit = async (e) => {
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
                const response = await axios.post(`${urlBackend}/api/v1/upload-excel-file`, { data: JSON.stringify(data),semShift:{Semester:selectedSem,Shift:selectedShift} })
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
        <div className="flex flex-col justify-center px-5">
            <button onClick={onOpenAddModal}>upload excel</button>
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
                        <form className=' text-black flex flex-col justify-center items-center w-[100%]' onSubmit={handleSubmit}>
                            {/* <input type="text" className='text-xl font-semibold placeholder:text-slate-500 border-b-2 border-blue-300  hover:border-blue-900 focus:border-blue-900 focus:outline-none w-[80%] my-2' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required /> */}
                            <br />
                            <label className='w-[80%] border-blue-900 text-blue-900 font-semibold bg-blue-300 hover:bg-blue-600 hover:text-white py-[6px] inline-block cursor-pointer px-2  rounded-md'> 
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

        </div>
    );
}

export default TestUpload;