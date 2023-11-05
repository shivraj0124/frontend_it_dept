import React, { useEffect, useState } from 'react'
import Academic_toppers from '../../Images/Academic.png'
import axios from 'axios'
import BarLoader from 'react-spinners/BarLoader'
const MiniphotoG = () => {
    const [achievements, setAchievements] = useState([])
    const [academicAchievements, setAcademicAchievements] = useState([])
    const [loader, setLoader] = useState(true)
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const getAchievements = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v3/get-achievements`)
            if (response.data.success) {
                setAchievements(response.data.achievements)
            } else {
                console.log("Error")
            }
            setLoader(false)
        } catch {
            console.log("error")
        }
    }
    const getAcademicAchievements = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v3/get-academicAch`)
            if (response.data.success) {
                setAcademicAchievements(response.data.images)
                console.log(academicAchievements,'hello')

            } else {
                console.log("Error")
            }
            setLoader(false)
        } catch {
            console.log("error")
        }
    }
    useEffect(() => {
        getAcademicAchievements()
        getAchievements()
    }, [])
    return (
        <div className='flex flex-col items-center justify-center text-center pb-10 '>
            <h3 className='text-3xl font-semibold mt-10 underline underline-offset-4 decoration-sky-600  '> Academic Achievements</h3>
            <div className='h-max w-[80%] mt-10 grid  max-lg:grid-cols-1 lg:grid-cols-2 justify-items-center'>
                {academicAchievements?.map((academicAchievement,index) => {
                   return <div key={index} className='flex flex-col justify-center items-center'>
                        <h2 className='font-semibold text-2xl'>{academicAchievement.title}</h2>
                        <img src={academicAchievement.photo} alt="" className='flex  justify-center items-center w-[90%] h-[100%] max-md:h-max max-md:w-max' />
                    </div>
                })
                }
            </div>
            <h3 className='text-3xl font-semibold mt-10 underline underline-offset-4 decoration-sky-600 mb-2 '> Other Achievements</h3>

            <div className='h-max w-[80%] mt-10 grid lg:grid-cols-3 xl:grid-cols-3 max-lg:grid-cols-2 max-md:gap-y-5 md:gap-10 max-md:grid-cols-1 justify-items-center'>
                {loader ? <div className='flex justify-center items-center mt-32'>
                    < BarLoader color="blue"

                    />
                </div> :
                    (achievements?.map((achievement, index) => {
                        return <div className='p-5 w-[100%]  md:w-[350px]   bg-white shadow-xl rounded-md' >
                            <img src={achievement.photo} alt="" className='w-[100%]  h-[300px] rounded-md' />
                            <h1 className='text-2xl mt-2 font-semibold'>{achievement.title}</h1>
                            <p className='mt-4'>{achievement.description}</p>
                        </div>
                    }))}
            </div>
        </div>
    )
}

export default MiniphotoG