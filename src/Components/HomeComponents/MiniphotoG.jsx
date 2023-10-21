import React from 'react'
import Academic_toppers from '../../Images/Academic.png'
import img1 from '../../Images/kho-kho_runnerUp.png'

const MiniphotoG = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-3xl font-semibold mt-10 underline underline-offset-4 decoration-sky-600  '> Academic Achievements</h3>
            <img src={Academic_toppers} alt="" className='flex mt-10 justify-center items-center w-[80%] h-[50%]' />
            <h3 className='text-3xl font-semibold mt-10 underline underline-offset-4 decoration-sky-600 mb-2 '> Sports Achievements</h3>
            <div className='flex flex-row mt-2'>

                <div className='p-5 w-[100%] md:w-[300px] rounded-md bg-blue-100 ' >
                    <img src={img1} alt="" className='w-[100%] rounded-md' />
                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                </div>
                <div className='p-5 w-[100%] md:w-[300px] rounded-md bg-blue-100' >
                    <img src={img1} alt="" className='w-[100%] rounded-md' />
                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                </div>
                <div className='p-5 w-[100%] md:w-[300px] rounded-md bg-blue-100' >
                    <img src={img1} alt="" className='w-[100%] rounded-md' />
                    <p className='mt-4'>Boys Kho-Kho team stood as Runner-up in the inter college zonal Tournament.</p>
                </div>
            </div>
        </div>
    )
}

export default MiniphotoG