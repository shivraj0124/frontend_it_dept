// style={{background:'rgba(0,0,0,0.2)'}} backgroundImage:`url(${home_2})`,
import React, { useState, useEffect } from "react";
import img1 from '../Images/logo_try.jpg'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom'
// import home_2 from '../Images/home_2.jpg'
import { useNavigate } from 'react-router-dom';
import themeHook from "./Admin/ContextP";
import lottie from 'lottie-web';
import animationData1 from '../lottie/654L0pmYVj (1).json'

const Navbar = () => {
    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: document.getElementById('lottie-container1'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData1, // Your animation data
        });
        return () => anim.destroy(); // Clean up animation on component unmount
    }, []);
    const [nav, setNav] = useState(false);
    const { auth, username } = themeHook()
    const handleNav = () => {
        setNav(!nav);
    };

    const navigate = useNavigate()

    return (
        <div className='flex justify-between md:px-[10%] px-2  items-center h-max py-1 sticky top-0 z-40 text-black bg-blue-50 w-[100%]' >
            <div className="flex items-center gap-2 ">
 <img src={img1} onClick={() => navigate('/')} className='h-[60px] md:h-[60px] p-0 md:w-[60px] rounded-[50%] cursor-pointer ' />
                <h1 className='text-2xl font-mono text-blue-500' onClick={() => navigate('/')}>IT-DEPT</h1>

            </div>
            <ul className='hidden md:flex   font-semibold'>
                <Link className='ml-10 p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/' >Home</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/FacultyDetails'>Faculty</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Curriculum'>Curriculum</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Contact'>Contact</Link>
                {!auth?.user ? (
                    <Link to='/Login' className='p-4 hover:text-blue-400 h-max cursor-pointer'  >Login</Link>

                ) : (
                    <>
                        {auth?.user?.role === 2 ? (
                            <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin/Dashboard')} >
                                <li className='py-4 px-2 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer font-bold' >Admin</li>
                                <li className='mt-2 ml-0' >
                                    {/* <BiUserCircle size={40} /> */}
                                    <div className='  w-[50px] h-[50px]' id="lottie-container1" />
                                </li>

                            </div>
                            </>
                        ) : auth?.user?.role === 1 ? (
                            <>
                                <div className="flex flex-row">
                                    <Link className='p-4 pr-0 uppercase hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer font-bold' to='/Student/Profile' >{username}</Link>
                                    <li className="mt-2 cursor-pointer" >
                                        {/* <BiUserCircle onClick={() => navigate('/Student/Notes')} size={40} /> */}
                                                <div className='  w-[50px] h-[50px]' id="lottie-container1" />
                                    </li>


                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row ">
                                    <Link className='p-4 pr-0 font-bold uppercase hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Faculty/Profile' >Faculty</Link>
                                    <li className="mt-2 cursor-pointer" >
                                        {/* <BiUserCircle onClick={() => navigate('/Faculty')} size={40} /> */}
                                                    <div className='  w-[50px] h-[50px]' id="lottie-container1" />
                                    </li>
                                </div>
                            </>
                        )}
                    </>
                )}
            </ul>



            {/* mobile Nav */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? 'fixed left-0 top-0 w-[80%] h-full border-r ease-in-out duration-300 z-40 bg-gray-200 md:hidden' : 'ease-in-out duration-800 fixed left-[-100%] md:hidden'}>
                <div className="flex items-center gap-2 p-2" onClick={handleNav}>
                    <img src={img1} onClick={() => navigate('/')} className='h-[60px] md:h-[40px] p-0 md:w-[60px] rounded-[50%] cursor-pointer ' />
                    <h1 className='text-2xl font-mono text-blue-500' onClick={() => navigate('/')}>IT-DEPT</h1>
                </div>
                <div className={nav ? 'absolute ease-in-out top-20 font-semibold' : 'left-[-100%]'} >
                    <Link to='/'>
                        <li className='pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={handleNav}>Home</li>
                    </Link>
                    <Link to='/FacultyDetails'>
                        <li className='pt-1  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={handleNav}>Faculty</li>
                    </Link>
                    <Link to='/Curriculum'>
                        <li className='pt-1  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={handleNav}>Curriculum</li>
                    </Link>
                    <Link to='/Contact'>
                        <li className='pt-1  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={handleNav}>Contact</li>
                    </Link>

                    {!auth?.user ?
                        <Link to='/Login' className='pt-1  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={handleNav} >Login</Link>
                        :
                        <>
                            {auth?.user?.role === 2 ? (
                                <>
                                    <div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin/Dashboard')} >
                                        <li className='mt-2 ml-6' >

                                        </li>
                                        <li className='pt-4  text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'>Admin</li>
                                    </div>

                                </>
                            ) : auth?.user?.role === 1 ? (
                                <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/Student/Notes')} >
                                    <li className='mt-2 ml-6' >

                                    </li>
                                    <li className='pt-4 font-bold uppercase text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'  >{username}</li>
                                </div>

                                </>
                            ) : (
                                <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/Faculty')} >
                                    <li className='mt-2 ml-6' >

                                    </li>
                                    <li className='pt-4 font-bold uppercase text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'>{username}</li>
                                </div>

                                </>
                            )}
                        </>

                    }

                </div>

            </ul>

        </div>
    );
};

export default Navbar;
