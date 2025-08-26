import { Loader, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteResumeById } from "../../../services/api";
import { toast } from "sonner";

function ResumeCardItem({ resume,refreshData }) {
  const navigation = useNavigate();
  const [openAlert,setOpenAlert] = useState(false)
  const [loading,setLoading] = useState(false)
  const [cancelBtn,setCancelBtn] = useState(false)

  const onDelete = ()=>{
    setLoading(true)
    setCancelBtn(true)
    
    deleteResumeById(resume?.documentId).then((res)=>{

      setLoading(false)
      setCancelBtn(false)

      console.log(res);
      toast("resume deleted!")
      refreshData()
      setOpenAlert(false)
    },(error)=>{
      console.log(error)
      setLoading(false)
    })
  }
  return (
    <div>
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="p-14 flex justify-center items-center h-[280px] border-t-4 roundedt-t-lg
        hover:scale-105 transition-all hover:shadow-md shadow-primary
        bg-gradient-to-b from-pink-100 via bg-purple-200 to-blue-200
        "
        >
          <Notebook />
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between rounded-b-lg shadow-lg items-center"
        style={{
          background: resume?.themeColor,
        }}
      >
        <h2 className="my-2 text-center">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation(`/my-resume/${resume.documentId}/view`)}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your resume from the servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)} disabled={cancelBtn}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading}>
                {loading?<Loader className="animate-spin"/>:"Delete"}
                </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
