
import React from "react";
import img1 from '../../Images/firstSlider-1.png'
import img2 from '../../Images/Img2.png'
import img3 from '../../Images/stu.png'
import img4 from '../../Images/mam.png'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ImageSlider() {

    return (
        <div className="flex md:flex-row max-md:flex-col md:gap-x-10 gap-2 items-center justify-center bg-white">
            <div className="max-md:w-[90%] w-[70%] px-2 h-[70vh] flex justify-center items-center">
                <div className="rounded-md w-full h-max  py-2 shadow-lg ">
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
                    >
                        <div>
                            <img src={img4} className="h-96 w-full" /> {/* Use w-full to make the image cover the entire width */}
                        </div>
                        <div>
                            <img src={img3} className="h-96 w-full" />
                        </div>
                        <div>
                            <img src={img2} className="h-96 w-full" />
                        </div>
                        <div>
                            <img src={img1} className="h-96 w-full" />
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className='md:w-[40%] p-6 h-max'>

                <div className="w-[100%]  h-70  relative border-8 border-gray-400 bg-black rounded-lg p-3">
                    <div className="absolute  w-3 h-3 bg-black right-[99%] bottom-[99%] rounded-tl-lg"></div>
                    <div className="absolute w-2 h-2 bg-black top-0 right-0"></div>
                    <div className="absolute w-2 h-2 bg-black bottom-0 left-0"></div>
                    <div className="absolute w-3  h-3 bg-black top-[99%] left-[99%] rounded-br-lg"></div>

                    <h2 className="text-white text-lg font-semibold mb-1">Notice Board</h2>
                    <hr className="border-white border" />

                    <div className="mt-2 h-[250px] overflow-hidden">
                        <Marquee style={{ height: 'auto', overflowY: 'scroll' }}><p className="text-white ">Important announcement</p>
                            <marquee vspace="30px" direction="up" scrollamount="5"  > <br />
                                <p className='text-gray-200'>1. Lorem ipsum dolor sit amet.</p><br />
                                <p className="text-gray-200">2. Consectetur adipiscing elit.</p><br />
                                <p className="text-gray-200">3. Sed do eiusmod tempor incididunt.</p><br />
                                <p className="text-gray-200">4. Sed do eiusmod tempor incididunt.</p><br />
                                <p className="text-gray-200">5. New announcement here.</p><br />
                            </marquee>

                        </Marquee>
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