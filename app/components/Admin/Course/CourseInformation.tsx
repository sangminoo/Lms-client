import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (course: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  courseInfo,
  setActive,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data } = useGetHeroDataQuery("Categories", {});
  // const [editLayout, { isLoading: isLoadingEditLayout, isSuccess, error }] =
  //   useEditLayoutMutation();


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("Submitting course info:", courseInfo);
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  console.log(courseInfo);

  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="name">Course name</label>
          <input
            type="text"
            name=""
            value={courseInfo.name}
            required
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Eg. MERN stack for LMS platform with next13..."
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`} htmlFor="price">
            Course description
          </label>
          <textarea
            name=""
            id="price"
            cols={30}
            rows={10}
            placeholder="Enter some description for the course..."
            value={courseInfo.description}
            className={`${styles.input} !h-min !py-2`}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="price">
              Course price
            </label>
            <input
              type="number"
              name=""
              required
              id="price"
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="25"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label
              className={`${styles.label}  line-clamp-1 800px:!line-clamp-none`}
              htmlFor="estimatedPrice"
            >
              Estimated price (optional)
            </label>
            <input
              type="number"
              name=""
              required
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="25"
              className={`${styles.input}`}
            />
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="tags">
              Course tags
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN,Next13,Socket io, tailwind css, Lms"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="demoUrl">
              Course categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input} text-black  `}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="" className="text-black">
                Select category
              </option>
              {categories.map((item: any) => (
                <option
                  value={item.title}
                  key={item._id}
                  className="text-black"
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="level">
              Course level
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="w-[45%]">
            <label className={`${styles.label}`} htmlFor="demoUrl">
              Demo url
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center rounded-md justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo?.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover rounded "
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
