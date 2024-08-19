"use client";

import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";

import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

const AllCourses = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState();

  const { isLoading, data, refetch } = useGetAllCoursesQuery([], {
    refetchOnMountOrArgChange: true,
  });
  const [deleteCourse, { isSuccess, error: deleteError }] =
    useDeleteCourseMutation({});

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Deleted course successfully");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, deleteError]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    { field: "title", headerName: "Course title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <Button>
                <FiEdit3 className="dark:text-white text-black" size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
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
  ];

  //   console.log(data);

  const rows: any = [];

  data &&
    data?.courses?.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });

  const handleDelete = async () => {
    await deleteCourse({ id: courseId });
  };

  return (
    <>
      <div className="mt-[120px]">
        {isLoading ? (
          <Loader />
        ) : (
          <Box m={"20px"}>
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
            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
                  <div className="w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                    <h1 className={`${styles.title}`}>
                      Are you sure you want to delete this course?
                    </h1>
                    <div className="w-full flex items-center justify-between mb-6 mt-4">
                      <div
                        className={`${styles.button} !w-[150px] h-[30px] bg-red-700`}
                        onClick={handleDelete}
                      >
                        Delete
                      </div>
                      <div
                        className={`${styles.button} !w-[150px] h-[30px] bg-[#3ccba0]`}
                        onClick={() => setOpen(!open)}
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default AllCourses;
