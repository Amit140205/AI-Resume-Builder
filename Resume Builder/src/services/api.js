import axios from "axios"

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL : "http://localhost:1337/api/",
    headers : {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${API_KEY}`
    }
})

const createNewResume = (data) => axiosClient.post("/user-resumes",data)
const getUserResume = (userEmail) => axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`)
const updateResumeDetails = (id,data) => axiosClient.put(`/user-resumes/${id}`,data)
const getResumeInfoById = (id) => axiosClient.get(`/user-resumes/${id}?populate=*`)
const deleteResumeById = (id)=>axiosClient.delete(`/user-resumes/${id}`)

export {createNewResume,getUserResume,updateResumeDetails,getResumeInfoById,deleteResumeById}