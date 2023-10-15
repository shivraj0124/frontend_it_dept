import React from 'react'
import Login from './Login'
import FacultyLogin from './FacultyLogin'
import AdminLogin from './AdminLogin'
import themeHook from '../Admin/ContextP'
function LoginForm() {
  const { findForm, setFindForm } = themeHook()
  // const navigate =useNavigate()
  return (
    <div className=' mt-0 h-screen flex justify-center x bg-blue-50 overflow-y-auto'>
      <div className='flex flex-col fixed  bg-[#fcfcfe] shadow-xl rounded-xl mt-5 max-md:mt-2 pb-9 max-md:w-[90%] justify-center items-center w-max h-max py-5 px-8'>
        <h1 className='font-semibold text-gray-500'>Login As</h1>

        <div className='flex flex-row max-md:flex-col max-md:gap-y-2  justify-between items-center w-[100%] mt-6'>
          <button className={findForm === 'S' ? 'p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]' :'p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]'} onClick={() => setFindForm('S')} >Student</button>
          <button className={findForm === 'F' ? 'p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]':'p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]'} onClick={() => setFindForm('F')}>Faculty</button>
          <button className={findForm === 'A' ? 'p-2 px-4 drop-shadow-lg bg-blue-600 text-white basis-1/4 rounded-md max-md:w-[100%]':'p-2 px-4 bg-white text-blue-500 drop-shadow-lg hover:bg-blue-600 hover:text-white basis-1/4 rounded-md max-md:w-[100%]'} onClick={() => setFindForm('A')}>Admin</button>
        </div>
        <hr className='text-gray-300 h-[1px] mt-12 max-md:mt-2 w-[100%] bg-gray-200' />
        {/* style={{ boxShadow:' 0px 0px 16px -1px rgba(199,199,199,1)'}} */}
        <div className='w-[96%] rounded-md mt-8 max-md:mt-2 ' >
          {findForm === 'A' ? <AdminLogin /> :
            findForm === 'F' ? <FacultyLogin /> :
              <Login />}
        </div>


      </div>

    </div>
  )
}

export default LoginForm
