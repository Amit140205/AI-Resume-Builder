import React, { useContext, useEffect, useState } from 'react'
import {BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar} from "react-simple-wysiwyg"
import { Button } from '../../../../components/ui/button'
import {Brain, LoaderCircle, LoaderIcon} from "lucide-react"
import { ResumeContextInfo } from "../../../../context/ResumeContextInfo";
import { toast } from 'sonner';
import AIChatSession from '../../../../services/AIModel';


function TextEditor({onTextEditorChange,index}) {
    const [value,setValue] = useState()
    const {resumeInfo,setResumeInfo} = useContext(ResumeContextInfo);
    const [loading,setLoading] = useState(false)

    const generateSummaryFromAI = async ()=>{
      setLoading(true)
      if(!resumeInfo.experience[index].title){
        toast("please add a title")
        return
      }
      const prompt = `position title: ${resumeInfo.experience[index].title} , Depends on position title give me a summary in 2-3 lines for my experience in resume (Please do not add experince level)
      
      --response format : 
      {
      "summary" : "{content}"
      }
      `

      const res = await AIChatSession(prompt)
      const parsedResponse = JSON.parse(res)
      setValue(parsedResponse["summary"])
      console.log(parsedResponse["summary"])

      setLoading(false)
    }

    
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button 
        onClick={generateSummaryFromAI}
        variant="outline" size="sm" className="flex gap-2 border-primary text-primary" disabled={loading}>
          {loading?<LoaderCircle className='animate-spin'/>:<><Brain className='h-4 w-4'/> Generate from AI</>} 
          </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e)=>{
        setValue(e.target.value)

        // send back the responses to the parent component
        onTextEditorChange(e)
      }}>
        <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            
      </Toolbar>
      </Editor>
      </EditorProvider>
    </div>
  )
}

export default TextEditor
