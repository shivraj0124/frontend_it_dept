import React from 'react'
import img1 from '../../Images/FORUM.png'

import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
const Forum = () => {
    
    return (
        <div className="w-[100%]  flex flex-col md:flex-row px-4  h-full pb-12 items-center justify-center bg-gray-100 md:px-[10%]">

            <div className=" font-sans md:font-serif flex-col w-[40%] max-md:w-[100%]  items-center justify-center mt-10">

                <h1 className="text-black mb-4 font-bold max-md:px-2 text-xl">
                    <TypeAnimation
                        sequence={[
                            ' Hello viewers... ',
                            1000,
                            ' Welcome To Query Resolution community...',

                            2000,
                        ]}
                        wrapper="span"
                        speed={30}
                        style={{ fontSize: '1.3rem', display: 'inline-block', paddingLeft: '5px' }}
                        repeat={Infinity}
                    />
                </h1>
                <p className=" text-md font-sans md:font-serif max-md:text-md md:ml-12 text-gray-500 md:mr-[20%]  max-md:px-2">

                    <ul className='list-disc pl-4 text-lg'>
                        <li>Login First To Community.</li>
                        <li>Then u able to ask Qustions.</li>
                        <li>And able to Answer Too.</li>
                    </ul>
                </p>

            </div>

            <div className=" w-[45%] max-md:w-[100%] mt-10 max-md:mt-5  max-md:ml-0 px-4 flex flex-col ">
                <img className="rounded-md w-[90%] mt-5    h-auto" src={img1} alt="" />
                <p className='text-md mt-5 font-sans md:font-serif text-gray-500'>A Query Resolution Community is an online platform where users can post questions or queries on various topics and receive answers and solutions from other community members. It serves as a collaborative and knowledge-sharing space where individuals seek assistance or information from a broader audience...</p>
                <Link to="https://forumgpm.netlify.app/" target='_blank'>
                    <button className="w-max mt-8 mb-5 py-2 px-6 focus:outline-none bg-blue-700 hover:bg-blue-500 text-white rounded-md">
                        Start Community
                    </button>
                </Link>

            </div>

        </div>



    )
}

export default Forum