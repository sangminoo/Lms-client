"use client";

import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";

import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import NewMember from "./NewMember";
import DeleteMember from "./DeleteMember";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess: updateSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (updateSuccess) {
      refetch();
      toast.success("User role updated successfully!");
      setActive(false);
    }

    if (deleteSuccess) {
      toast.success("Delete user successfully!");
      setActive(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, updateSuccess, deleteSuccess, deleteError]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        // console.log(params.row.id);

        return (
          <>
            <Button
              onClick={() => {
                setActive(true);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
              href={`mailto:${params.row.email}`}
              className="flex justify-center items-center w-full h-full"
            >
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  //   console.log(data);

  const rows: any = [];
  //   console.log(data);

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    //   console.log(newData);

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data?.users?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    console.log({ email, role });
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    console.log(userId);
    await deleteUser({ id: userId });
  };

  return (
    <>
      <div className="mt-[120px]">
        {isLoading ? (
          <Loader />
        ) : (
          <Box m={"20px"}>
            <div className="w-ful flex justify-end">
              <div
                className={`${styles.button} !w-[220px] h-[35px] dark:bg-[#57c7a3] dark:border dark:border-[#fff]`}
                onClick={() => setOpen(true)}
              >
                Add new member
              </div>
            </div>
            <Box
              m="40px 0 0 0"
              height={"80vh"}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },

                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark"
                      ? "1px solid #ffffff30 !important"
                      : "1px solid #ccc !importantF",
                },

                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor:
                    theme === "dark"
                      ? "#3e4396 !important"
                      : "#A4A9FC !important",
                  borderBottom: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0 ",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid checkboxSelection rows={rows} columns={columns} />
            </Box>
          </Box>
        )}
        {active && (
          <Modal
            open={active}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <div className="w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <DeleteMember
                  userId={userId}
                  setUserId={setUserId}
                  handleDelete={handleDelete}
                  setActive={setActive}
                />
              </div>
            </Box>
          </Modal>
        )}
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <div className="w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <NewMember
                  role={role}
                  setRole={setRole}
                  setOpen={setOpen}
                  email={email}
                  setEmail={setEmail}
                  handleSubmit={handleSubmit}
                />
              </div>
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default AllUsers;
