import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../../../../components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { ResumeContextInfo } from "../../../../../context/ResumeContextInfo";
import { updateResumeDetails } from "../../../../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const skillsField = {
  name: "",
  rating: 0,
};

function Skills({ enableNext }) {
  const [skillsList, setSkillsList] = useState([skillsField]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeContextInfo);

  const params = useParams();

  const handleChange = (value, index, name) => {
    const newEntry = skillsList.slice();
    newEntry[index][name] = value;
    setSkillsList(newEntry);
  };

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    setSkillsList(skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skill: skillsList.map(({ id, ...rest }) => rest),
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
      skills: skillsList,
    });
  }, [skillsList]);

  useEffect(() => {
    if (resumeInfo?.skills?.length) {
      setSkillsList(resumeInfo.experience);
    }
  }, []);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your top professional key skills</p>
      </div>
      <div>
        {skillsList?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between border rounded-lg p-3 my-5"
          >
            <div>
              <label className="text-xs">Name</label>
              <Input
                defaultValue={item?.name}
                onChange={(e) => handleChange(e.target.value, index, "name")}
              />
            </div>

            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              defaultValue={item?.rating}
              onChange={(value) => handleChange(value, index, "rating")}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNewSkills}>
            + Add More Skills
          </Button>
          <Button variant="outline" onClick={removeSkills}>
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

export default Skills;
