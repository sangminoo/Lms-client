import Image from "next/image";
import { FC, useEffect, useState } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import { styles } from "@/app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if(success) {
      toast.success("Username updated successfully")
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center  800px:justify-end items-center mx-20">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            className="cursor-pointer border-[3px] border-[#37a39a]  rounded-full hover:opacity-70"
            alt=""
            width={120}
            height={120}
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden "
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar" className="hover:opacity-70 ">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 text-black dark:text-white font-semibold">
                Full name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <br />
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-black dark:text-white font-semibold">
                Email address:
              </label>
              <input
                type="email"
                readOnly
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0 disabled:bg-slate-500 cursor-not-allowed select-none placeholder:select-none `}
                required
                value={user?.email}
              />
            </div>

            <input
              type="submit"
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value={"Update"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
