import { styles } from "@/app/styles/style";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import "../../globals.css";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    console.log(verificationNumber);
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <>
      <h1 className={`${styles.title}`}>Verify your account</h1>
      <div className="w-full flex flex-col items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
        <br />
        <br />
        <div className=" m-auto flex items-center justify-around gap-x-2">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="text"
              key={key}
              ref={inputRefs[index]}
              className={`
            w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px]  flex items-center text-black dark:text-white justify-center text-[18px] font-semibold font-Poppins outline-none text-center ${
              invalidError
                ? "animate-shake border-red-500 "
                : "dark:border-white border-[#0000004a]"
            }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <br />

        <div className="w-full flex justify-center">
          <button className={styles.button} onClick={verificationHandler}>
            Verify OTP
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Go back to sign in?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </div>
    </>
  );
};

export default Verification;
