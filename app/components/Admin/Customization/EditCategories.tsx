import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading: isLoadingEditLayout, isSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }

    if (isSuccess) {
      refetch();
      toast.success("Updated categories successfully");
    }

    if (error) {
      if ("data" in error) {
        const dataError = error as any;
        toast.error(dataError.data.message);
      }
    }
  }, [data, isSuccess, error]);
  console.log(data);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot empty");
    } else {
      setCategories((prevCategories: any) => [
        ...prevCategories,
        { _id: Date.now().toString(), title: "" },
      ]);

      //   setCategories([...categories, { _id: Date.now().toString(), title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (category: any[]) => {
    return categories.some((q: any) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoadingEditLayout ? (
        <Loader />
      ) : (
        <>
          <div className="mt-[120px] text-center">
            <h1 className={`${styles.title}`}>All categories</h1>
            {categories?.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      type="text"
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategories: any) =>
                          prevCategories.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <br />
            <br />
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="
                dark:text-white text-black text-[25px] cursor-pointer
                "
                onClick={newCategoriesHandler}
              />
            </div>
            <div
              className={`${
                styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? "!cursor-not-allowed"
                  : "!cursor-pointer !bg-[#42d383]"
              } !rounded absolute bottom-12 right-12`}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditCategories;
