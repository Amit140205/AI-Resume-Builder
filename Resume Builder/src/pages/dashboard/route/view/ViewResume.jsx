import React, { useEffect, useState } from "react";
import Header from "../../../../components/custom/Header";
import { Button } from "../../../../components/ui/button";
import ResumePreview from "../components/ResumePreview";
import { ResumeContextInfo } from "../../../../context/ResumeContextInfo";
import { getResumeInfoById } from "../../../../services/api";
import { useParams } from "react-router-dom";
import {RWebShare} from "react-web-share"

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const params = useParams();

  const getResumeInfo = () => {
    getResumeInfoById(params?.resumeId).then((res) => {
      console.log(res);
      setResumeInfo(res.data.data);
    });
  };

  useEffect(() => {
    getResumeInfo();
  }, []);

  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeContextInfo value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center font-medium text-2xl">
            Congrats! your ultimate resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume & you can share your
            unique resume url with your friends and family
          </p>
          <div className="flex gap-5 justify-center my-10 px-44">
            {/* download */}
            <Button onClick={handleDownload}>Download</Button>

            {/* share */}
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open the url to check it out",
                url: import.meta.env.VITE_BASE_URL+`/my-resume/${params?.resumeId}/view`,
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
            
          </div>
        </div>
      </div>
      <div>
        <div id="print-area" className="mx-10 md:mx-20 lg:mx-36">
          <ResumePreview />
        </div>
      </div>
    </ResumeContextInfo>
  );
}

export default ViewResume;
