import { FC } from "react";
import { Box, Modal } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem?: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
}

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box className="absolute top-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box> */}
      <Box className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <div className="w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
