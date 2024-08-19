import { styles } from "@/app/styles/style";
import { AddCircleOutline } from "@mui/icons-material";
import { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = {
      ...updatedBenefits[index],
      title: value,
    };
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = {
      ...updatedPrerequisites[index],
      title: value,
    };
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevBtn = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-24 block">
        <div>
          <label className={`${styles.label} text-[20px]`} htmlFor="benefit">
            What are the benefits for students in this course?
          </label>
          <br />
          {benefits?.map((benefit: any, index: number) => (
            <input
              key={index}
              type="text"
              name="Benefit"
              id="benefit"
              required
              value={benefit?.title}
              className={`${styles.input} my-2`}
              placeholder="You will be able to build a full stack LMS platform..."
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))}
          <AddCircleOutline
            style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={handleAddBenefit}
          />
        </div>

        <br />
        <div>
          <label
            className={`${styles.label} text-[20px]`}
            htmlFor="prerequisite"
          >
            What are the prerequisites for starting this course?
          </label>
          <br />
          {prerequisites?.map((prerequisite: any, index: number) => (
            <input
              key={index}
              type="text"
              name="Prerequisite"
              id="prerequisite"
              required
              value={prerequisite?.title}
              className={`${styles.input} my-2`}
              placeholder="You need basic knowledge of MERN stack"
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))}
          <AddCircleOutline
            style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={handleAddPrerequisites}
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
            onClick={() => prevBtn()}
          >
            Prev
          </div>
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer  "
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
        <br />
      </div>
    </>
  );
};

export default CourseData;
