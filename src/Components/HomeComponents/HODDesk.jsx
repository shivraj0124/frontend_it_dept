import React from 'react'
import img1 from '../../Images/hod.png'
const HODDesk = () => {
    return (
        <div className="  w-[100%] md:px-[10%] px-2 pb-12 items-center justify-center py-5 bg-gray-100">

            <div className="flex md:flex-row flex-col w-[100%] items-center justify-center gap-3 md:font-serif">

                <div className=" md:w-[70%] w-[80%] mt-6 ">
                    <h1 className='text-black text-2xl  mb-5 ml-0 font-bold font-sans md:font-serif '>Message From HOD's Desk...</h1>
                    <img className="rounded-md w-[80%] " src={img1} alt="" />
                    <p className=' text-lg text-black md:ml-12 ml-4 mt-2 font-sans md:font-serif'>Dr Hemant Pradeshi,<br />Head of Department of IT</p>
                </div>
                <div className="w-[100%] mt-5 ">
                    <p className='font-bold text-black text-2xl'>Dear<span className='text-blue-700'> Colleagues and Students,</span></p>
                    <p className='text-md mt-5 font-sans '>The department aims at addressing essential challenges faced by IT Industry, society and the academia. Every IT Industry is working on upcoming technologies like Artificial Intelligence, Machine Learning, Deep Learning, Blockchain, Internet of Things, Cloud computing, etc. Being an autonomous institute, we offer Outcome based Education to students in which curriculum is designed as per the present demand of the industry. Six months inplant training is part of our curriculum wherein students are placed in industry for training.

                        We believe in upholding our unceasing commitment to our students, helping them to learn, grow, develop, and achieve their goals in their pursuit to excel in their professional career.

                        Our goal has always been to build a strong academic foundation, discipline, mentoring, counseling, ethics, values, skill building, personality development, showcasing talent, stimulating creativity, alumni relations and much more...
            
                    </p>
                </div>
            </div>
        </div>

    )
}

export default HODDesk