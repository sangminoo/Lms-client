import { styles } from "@/app/styles/style";
import { FC } from "react";

type Props = {
  userId: string;
  setUserId?: (userId: string) => void;
  setActive: (active: boolean) => void;
  handleDelete: any;
};

const DeleteMember: FC<Props> = ({
  userId,
  setUserId,
  handleDelete,
  setActive,
}) => {
  return (
    <>
      <div className="">
        <h1 className={`${styles.title}`}>
          Are you sure to delete this member?
        </h1>
        <div className="flex justify-between items-center w-full">
          <button
            className={`${styles.button} w-[150px] bg-red-700`}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className={`${styles.button} w-[150px] `}
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteMember;
