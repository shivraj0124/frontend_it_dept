
import React from 'react'
import img1 from '../../Images/FORUM.png'
import { useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
function About() {
    const navigate = useNavigate()
    return (
        <div className="w-[100%] flex flex-col h-full px-[12%] pb-12 bg-white ">
            <div className="mt-10">
                <div className="flex flex-col md:flex-row">

                    <div className="ml-0 md:w-[100%] max-w-[100%]">

                        <p className="text-lg font-sans md:font-serif max-md:text-md text-gray-500 md:mr-[20%]">
                            <h1 className="text-black mb-4 font-bold">
                                <TypeAnimation
                                    sequence={[
                                        ' Hello User... ',
                                        1000,
                                        ' Welcome To IT Department...',
                                        2000,
                                    ]}
                                    wrapper="span"
                                    speed={30}
                                    style={{ fontSize: '1.5rem', display: 'inline-block', paddingLeft: '5px' }}
                                    repeat={Infinity}
                                />
                            </h1>
                            The Department of Information Technology was established in 2001.the Information Technology department will strive to achieve excellence in education so as to enable students to establish themselves as world-class technicians. The department will provide vibrant infrastructure and software application tool sets to empower them with the proficiency and knowledge required to excel in the dynamic field of IT and to pursue higher education. Information Technology department is on a third floor of main building of Gpmumbai..
                        </p>
                        <button className="w-max mt-8 py-2 px-6 bg-blue-50 border border-blue-700 hover:bg-blue-900 text-blue-700 font-semibold rounded-md" onClick={() => navigate('/Login')}>
                            Explore More
                        </button>
                    </div>

                    <div className="mt-12 ">
                        <img className="rounded-md w-[110%] h-auto" src={img1} alt="" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default About