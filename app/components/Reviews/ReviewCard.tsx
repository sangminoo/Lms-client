import Ratings from "@/app/utils/Ratings";
import Image from "next/image";

type Props = {
    item: any
}

const ReviewCard = ({item}: Props) => {
    return ( <>
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[.20] border border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
        <div className="flex w-full">
            <Image src={item?.avatar} width={50} height={50} alt="" className="w-[50px] h-[50px] rounded-full object-cover" /> 
        <div className="800px:flex justify-between w-full hidden">
            <div className="pl-4">
                <h5 className="text-[20px] text-black dark:text-white">
                    {item.profession}
                </h5>
                <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
                    {item.profession}
                </h6>
            </div>
                <Ratings rating={item?.ratings} />
        </div>
        </div>
        <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
            {item?.comment}
        </p>
    </div>
    </> );
}
 
export default ReviewCard;