import React from 'react'
import ITLogo from '../../Images/logo_try.jpg'
import GPMLogo from '../../Images/GPM-LOGO.png'
import home_gif from '../../Images/home_4.gif'
import rightImg from '../../Images/rightImgBg.png'
function Top() {
  return (
    <>
      <div className='w-[100%] h-screen max-h-screen  md:pt-5 bg-blue-50' >
        <div className='px-[10%]'>
          {/* <div className='absolute top-0 left-0 w-[100%] h-screen z-0' style={{ background: 'rgba(0,0,0,0.7)' }}></div> */}
          <div className='flex md:flex-row-reverse flex-col-reverse justify-center items-center z-10 max-md:gap-y-16 max-md:pt-20' >
            <div className='h-[80%] w-[80%] '>
             
              <img src={rightImg} alt="" className='h-[100%] w-[100%] ' />
            </div>
            <div className='flex flex-col text-center justify-center items-center w-[100%] h-[100%]'>
              <div className='flex flex-row gap-2 '>
                <img src={GPMLogo} alt="logo-GPM" className='h-[80px] w-[80px] rounded-[50%]' />
                {/* <img src={ITLogo} alt="logo-IT" className='md:hidden rounded-[50%] w-[65px] h-[65px] mt-0 object-cover ' /> */}
              </div>
              <div>
                <h1 className='text-2xl font-semibold text-[#0099ff]'>Government Polytechnic Mumbai</h1>
                <h1 className='md:text-3xl text-3xl font-bold text-slate-800'>Department Of Information Technology</h1>
                <h4 className='text-gray-700 text-xl'>(An autonomous Institute of Government of Maharashtra)</h4>
              </div>
            </div>
          </div>
        </div>
        <div>
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0099ff" fill-opacity="1" d="M0,32L30,37.3C60,43,120,53,180,90.7C240,128,300,192,360,192C420,192,480,128,540,106.7C600,85,660,107,720,128C780,149,840,171,900,192C960,213,1020,235,1080,234.7C1140,235,1200,213,1260,208C1320,203,1380,213,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
          </svg>
          
        </div>
      </div>
    </>
  )
}

export default Top
