import React from 'react'

function About() {
    return (
        <div className="w-[100%] py-20 md:py-16  h-screen md:px-[10%] mr-0 text-black bg-white flex justify-center items-center " >
            <div className='flex md:flex-row max-md:flex-col gap-x-10'>
                <div className='h-max p-6 md:w-[70%] bg-sky-50 rounded-md   shadow-xl '>
                    <h1 className='text-5xl font-semibold max-md:text-center ml-1  text-slate-800 underline underline-offset-4 decoration-blue-700'>About</h1>
                    <p className='p-2 mt-5 text-md md:text-lg text-gray-500'>The department of Information Technology was established in 2001 with intake capacity of 40 students. In 2007 intake capacity is increased to 60 students. In 2011 minority shift (second shift) is started with intake capacity of 60 students. Information Technology department will strive to achieve excellence in education so as to enable students to establish themselves as world-class technicians. The department will provide vibrant infrastructure and software application tool sets to empower them with the proficiency and knowledge required to excel in the dynamic field of IT and to pursue higher education.
                       
                    </p>
                </div>
                {/* Notice Board */}
                <div className='md:w-[30%] p-6 h-max'>
                    {/* <h1 className='text-xl font-bold'>Notice Board</h1>
                    <div className='mt-3 p-5 bg-gray-300 h-max'>
                        <ul>
                            <li>Result Declared</li>
                            <li>Result Declared</li>
                            <li>Result Declared</li>
                        </ul>
                    </div> */}
                    <div className="w-[100%]  h-58  relative border-8 border-[#B87333] bg-black rounded-lg p-3">
                        <div className="absolute  w-3 h-3 bg-black right-[99%] bottom-[99%] rounded-tl-lg"></div>
                        <div className="absolute w-2 h-2 bg-black top-0 right-0"></div>
                        <div className="absolute w-2 h-2 bg-black bottom-0 left-0"></div>
                        <div className="absolute w-3  h-3 bg-black top-[99%] left-[99%] rounded-br-lg"></div>

                        <h2 className="text-white text-lg font-semibold mb-1">Notice Board</h2>
                        <hr className="border-white border" />

                        <div className="mt-2 overflow-hidden">
                            <Marquee>
                                <p className="text-white">Important announcement<br /><br /> 1. Lorem ipsum dolor sit amet.</p><br />
                                <p className="text-white">2. Consectetur adipiscing elit.</p><br />
                                <p className="text-white">3. Sed do eiusmod tempor incididunt.</p><br />
                                {/* Add more announcement lines here */}
                            </Marquee>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
const Marquee = ({ children }) => {
    return (
        <div className="marquee">
            <div className="marquee-content">
                {children}
            </div>
        </div>
    );
};
export default About
