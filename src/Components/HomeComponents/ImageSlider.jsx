import React from "react";
import img1 from '../../Images/firstSlider-1.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ImageSlider() {
    return (
        <>
            <div className="w-[100%]  h-screen  mr-0 flex justify-center items-center  bg-white " >
                <div className="rounded-md md:w-[60%] p-2 border-2 border-gray-300  shadow-xl">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        interval={2000}
                        showStatus={false}//1 of 3
                        showThumbs={false}
                        showArrows={true}
                        // stopOnHover={true}
                         className="rounded-md">
                        <div>
                            <img src={img1} className="h-96 w-[100%]" />
                        </div>
                        <div>
                            <img src={img1} className="h-96 w-[100%]" />
                        </div>
                        <div>
                            <img src={img1} className="h-96 w-[100%]" />
                        </div>
                        
                       
                        
                        
                    </Carousel>
                </div>
            </div>
        </>
    )
}
