import React, { useState } from 'react'
import img1 from '../../Images/g1.png'
import img2 from '../../Images/g2.png'
import img3 from '../../Images/g3.png'
import img4 from '../../Images/g4.png'
import img5 from '../../Images/g5.png'
import img6 from '../../Images/kho-kho_runnerUp.png'

import Academic_toppers from '../../Images/Academic_toppers.png'
import { Link } from 'react-router-dom'

function PhotoGallery() {
    const [set, setState] = useState(0)

    return (
        <div className="w-[100%] h-max  bg-white flex flex-col" >
            <h1 className='text-4xl mt-10 font-semibold text-center  '>Achievements</h1>
            <div className='flex flex-row flex-start   text-md md:text-2xl mt-5'>



            </div>
            <div className='flex flex-col justify-center items-center'>
                {
                    set === 0 ? <>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='h-max w-[90%] mt-10 grid lg:grid-cols-3 xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-y-5 md:gap-10 max-md:grid-cols-1'>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img2} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img1} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img3} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img4} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img5} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>
                                <div className='p-5 w-[100%] md:w-[300px]  bg-white shadow-xl rounded-md' >
                                    <img src={img6} alt="" className='w-[100%] rounded-md' />
                                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                                </div>



                            </div>
                            <Link className='py-2 px-10 mt-10 bg-blue-700 w-max rounded-md text-white font-semibold hover:bg-blue-400' to='/MiniphotoG' >Show More...</Link>
                            {/* <button onClick={handleButtonClick} className='py-2 px-10 mt-10 bg-white0 w-max rounded-md text-white font-semibold hover:bg-blue-400'>Show More...</button> */}
                        </div>
                    </> :
                        <>
                            <img src={Academic_toppers} alt="" className='flex mt-10 justify-center items-center' />
                        </>
                }
            </div>
        </div>
    )
}

export default PhotoGallery