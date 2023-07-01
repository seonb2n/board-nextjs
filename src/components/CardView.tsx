import Room from "@/dto/Room";
import {SwiperSlide} from "swiper/react";

export default function CardView({roomDto}: Room) {

    console.log(roomDto);

    return (
        <div className="w-80 h-96 border">
            <div className="flex h-full justify-center items-center">
                <div className="text-white">
                    {roomDto.title}
                </div>
            </div>
        </div>
    );
}