import React,{useEffect,useState,} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import img from '../../Images/logo_try.jpg'
import no_data_found from '../../Images/no_data_found.png'
import themeHook from '../Admin/ContextP'
import '../Admin/AdminComponents.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
function StudentNotices() {
    const [loader, setLoader] = useState(true);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [noticeList, setNoticeList] = useState([]);
    const [semesterId, setSemesterId] = useState('')
    const [shiftId, setShiftId] = useState('')
    const [open, setOpen] = useState(false);
    const [shiftPlaceholder, setShiftPlaceholder] = useState('')
    const [semesterPlaceholder, setSemesterPlaceholder] = useState('')
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const {studentDetails}=themeHook()

    const onOpenModal = (notice) => {
        setOpen(true);
        setTitle(notice.title);
        setLink(notice.link);
        setDescription(notice.description);
        setSemesterPlaceholder(notice.semester.name)
        setShiftPlaceholder(notice.shift.name)
        
    };

    const onCloseModal = () => {
        setOpen(false);
        setTitle('');
        setLink('');
        setDescription('');
        setSemesterPlaceholder('')
        setShiftPlaceholder('')
      
    };
    const getNotices = async (semesterId, shiftId) => {
        try {
            const response = await axios.get(`${urlBackend}/api/v2/get-notices`, {
                params: {
                    semesterId: semesterId,
                    shiftId: shiftId,
                },
            });

            if (response.data.success) {
                setNoticeList(response.data.notice);
                setLoader(false);
            } else {
                console.error('Failed to fetch Notice details');
            }
            setLoader(false);
        } catch (error) {
            console.error('Error:', error);
        }

    };

    useEffect(() => {
        setShiftId(studentDetails[0].semester?._id)
        setSemesterId(studentDetails[0].semester?._id)
        getNotices(studentDetails[0].semester?._id, studentDetails[0].shift?._id)
    }, [semesterId]);
  return (
      <div className='flex flex-col'>
          {loader ? (
              <div className="flex justify-center items-center mt-32">
                  <BarLoader color="blue" />
              </div>
          ) : !loader && noticeList?.length <= 0 ? (<div className="flex justify-center items-center mt-10">
              <img src={no_data_found} alt="" className='w-[300px] h-[400px]' />
          </div>) : (
              <div className='grid lg:grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 mt-5 px-2'>
                  {noticeList.map((notice, index) => {
                      return <>
                          <div key={index} className='p-4 shadow-xl rounded-md bg-white'>
                              <div className='flex justify-center bg-blue-50 p-2 rounded-md'>
                                  <img src={img} alt="" className='h-[100px] w-[100px] ' />
                              </div>
                              <div className='flex flex-col justify-center items-center mt-2 bg-blue-50 rounded-md'>
                                  <h2 className='font-semibold text-xl '>{notice.title}</h2>

                                          <div className="mt-4 max-md:text-sm flex flex-row justify-between items-center max-lg:gap-x-2 lg:gap-x-4 w-[100%]">
                                              {notice.link.length === 0 ? '' : <Link target="_blank" to={notice.link} className='text-center py-1 w-[100%]  bg-blue-700 text-white'>
                                                  Link
                                              </Link>
                                              }
                                              <button className='w-[100%] py-1  bg-blue-700 text-white text-center' onClick={() => onOpenModal(notice)}>
                                                Full Notice
                                              </button>
                                            </div>                                                                             
                              </div>
                          </div>
                      </>
                  })
                  }
              </div>
          )}
          {/*  min-[300px]:w-[220px] min-[350px]:w-[300px] */}
          <Modal open={open} onClose={onCloseModal}  classNames={{ modal: 'updateModal' }}>
              <div className='p-5 bg-white  w-[100%] max-sm:p-0'>
                  <h1 className='text-center text-2xl underline underline-offset-4 mt-4 font-bold'>Notice</h1>
                  <div className='flex flex-col  w-[100%]  justify-center mt-6 '>
                    <div className='w-[100%] flex flex-row justify-between max-md:text-sm font-semibold'>
                        <h3>{semesterPlaceholder}</h3>
                        <h3>{shiftPlaceholder}</h3>
                    </div>
                    <h1 className='font-bold text-center text-xl'>{title}</h1> 
                    
                      {link.length === 0 ? '' : <Link target="_blank" to={link} className='mt-5 w-[100%] text-blue text-blue-700'>
                          {link}
                      </Link>
                      }
                    <p className='mt-5'>
                        {description}
                    </p>
                  </div>               
              </div>

          </Modal>
      </div>
      
  )
}

export default StudentNotices
