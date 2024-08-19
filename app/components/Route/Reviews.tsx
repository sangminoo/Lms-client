import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from "../Reviews/ReviewCard"


export const reviews = [
  {
    name: "Song Kang",
    avatar:
      "https://kenh14cdn.com/thumb_w/660/2018/11/27/mino-1543304043293479245872.jpg",
    profession: "Student | Cambridge university",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
  {
    name: "Thao Ha",
    avatar:
      "https://rainbow-heart.sk/img/celeb/EF/winner-s-song-mino-confirms-enlistment-date-1.jpeg",
    profession: "Full stack developer | Quater ltd",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
  {
    name: "SonTung MTP",
    avatar:
      "https://cdn.tuoitre.vn/thumb_w/480/2022/10/27/son-tung-4-1666838826176719239917.jpeg",
    profession: "Computer systems engineering student | Zimbabwe",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
  {
    name: "Mina Davidson",
    avatar:
      "https://ss-images.saostar.vn/w800/pc/1626500872771/saostar-v5o09xcsn4y65t6q.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
  {
    name: "Rosemary Smith",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKhO81lwBpTySRIn6KqSSLNbiUA5s99aqWg&s",
    profession: "Full stack web developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
  {
    name: "Rosemary Smith",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrKhO81lwBpTySRIn6KqSSLNbiUA5s99aqWg&s",
    profession: "Full stack web developer | Indonesia",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores ea vel placeat dicta tenetur, iusto ipsum magni dolores deleniti!",
  },
];

const Reviews = () => {
  return (
    <>
      <div className="w-[90%] 800px:w-[85%] m-auto">
        <div className="w-full 800px:flex 800px:flex-row flex-col items-center">
          <div className="800px:w-[50%] w-full">
            <Image
              src={require(`../../../public/assets/business.png`)}
              width={600}
              height={600}
              alt="business"
            />
          </div>
          <div className="800px:w-[50%] w-full">
            <h3 className={`${styles.title} 800px:!text-[40px]`}>
              Our students are{" "}
              <span className="font-semibold ml-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                Our Strength
              </span>
              <br />
              See what they saw about us
            </h3>
            <br />
            <p className={styles.label}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid
              modi, iusto totam quia beatae tempore consequuntur nulla tenetur
              laborum animi nemo commodi cupiditate sit. Ducimus, culpa aperiam
              fugiat, nobis animi quia minus obcaecati facere enim consequuntur
              quidem exercitationem repellat, architecto rerum hic veritatis
              facilis necessitatibus iste. Ea, reprehenderit quos! Perspiciatis.
            </p>
          </div>
          <br />
          <br />
        </div>
        <br />
          <br />
          <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 
          "
          // md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]
          >
                {
                    reviews && reviews.map((i, index) => <ReviewCard item={i} key={index} />)
                }
          </div>
      </div>
    </>
  );
};

export default Reviews;
