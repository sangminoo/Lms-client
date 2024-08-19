import Image from "next/image";
import { FC } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { SiCoursera } from "react-icons/si";
import { FaLock } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  logOutHandler,
  setActive,
}) => {
  console.log(user);

  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
          width={20}
          height={20}
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black font-semibold light:text-black">
          My account
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <FaLock size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black font-semibold light:text-black">
          Change password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black font-semibold light:text-black">
          Enrolled Courses
        </h5>
      </div>
      {user?.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
          }`}
          href={`/admin`}
        >
          <RiAdminFill size={20} className="text-black dark:text-white" />
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black font-semibold light:text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <IoLogOut size={20} className="text-black dark:text-white" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black font-semibold light:text-black">
          Log out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
