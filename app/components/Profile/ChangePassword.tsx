import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match");
    } else if (oldPassword === newPassword) {
        toast.error("The old password and new password are duplicated. Retry.");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
        <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center  font-[500] text-black dark:text-[#fff] pb-2">
          Change password
        </h1>
        <div className="w-full">
          <form
            aria-required
            className="flex flex-col items-center"
            onSubmit={passwordChangeHandler}
          >
            <div className="w-[100%] 800px:w-[60%] mt-5">
              <label className="block font-semibold pb-2 text-black dark:text-white">
                Enter your password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[60%] mt-2">
              <label className="block font-semibold pb-2 text-black dark:text-white">
                Enter your new password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="w-[100%] 800px:w-[60%] mt-2">
              <label className="block font-semibold pb-2 text-black dark:text-white">
                Enter your confirm password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input
                type="submit"
                className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer`}
                value="Update"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
