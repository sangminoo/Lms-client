import { BiBorderLeft } from "react-icons/bi";
import UsersAnalytics from "../Analytics/UsersAnalytics";
import { PiUserFocusLight } from "react-icons/pi";
import { FC, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidget = ({ open }: Props) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  console.log(data);
  console.log(ordersData);

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    }

    if (data && ordersData) {
      const usersLastTwoMonths = data?.users?.last12Months.slice(-2);
      const ordersLastTwoMonths = ordersData?.orders.last12Months.slice(-2);

      if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
        const usersCurrentMonth = usersLastTwoMonths[1].count;
        const usersPreviousMonth = usersLastTwoMonths[0].count;
        const ordersCurrentMonth = ordersLastTwoMonths[1].count;
        const ordersPreviousMonth = ordersLastTwoMonths[0].count;

        const usersPercentChange =
          usersPreviousMonth !== 0
            ? ((usersCurrentMonth - usersPreviousMonth) / usersCurrentMonth) *
              100
            : 100;

        const ordersPercentChange =
          ordersPreviousMonth !== 0
            ? ((ordersCurrentMonth - ordersPreviousMonth) /
                ordersCurrentMonth) *
              100
            : 100;

        setUserComparePercentage({
          currentMonth: usersCurrentMonth,
          previousMonth: usersPreviousMonth,
          percentChange: usersPercentChange,
        });

        setOrderComparePercentage({
          currentMonth: ordersCurrentMonth,
          previousMonth: ordersPreviousMonth,
          percentChange: ordersPercentChange,
        });
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  // console.log(orderComparePercentage?.currentMonth);

  return (
    <>
      <div className="mt-[30px] min-h-screen">
        <div className="grid grid-cols-[75%,25%]">
          <div className="p-8">
            <UsersAnalytics isDashboard={true} />
          </div>

          <div className="pt-[80px] pr-8">
            <div className="w-full dark:bg-[#111C43] rounded-sm shadow">
              <div className="flex items-center p-5 justify-between">
                <div>
                  <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                    {orderComparePercentage?.currentMonth}
                  </h5>
                  <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                    Sales Obtained
                  </h5>
                </div>

                <div className="flex flex-col justify-center">
                  <CircularProgressWithLabel
                    value={orderComparePercentage?.percentChange > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center  pt-4 text-black dark:text-white">
                    {orderComparePercentage?.percentChange > 0
                      ? `+ ` +
                        Math.round(
                          (orderComparePercentage?.percentChange * 10) / 10
                        )
                      : `- ` +
                        Math.round(
                          (orderComparePercentage?.percentChange * 10) / 10
                        )}
                    %
                  </h5>
                </div>
              </div>
            </div>

            <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
              <div className="flex items-center p-5 justify-between">
                <div>
                  <PiUserFocusLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                  <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[30px]">
                    {userComparePercentage?.currentMonth}
                  </h5>
                  <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                    New Users
                  </h5>
                </div>
                <div className="flex flex-col justify-center">
                  <CircularProgressWithLabel
                    value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                    open={open}
                  />
                  <h5 className="text-center pt-4 text-black dark:text-white">
                    {userComparePercentage?.percentChange > 0
                      ? `+ ` +
                        Math.round(
                          (userComparePercentage?.percentChange * 10) / 10
                        )
                      : `- ` +
                        Math.round(
                          (userComparePercentage?.percentChange * 10) / 10
                        )}
                    %
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[65%,35%] mt-[-20px]">
          <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
            <OrdersAnalytics isDashboard={true} />{" "}
          </div>

          <div className="p-5">
            <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
              Recent transactions
            </h5>
            <AllInvoices isDashboard={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardWidget;
