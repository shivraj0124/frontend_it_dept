// style={{background:'rgba(0,0,0,0.2)'}} backgroundImage:`url(${home_2})`,
import React, { useState } from "react";
import img1 from '../Images/logo_try.jpg'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import home_2 from '../Images/home_2.jpg'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../Components/Authcontext";
const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };
    // const handleLogOut = () => {
    //     setauth({
    //         user: null,
    //         token: "",
    //     })
    //     localStorage.removeItem("auth");
    //     navigate('/')
    // }
    return (
        <div className='flex justify-between items-center h-20 w-[100%] mt-0 md:px-20 px-2 sticky top-0 z-40 text-black bg-blue-50' >
            <div className="flex items-center gap-2 ">
            <img src={img1} onClick={() => navigate('/')} className='h-[60px] md:h-[60px] p-0 md:w-[60px] rounded-[50%] cursor-pointer ' />
                <h1 className='text-2xl font-mono text-blue-500'>IT-DEPT</h1>
            </div>
            <ul className='hidden md:flex'>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/' >Home</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/About'>About</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/FacultyDetails'>Faculty</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Curriculum'>Curriculum</Link>
                <Link className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Contact'>Contact</Link>
                {/* {!auth?.user ? ( */}
                    <Link className='p-4 hover:text-blue-400 h-max cursor-pointer' to='/Login' >Login</Link>
                {/* ) : (
                    <>
                        {auth?.user?.role === 1 ? (
                            <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin')} >
                                <li className='p-4 hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' >Admin</li>
                                <li className='mt-2 ml-0' >
                                    <BiUserCircle size={40} />
                                </li>

                            </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-row">
                                    <Link className='p-4 pr-0 font-bold uppercase hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' to='/Profile' >{auth?.user?.username}</Link>
                                    <li className="mt-2 cursor-pointer" >
                                        <BiUserCircle onClick={() => navigate('/profile')} size={40} />
                                    </li>


                                </div>
                            </>
                        )} */}
                    {/* </> */}
                {/* )} */}
            </ul>



            {/* mobile Nav */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? 'fixed left-0 top-0 w-[80%] h-full border-r ease-in-out duration-300 z-40 bg-gray-200 md:hidden' : 'ease-in-out duration-800 fixed left-[-100%] md:hidden'} onClick={handleNav}>
                <div className="flex items-center gap-2">
                    <img src={img1} onClick={() => navigate('/')} className='h-[60px] md:h-[40px] p-0 md:w-[60px] rounded-[50%] cursor-pointer ' />
                    <h1 className='text-2xl font-mono'>IT-DEPT</h1>
                </div>
                <div className={nav ? 'absolute ease-in-out top-20' : 'left-[-100%]'} onClick={handleNav}>
                    <Link to='/'>
                        <li className='pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' >Home</li>
                    </Link>
                    <Link to='About' >
                        <li className='pt-4 pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'>About</li>
                    </Link>
                    <Link to='/Faculty'>
                        <li className='pt-4  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'>Faculty</li>
                    </Link>
                    <Link to='/Curriculum'>
                        <li className='pt-4  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' >Curriculum</li>
                    </Link>
                    <Link to='/Contact'>
                        <li className='pt-4  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer'>Contact</li>
                    </Link>
                    {/* {!auth?.user ? ( */}
                        <Link to='/Login'>
                            <li className='pt-4  pl-8 text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' >Login</li>
                        </Link>
                    {/* ) : (
                        <>
                            {auth?.user?.role === 1 ? (
                                <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/Admin')} >
                                    <li className='mt-2 ml-6' >
                                        <BiUserCircle size={40} />
                                    </li>
                                    <li className='pt-4  text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={() => navigate('/Admin')} >Admin</li>
                                </div>
                                    <button onClick={handleLogOut} className="w-max mt-16 ml-6 px-6 h-10 rounded-md bg-yellow-300 hover:bg-[#ebeb5a]">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <><div className='flex flex-row cursor-pointer' onClick={() => navigate('/profile')} >
                                    <li className='mt-2 ml-6' >
                                        <BiUserCircle size={40} />
                                    </li>
                                    <li className='pt-4 font-bold uppercase text-black hover:underline hover:underline-offset-4 decoration-blue-500 cursor-pointer' onClick={() => navigate('/profile')} >{auth?.user?.username}</li>
                                </div>
                                    <button onClick={handleLogOut} className="w-max mt-16 ml-6 px-6 h-10 rounded-md bg-yellow-300 hover:bg-[#ebeb5a]">
                                        Logout
                                    </button>
                                </>
                            )}
                        </>
                    )} */}
                </div>


            </ul>
        </div>
    );
};

export default Navbar;


