import React, { useContext, useEffect, useState } from 'react'
import {Input} from "../../../../../components/ui/input"
import {Button} from "../../../../../components/ui//button"
import { ResumeContextInfo } from '../../../../../context/ResumeContextInfo'
import {useParams} from "react-router-dom"
import { updateResumeDetails } from '../../../../../services/api'
import {LoaderCircle} from "lucide-react"
import { toast } from 'sonner'

function PersonalDetailForm({enableNext}) {

    const {resumeInfo,setResumeInfo} = useContext(ResumeContextInfo)
    const params = useParams()
    const [formData,setFormData] = useState()
    const [loading,setLoading] = useState(false)

    const handleInputChange = (e)=>{
        const {name,value} = e.target
        enableNext(false)
        setResumeInfo({
            ...resumeInfo,
            [name] : value
        })

        setFormData({
            ...formData,
            [name] : value
        })
    }
    const onSave = (e)=>{
        e.preventDefault()
        setLoading(true)

        const data = {
            data : formData
        }

        updateResumeDetails(params?.resumeId,data).then((res)=>{
            console.log(res)
            enableNext(true)
            setLoading(false)
            toast("Details updated")
        },(error)=>{
            setLoading(false)
        })

        // enableNext(true)
    }

    useEffect(()=>{
        console.log(params)
    },[])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get started with the basic information</p>

      {/* form */}
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
            <div>
                <label className='text-sm'>First Name</label>
                <Input name="firstName" required onChange={handleInputChange} defaultValue={resumeInfo?.firstName}/>
            </div>
            <div>
                <label className='text-sm'>Last Name</label>
                <Input name="lastName" required onChange={handleInputChange} defaultValue={resumeInfo?.lastName}/>
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Job Title</label>
                <Input name="jobTitle" required onChange={handleInputChange} defaultValue={resumeInfo?.jobTitle}/>
            </div>
            <div className='col-span-2'>
                <label className='text-sm'>Address</label>
                <Input name="address" required onChange={handleInputChange} defaultValue={resumeInfo?.address}/>
            </div>
            <div>
                <label className='text-sm'>Phone</label>
                <Input name="phone" required onChange={handleInputChange} defaultValue={resumeInfo?.phone}/>
            </div>
            <div>
                <label className='text-sm'>Email</label>
                <Input name="email" required onChange={handleInputChange} defaultValue={resumeInfo?.email}/>
            </div>
        </div>
        <div className='mt-3 flex justify-end'>
            <Button type="submit" disabled={loading}>
                {loading ? <LoaderCircle className='animate-spin'/> : "Save"}
                </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailForm
