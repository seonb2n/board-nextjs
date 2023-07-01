import Room from "@/dto/Room";
import CardView from "@/components/CardView";
import {Swiper, SwiperSlide} from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";

export default function CardViewLayout() {

    const room1 = new Room(
        1,
        ["개발자", "백엔드"],
        "개발자 작업소",
        "20/100 명",
        ["기능 바꿔주세요", "크기 바꿔주세요"],
        "https://cdn-icons-png.flaticon.com/512/2909/2909278.png"
    );

    const room2 = new Room(
        2,
        ["디자이너", "피그마"],
        "디자이너 작업소",
        "22/100 명",
        ["색이 마음에 들지 않아요", "컨셉이 불확실해요"],
        "https://cdn-icons-png.flaticon.com/512/2909/2909278.png"
    );

    const room3 = new Room(
        3,
        ["작가", "웹소설"],
        "작가 작업소",
        "20/100 명",
        ["전개가 고구마에요", "마감좀 지켜주세요"],
        "https://cdn-icons-png.flaticon.com/512/2909/2909278.png"
    );

    const tmpData = [room1, room2, room3];

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Swiper navigation={true} modules={[Navigation]}>
                {
                    tmpData.map(room => {
                        return (
                            <SwiperSlide>
                                <CardView key={room.id} roomDto={room}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
}