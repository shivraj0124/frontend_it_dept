import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BarLoader from 'react-spinners/BarLoader'
function PhotoGallery() {

    const [achievements, setAchievements] = useState([])
    const [loader, setLoader] = useState(true)
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const getAchievements = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v3/get-achievements`)
            if (response.data.success) {
                setAchievements(response.data.achievements)
                console.log(achievements)
            } else {
                console.log("Error")
            }
            setLoader(false)
        } catch {
            console.log("error")
        }
    }
    useEffect(() => {
        getAchievements()
    }, [])
    return (
        <div className="w-[100%] h-max  bg-white flex flex-col  md:px-[10%]" >
            <h1 className='text-4xl mt-10 font-semibold text-center  '>Achievements</h1>

            <div className='flex flex-col justify-center items-center '>

                <div className={loader ? 'py-20':'h-max w-[90%]  mt-10 grid lg:grid-cols-3 xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-y-5  max-md:grid-cols-1  '}>
                    {loader ? <div className=''>
                        < BarLoader color="blue"/>
                    </div> : 
                        (achievements?.map((achievement, index) => {
                            return <div className='p-5 w-[100%] md:w-[350px]  bg-white shadow-xl rounded-md' >
                                <img src={achievement.photo} alt="" className='w-[100%] h-[300px] rounded-md' />
                                <h1 className='text-2xl mt-2 font-semibold'>{achievement.title}</h1>
                                <p className='mt-4 text-[16px]'>{achievement.description}</p>
                            </div>
                        }))}
               </div>
                <Link className='py-2 px-10 mt-10 bg-blue-700 w-max rounded-md text-white font-semibold hover:bg-blue-900' to='/MiniphotoG' >Show More...</Link>
            </div>
        </div>
    )
}

export default PhotoGallery