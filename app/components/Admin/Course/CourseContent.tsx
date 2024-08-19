import { styles } from "@/app/styles/style";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};
const CourseContent: FC<Props> = ({
  active,
  courseContentData,
  handleSubmit: handleCourseSubmit,
  setActive,
  setCourseContentData,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault;
  };

  const handleCollapsedToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];

    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.videoLength === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last videoSection if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].length === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: `Untitled section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevBtn = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoLength === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  console.log(courseContentData);
  console.log(courseContentData.length);

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item?.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                } `}
                 key={index}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        id={`titleSection${index}`}
                        type="text"
                        className={`text-[20px] ${
                          item?.videoSection === "Untitled section"
                            ? "w-[170px]"
                            : "w-max"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            videoSection: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                      <label htmlFor={`titleSection${index}`}>
                        <BsPencil className="cursor-pointer dark:text-white text-black ml-6" />
                      </label>
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="flex font-Poppins dark:text-white text-black">
                          <span>{index + 1}</span>.{" "}
                          <span className="font-semibold ml-2 ">
                            {item?.title}
                          </span>
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}

                  {/* Arrow button for collapsed video content */}
                  <div className="flex items-center justify-end w-full">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      } `}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />

                    <MdOutlineKeyboardArrowDown
                      className={`dark:text-white  text-black `}
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg"
                          : " rotate(0deg)",
                      }}
                      onClick={() => handleCollapsedToggle(index)}
                    />
                  </div>
                </div>

                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label} htmlFor="videoTitle">
                        Video title
                      </label>
                      <input
                        id="videoTitle"
                        type="text"
                        placeholder="Project plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            title: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label} htmlFor="videoUrl">
                        Video url
                      </label>
                      <input
                        id="videoUrl"
                        type="text"
                        placeholder="sadawd"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].videoUrl = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            videoUrl: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={styles.label} htmlFor="videoLength">
                        Video length (in minutes)
                      </label>
                      <input
                        id="videoLength"
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        // onChange={(e) => {
                        //   const updatedData = [...courseContentData];
                        //   updatedData[index].videoLength = e.target.value;
                        //   setCourseContentData(updatedData);
                        // }}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            // videoLength: parseInt(e.target.value),
                            videoLength: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className="my-3">
                      <label className={styles.label} htmlFor="videoDesc">
                        Video description
                      </label>
                      <textarea
                        id="videoDesc"
                        rows={8}
                        cols={30}
                        placeholder="Enter some description for the course...."
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            description: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links?.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={`${styles.label}`}>
                            Link: {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20pxp]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          // onChange={(e) => {
                          //   const updatedData = [...courseContentData];
                          //   updatedData[index].links[linkIndex].title =
                          //     e.target.value;
                          //   setCourseContentData(updatedData);
                          // }}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: updatedData[index].links.map(
                                (link: any, i: number) =>
                                  i === linkIndex
                                    ? { ...link, title: e.target.value }
                                    : link
                              ),
                            };
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source code url...(Link url)"
                          className={`${styles.input} mt-6`}
                          value={link?.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: updatedData[index].links.map(
                                (link: any, i: number) =>
                                  i === linkIndex
                                    ? { ...link, url: e.target.value }
                                    : link
                              ),
                            };
                            setCourseContentData(updatedData);
                          }}
                          // onChange={(e) => {
                          //   const updatedData = [...courseContentData];

                          //   updatedData[index].links[linkIndex].url =
                          //     e.target.value;
                          //   setCourseContentData(updatedData);
                          // }}
                        />
                      </div>
                    ))}

                    <br />
                    {/* Add link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add link
                      </p>
                    </div>
                  </>
                )}

                <br />
                {/* Add new content */}
                {index === courseContentData.length - 1 && (
                  <div className="inline-block mb-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add new content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevBtn()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
