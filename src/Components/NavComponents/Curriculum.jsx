import React from 'react'
import img from '../../Images/logo_try.jpg'
import {Link} from 'react-router-dom'
function Curriculum() {
  return (
    <div className="w-[100%] min-h-[760px] flex flex-col justify-center items-center bg-blue-50" >
      <h1 className='text-2xl font-bold'>Curriculums</h1>
      <div className='w-[80%] py-5 grid grid-cols-1 min-[550px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 justify-items-center md:px-[5%]  mt-2 '>
       {/*  */}
        <div  className='p-4 shadow-xl rounded-md bg-white text-center  w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester I</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/1PzEo4UwHqObZ5PObPScdtWgEYgxRoSm0/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>
        
        <div  className='p-4 shadow-xl rounded-md bg-white text-center w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester II</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/1QGGLhbmyLHGRP7aLgDOKJZ26M3Z3_WmC/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>

        <div  className='p-4 shadow-xl rounded-md bg-white text-center w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester III</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/1ul5lC14hBRN-Il2L5wP7kiNR52s7P4Aa/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>

        <div  className='p-4 shadow-xl rounded-md bg-white text-center w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester IV</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/1stBnyMSidjR1xKVOTu0WceWbrc2bV8wf/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>

        <div  className='p-4 shadow-xl rounded-md bg-white text-center w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester V</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/19X3Tq0XnjBS7spqHNM8d_7i-Top4QfAu/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>

        <div  className='p-4 shadow-xl rounded-md bg-white text-center w-[100%]'>
          <div className='flex justify-center bg-blue-50 p-2 rounded-[50%]'>
            <img src={img} alt="" className='h-[100px] w-[100px] rounded-[50%] ' />
          </div>
          <div className='flex flex-col justify-between items-center  mt-2  rounded-md p-2'>
            <h2 className='font-semibold text-xl '>Semester VI</h2>
            <Link target='_blank' to='https://drive.google.com/file/d/1FCYBU6wtqqXcK-qpbu8sDP6V3jrF4vrC/view?usp=drive_link' className='p-2 px-5 bg-blue-700 hover:bg-blue-600 text-white w-max rounded-md mt-4'>click here</Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Curriculum
