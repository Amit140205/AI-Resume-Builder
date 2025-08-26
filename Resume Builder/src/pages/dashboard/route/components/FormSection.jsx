import React, { useContext, useState } from "react";
import PersonalDetailForm from "./forms/PersonalDetailForm";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "../../../../components/custom/ThemeColor";
import { ResumeContextInfo } from "../../../../context/ResumeContextInfo";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams()

  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
            <Home size="sm"/>
          </Button>
          </Link>
          <ThemeColor resume={{resumeInfo,setResumeInfo}}/>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
              Previous
            </Button>
          )}
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal detail */}
      {activeFormIndex === 1 && (
        <PersonalDetailForm enableNext={(value) => setEnableNext(value)} />
      )}

      {/* summary */}
      {activeFormIndex === 2 && (
        <Summary enableNext={(value) => setEnableNext(value)} />
      )}
      {/* experience */}
      {activeFormIndex === 3 && (
        <Experience enableNext={(value) => setEnableNext(value)} />
      )}

      {/* education */}
      {activeFormIndex === 4 && (
        <Education enableNext={(value) => setEnableNext(value)} />
      )}

      {/* skills */}
      {activeFormIndex === 5 && (
        <Skills enableNext={(value) => setEnableNext(value)} />
      )}
      {/* share,download */}
      {activeFormIndex === 6 && (
        <Navigate to={`/my-resume/${params?.resumeId}/view`}/>
      )}
    </div>
  );
}

export default FormSection;
