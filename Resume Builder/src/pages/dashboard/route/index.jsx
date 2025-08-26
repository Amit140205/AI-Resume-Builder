import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./components/FormSection";
import ResumePreview from "./components/ResumePreview";
import { ResumeContextInfo } from "../../../context/ResumeContextInfo";
import Dummy from "../data/Dummy";
import { getResumeInfoById } from "../../../services/api";

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    getResumeInfo()
  }, []);

  const getResumeInfo = ()=>{
    getResumeInfoById(params?.resumeId).then((res)=>{
      console.log(res.data.data)
      setResumeInfo(res.data.data)
    },(error)=>{
      console.log("error")
    })
  }
  
  return (
    <ResumeContextInfo.Provider value={{resumeInfo,setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* form section */}
        <FormSection />

        {/* preview section */}
        <ResumePreview />
      </div>
    </ResumeContextInfo.Provider>
  );
}

export default EditResume;
