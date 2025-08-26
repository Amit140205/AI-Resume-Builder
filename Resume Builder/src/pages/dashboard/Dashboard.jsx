import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import { getUserResume } from '../../services/api'
import ResumeCardItem from './components/ResumeCardItem'
import { LoaderCircle } from 'lucide-react'

function Dashboard() {
  const {user} = useUser()
  const [resumeList,setResumeList] = useState([])
  const [loading,setLoading] = useState(false)

  //use to get user resume list
  const getResume = ()=>{
    getUserResume(user?.primaryEmailAddress.emailAddress)
    .then((res)=>{
      // console.log(res.data)
      setLoading(false)
      setResumeList(res.data.data)
    })
  }

  useEffect(()=>{
    setLoading(true)
    user&&getResume()
  },[user])

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating resume for your next Job Role for FREE </p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume/>
        {loading ? <LoaderCircle className='animate-spin'/> : 
        
          resumeList&&resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={getResume}/>
        ))}
        
      </div>
    </div>
  )
}

export default Dashboard
