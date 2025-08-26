import React, { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import { createNewResume } from "../../../services/api";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {

  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle,setResumeTitle] = useState()
  //clerk
  const {user} = useUser()

  const [loading,setLoading] = useState(false)

  const navigation = useNavigate()

  const onCreate = async ()=>{

    setLoading(true)

    // uuid
    const uuid = uuidv4();
    // console.log(resumeTitle,uuid)

    // API
    const data = {
      data : {
        title : resumeTitle,
        resumeId : uuid,
        userEmail : user?.primaryEmailAddress.emailAddress,
        userName : user?.fullName
      }
    }
    createNewResume(data).then((res)=>{
      // console.log(res)
      if(res){
        setLoading(false)
        navigation(`/dashboard/resume/${res.data.data.documentId}/edit`)
      }
    },(error)=>{
      console.log(error)
      setLoading(false)
    })
  }

  return (
    <div>
      <div
        className="p-14 py-24 border flex items-center justify-center bg-secondary rounded-lg h-[280px]
      hover:scale-105 transition-all hover:shadow-lg cursor-pointer border-dashed
      "
      onClick={()=>setOpenDialog(!openDialog)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new Resume
              <Input className="my-2 text-black" placeholder="Ex. Frontend Resume"
              onChange={(e)=>setResumeTitle(e.target.value)}
              />
            </DialogDescription>

            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
              <Button onClick={onCreate} disabled={!resumeTitle || loading}>
                {loading ? <Loader2 className="animate-spin"/> : "Create"}
              </Button>
            </div>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
