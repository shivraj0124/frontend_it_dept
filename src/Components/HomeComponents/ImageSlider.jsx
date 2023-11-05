
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
import FadeIn from 'react-fade-in';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function ImageSlider() {
    const urlBackend = import.meta.env.VITE_BACKEND_API
    const [imageList, setImageList] = useState([])
    const [noticeList, setNoticeList] = useState([])
    const [marqueeStopped, setMarqueeStopped] = useState(false);
    const fetchImages = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-imageSlider`);
            const data = response.data;

            console.log(data)
            if (data.success) {
                setImageList(data.images);

            } else {
                console.log('Failed to fetch Images');
            }
            // setLoader(false)
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to fetch Images')

        }
    }
    const fetchNotices = async () => {
        try {
            const response = await axios.get(`${urlBackend}/api/v1/get-notices`);
            const data = response.data;

            console.log(data)
            if (data.success) {
                setNoticeList(data.notice);

            } else {
                console.log('Failed to fetch Images');
            }
            // setLoader(false)
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to fetch Images')

        }
    }
    const handleMarqueeMouseEnter = () => {
        setMarqueeStopped(true); // Pause marquee on mouse enter
    };

    const handleMarqueeMouseLeave = () => {
        setMarqueeStopped(false); // Resume marquee on mouse leave
    };
    // Ensure the DOM is fully loaded before running JavaScript
  
    useEffect(() => {
        fetchImages()
        fetchNotices()
    }, [])

    return (
        <div className="flex md:flex-row max-md:flex-col md:px-[15%] md:gap-2 items-center justify-center bg-white">
            <div className="max-md:w-[90%] w-[70%]  h-[70vh] flex justify-center items-center">
                <div className="rounded-md w-full h-max shadow-lg  ">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        interval={2000}
                        showStatus={false} // 1 of 3
                        showThumbs={false}
                        showArrows={true}
                        // stopOnHover={true}
                        className="rounded-md cursor-pointer"
                        style={{ width: '100%', height: '100%' }} // Set width and height to 100%
                    >{imageList?.length === 0 ? 'No Data' :
                        imageList?.map((image, index) => (
                            <FadeIn>
                                <LazyLoadImage src={image.photo} className="h-[400px] w-[100%] rounded-md p-0" effect="blur" /> {/* Use w-full to make the image cover the entire width */}
                            </FadeIn>
                        ))
                        }
                    </Carousel>
                </div>
            </div>
            <div className='md:w-[40%] p-6 h-max'>

                <div className="w-[300px] max-[320px]:w-[100%]  h-70  relative border-8 border-gray-400 bg-black rounded-lg p-3">
                    <div className="absolute  w-3 h-3 bg-black right-[99%] bottom-[99%] rounded-tl-lg"></div>
                    <div className="absolute w-2 h-2 bg-black top-0 right-0"></div>
                    <div className="absolute w-2 h-2 bg-black bottom-0 left-0"></div>
                    <div className="absolute w-3  h-3 bg-black top-[99%] left-[99%] rounded-br-lg"></div>

                    <h2 className="text-white text-lg font-semibold mb-1">Notice Board</h2>
                    <hr className="border-white border" />

                    <div className="mt-2 h-[250px] overflow-hidden w-[90%] " >
                        <div ><p className="text-white " >Important announcement</p>
                            <marquee direction="up"
                                id="marquee_running"
                                onMouseEnter={handleMarqueeMouseEnter}
                                onMouseLeave={handleMarqueeMouseLeave}
                                scrollamount={marqueeStopped ? "0" : "2"}>
                                
                                {
                                    noticeList.length === 0 ? 'No data' :
                                        noticeList?.map((notice, index) => (
                                            <><p className="text-gray-200">{notice.title}</p><br />
                                                </>
                                        ))
                                }
                            </marquee> 
                        


                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
