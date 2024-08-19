import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import Heading from "../utils/Heading";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <AdminProtected>
        <Heading
          description="SangELearning is a platform for students to learn and get help from teachers"
          title="SangELearning - Admin"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-[200vh] ">
          <div className="1500px:w-[16%] w-1/5 ">
            <AdminSidebar />
          </div>

          <div className="w-[85%] ">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
