import Room from "@/dto/Room";
import {SwiperSlide} from "swiper/react";
import "@/components/CardView.css"
import Image from "next/image";

export default function CardView({roomDto}: Room) {

    return (
        <div className="cardview-container">
            <div className="cardview_vertex1"></div>
            <div className="cardview_vertex1-1"></div>
            <div className="cardview_vertex2"></div>
            <div className="cardview_vertex2-1"></div>
            <div className="cardview_vertex3"></div>
            <div className="cardview_vertex3-1"></div>
            <div className="cardview_vertex4"></div>
            <div className="cardview_vertex4-1"></div>
            <div className="cardview-wrapper bg-gray-700">
                <div className="h-full">
                    <div className="h-full w-full p-8">
                        <div className="text-gray-400 text-left text-sm">
                            {"#" + roomDto.hashtags.join(" #")}
                        </div>
                        <div className="text-white text-left text-3xl font-bold mt-3">
                            {roomDto.title}
                        </div>

                        <div className="text-white text-left text-md mt-6">
                            {roomDto.subtitle}
                        </div>

                        <div className="flex justify-start mt-4">
                            <button
                                className="bg-white hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 rounded">
                                입장하기
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <Image src={roomDto.iconurl} width={200} height={20} alt={"이미지"}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}