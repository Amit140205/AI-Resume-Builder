import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import TextEditor from "../TextEditor";
import { ResumeContextInfo } from "../../../../../context/ResumeContextInfo";
import { updateResumeDetails } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const [experienceList, setExperienceList] = useState([formField]);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  useEffect(() => {
    enableNext(true);
  }, []);

  useEffect(() => {
    if (resumeInfo?.experience?.length) {
      setExperienceList(resumeInfo.experience);
    }
  }, []);

  const handleChange = (event, index) => {
    // You're using .slice() to create a shallow copy of the experienceList
    // In React, you must not mutate state directly
    const newEntry = experienceList.slice();
    const { name, value } = event.target;
    newEntry[index][name] = value;
    setExperienceList(newEntry);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummary: "",
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList(experienceList.slice(0, -1));
  };

  // update the text editor changes
  const handleTextEditor = (e, name, index) => {
    const newEntry = experienceList.slice();
    newEntry[index][name] = e.target.value;
    setExperienceList(newEntry);
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    updateResumeDetails(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enableNext(true);
        setLoading(false);
        toast("details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>
      </div>

      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  defaultValue={item?.title}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  defaultValue={item?.companyName}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  defaultValue={item?.city}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  defaultValue={item?.state}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  defaultValue={item?.startDate}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  defaultValue={item?.endDate}
                  onChange={(event) => handleChange(event, index)}
                />
              </div>
              {/* summary */}
              <div className="col-span-2">
                <TextEditor
                  index={index}
                  defaultValue={item?.workSummary}
                  onTextEditorChange={(e) =>
                    handleTextEditor(e, "workSummary", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewExperience}>
            + Add More Experience
          </Button>
          <Button variant="outline" onClick={removeExperience}>
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
