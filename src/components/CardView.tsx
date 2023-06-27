import Room from "@/dto/Room";

export default function CardView({roomDto}: Room) {

    return (
        <div className="w-80 h-48 border">
            <div className="relative">
                <div className="bg-white absolute w-6 h-4 top-0 left-0 ">

                </div>
                <div className="bg-white absolute w-6 h-4 top-0 right-0 ">

                </div>
                <div className="bg-white absolute w-6 h-4 bottom-0 left-0 ">

                </div>
                <div className="bg-white absolute w-6 h-4 bottom-0 right-0 ">

                </div>
                <div>
                    {roomDto.title}
                </div>
            </div>
        </div>
    );
}