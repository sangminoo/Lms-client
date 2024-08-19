import axios from "axios";
import { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};
type VideoData = {
  otp: string;
  playbackInfo: string;
};
const CoursePlayer: FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
console.log(videoUrl, title);

  useEffect(() => {
    if (videoUrl !== "") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`,
          { videoId: videoUrl },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Response data:", response.data);
          setVideoData(response.data);
        });
    }
  }, [videoUrl]);

  console.log("Video Data State:", videoData);

  return (
    <>
      <div style={{ paddingTop: "41%", position: "relative" }}>
        {videoData.otp && videoData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=0NHhDeTSdeRULuWy`}
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default CoursePlayer;
