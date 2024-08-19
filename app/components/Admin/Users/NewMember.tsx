import { styles } from "@/app/styles/style";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { ChangeEvent, FC } from "react";

type Props = {
  role: String;
  setRole: (role: string) => void;
  email: string;
  setEmail: (email: string) => void;
  setOpen: (open: boolean) => void;
  handleSubmit: any;
};

const NewMember: FC<Props> = ({
  role,
  email,
  handleSubmit: handleChangeSubmit,
  setEmail,
  setRole,
  setOpen,
}) => {
  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setOpen(false);
    handleChangeSubmit();
  };
  return (
    <>
      <div className="w-full  ">
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className={`${styles.label}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input}`}
              onChange={handleEmailChange}
            />
            <br />
            <br />
            <FormControl fullWidth>
              <InputLabel
                variant="standard"
                className="text-black dark:text-white"
                htmlFor="uncontrolled-native"
              >
                Role
              </InputLabel>
              <NativeSelect
                defaultValue={role}
                onChange={handleRoleChange}
                inputProps={{
                  name: "Role",
                  id: "uncontrolled-native",
                }}
                className="text-black dark:text-white"
              >
                <option value={"admin"} className="text-black">
                  Admin
                </option>
                <option value={"user"} className="text-black">
                  User
                </option>
              </NativeSelect>
            </FormControl>
            <br />
            <br />
            <br />
            <button className={`${styles.button}`}>Save</button>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};

export default NewMember;
