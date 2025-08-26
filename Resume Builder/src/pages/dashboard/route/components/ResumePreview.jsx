import React, { useContext } from 'react'
import { ResumeContextInfo } from '../../../../context/ResumeContextInfo'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'

function ResumePreview() {

    const {resumeInfo,setResumeInfo} = useContext(ResumeContextInfo)

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor : resumeInfo?.themeColor}}>
        {/* Personal Detail */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>
        {/* Professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
        {/* Educational */}
        <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
        <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
