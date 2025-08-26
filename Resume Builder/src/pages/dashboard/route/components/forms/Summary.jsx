import React, { useContext, useEffect, useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";
import { ResumeContextInfo } from "../../../../../context/ResumeContextInfo";
import { updateResumeDetails } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import AIChatSession from "../../../../../services/AIModel";

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false)
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    enableNext(false);
    setSummary(value);

    setResumeInfo({
      ...resumeInfo,
      summary: value,
    });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summary: summary,
      },
    };

    updateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const generateSummaryFromAI = async () => {
    setLoadingAI(true);
    const prompt = `Job Title : ${resumeInfo.jobTitle}, depends on job title give me summary for my resume in 2-3 lines, in json format with fields => experience level and summary with experince level for Fresher,Mid-Level,Experienced`;
    const res = await AIChatSession(prompt);

    console.log(res);
    setAiGeneratedSummaryList(JSON.parse(res));

    setLoadingAI(false);
  };

  useEffect(() => {
    enableNext(false);
  }, []);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between">
            <label>Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
              type="button"
              onClick={generateSummaryFromAI}
            >
              {loadingAI ? <LoaderCircle className="animate-spin" /> : <><Brain className="h-4 w-4" /> Generate From AI</>}
              
            </Button>
          </div>
          <Textarea className="mt-5" required onChange={handleInputChange} defaultValue={resumeInfo?.summary}/>

          <div className="mt-2 flex justify-end">
            <Button disabled={loadingAI || loading} type="submit">
              {loading?<LoaderCircle className="animate-spin"/> : "Save"}
              
            </Button>
          </div>
        </form>
      </div>

      {/* summary suggestions */}
      {aiGeneratedSummaryList && 
      <div className="my-8">
        <h2 className="font-bold text-lg">Suggestions</h2>
        {aiGeneratedSummaryList?.map((item,index)=>(
          <div key={index}>
            <h2 className="font-bold my-1">Levels : {item["experience level"]}</h2>
            <p>{item?.summary}</p>
          </div>
        ))}
      </div>
      }
    </div>
  );
}

export default Summary;
