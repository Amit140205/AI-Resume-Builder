import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Textarea } from "../../../../../components/ui/textarea";
import { Button } from "../../../../../components/ui/button";
import { ResumeContextInfo } from "../../../../../context/ResumeContextInfo";
import { useParams } from "react-router-dom";
import { updateResumeDetails } from "../../../../../services/api";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const educationField = {
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

function Education({ enableNext }) {
  const [educationList, setEducationList] = useState([educationField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleChange = (e, index) => {
    const newEntry = educationList.slice();
    const { name, value } = e.target;
    newEntry[index][name] = value;
    setEducationList(newEntry);
  };

  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: "",
      },
    ]);
  };

  const removeEducation = () => {
    setEducationList(educationList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
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

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  useEffect(() => {
    if (resumeInfo?.education?.length) {
      setEducationList(resumeInfo.experience);
    }
  }, []);

  useEffect(() => {
    enableNext(true);
  }, []);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>
      </div>

      <div>
        {educationList?.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-xs">University Name</label>
                <Input
                  name="universityName"
                  defaultValue={item?.universityName}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input
                  name="degree"
                  defaultValue={item?.degree}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Major</label>
                <Input
                  name="major"
                  defaultValue={item?.major}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  defaultValue={item?.startDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  defaultValue={item?.endDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Textarea
                  name="description"
                  defaultValue={item?.description}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewEducation}>
            + Add More Education
          </Button>
          <Button variant="outline" onClick={removeEducation}>
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

export default Education;
