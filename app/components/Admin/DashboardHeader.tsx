"use client";

import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader = ({ open, setOpen }: Props) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dmrruxyjk/video/upload/v1723470328/ehnutrvmyww9kwh5hlvc.mp3"
    )
  );

  const playerNotificationsSound = () => {
    if (typeof window !== 'undefined') {
      audio.play();
    }
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    // console.log(notifications);

    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);
  // console.log(notifications);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playerNotificationsSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    setLoading(id);
    await updateNotificationStatus(id);
    setTimeout(() => {
      setNotifications((prev: any[]) =>
        prev.filter((notification) => notification._id !== id)
      );
      setLoading(null);
    }, 1000);
  };

  return (
    <>
      <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-10">
        <ThemeSwitcher />
        <div
          className="relative cursor-pointer m-2"
          onClick={() => setOpen(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] text-[12px] flex items-center justify-center text-white">
            {notifications && notifications.length}
          </span>
        </div>
        {open && (
          <div className="w-[350px] h-[50px] absolute dark:bg-[#111C43] bg-white shadow-xl top-16 z-10 rounded">
            <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
              Notifications
            </h5>

            {notifications &&
              notifications.map((item: any, index: number) => (
                <div
                  key={index}
                  // className="dark:bg-[#232f59] bg-[#f6f3f3] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] scroll-auto h-auto"
                  className={`dark:bg-[#232f59] bg-gray-200  font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f] scroll-auto h-auto ${
                    loading === item._id
                      ? "dark:bg-[#3d435a] bg-[#e2e2e6] "
                      : ""
                  }`}
                >
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-black dark:text-white">{item?.title}</p>
                    <p
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      {loading === item._id ? "Loading..." : "Mark as read"}
                    </p>
                  </div>
                  <p className="px-2 text-black dark:text-white">
                    {item?.message}
                  </p>
                  <p className="p-2 text-black dark:text-white text-[14px]">
                    {format(item?.createdAt)}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHeader;
