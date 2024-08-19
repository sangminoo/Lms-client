import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul className="">
                <li>
                  <Link
                    href={`/about`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/privacy-policy"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/faq"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>
              <ul className="">
                <li>
                  <Link
                    href={`/about`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Courses
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/privacy-policy"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/faq"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                {" "}
                Social Links
              </h3>
              <ul className="">
                <li>
                  <Link
                    href={`/about`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Youtube
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/privacy-policy"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/faq"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Github
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Contact Info
              </h3>
              <ul className="">
                <li>
                  <Link
                    href={`/about`}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Call us: 0123445678
                  </Link>
                </li>

                <li>
                  <Link
                    href={"/privacy-policy"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Address: 426/48 DuongLang, Lang Ha, DongDa.
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/faq"}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    Mail: support@sangelarning.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <br />
          <br />

          <p className="text-center font-bold text-gray-500">
            Copyright © 2024 SangElearning | All Rights Reserved
          </p>
        </div>
        <br />
      </footer>
    </>
  );
};

export default Footer;
