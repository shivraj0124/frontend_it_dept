import React from 'react'
import img1 from '../../Images/hod.png'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
const HODDesk = () => {
    return (
        <div className="  w-[100%] md:px-[12%] max-md:px-[5%]  items-center justify-center py-12 bg-white">

            <div className="flex md:flex-row flex-col w-[100%] items-center justify-center md:gap-1 md:font-serif">

                <div className=" md:w-[70%] w-[80%] mt-6 flex justify-center items-center flex-col ">
                    <h1 className='text-black text-2xl   font-bold font-sans md:font-serif '>Message From HOD's Desk...</h1>
                    <LazyLoadImage className="rounded-md mt-2" src={img1} alt="" effect='blur'/>
                    <p className=' text-lg text-black mt-2 font-sans md:font-serif'>Dr Hemant Pradeshi,<br />Head of Department of IT</p>
                </div>
                <div className="w-[100%] mt-5 px-2">
                    <p className='font-bold text-black text-2xl'>Dear<span className='text-blue-700'> Colleagues and Students,</span></p>
                    <p className='text-lg mt-5 font-sans text-gray-500 flex justify-between'>The Department aims at addressing essential challenges faced by IT Industry, society and the academia. Every IT Industry is working on upcoming technologies like Artificial Intelligence, Machine Learning, Deep Learning, Blockchain, Internet of Things, Cloud computing, etc. Being an autonomous institute, we offer Outcome based Education to students in which curriculum is designed as per the present demand of the industry. Six months inplant training is part of our curriculum wherein students are placed in industry for training.

                        We believe in upholding our unceasing commitment to our students, helping them to learn, grow, develop, and achieve their goals in their pursuit to excel in their professional career.

                        Our goal has always been to build a strong academic foundation, discipline, mentoring, counseling, ethics, values, skill building, personality development, showcasing talent, stimulating creativity, alumni relations and much more...
            
                    </p>
                </div>
            </div>
        </div>

    )
}

export default HODDesk
