import { useEffect, useState } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { Btn, DatePicky, EditTextFilled, IconBtn, Line, LoadLay, LrText, Mgin, appName, icony, myEles, setTitle } from "../../../../helper/general"
import { format } from "date-fns"
import { AdminDirAdd } from "./dirAdd"
import { AdminDirList } from "./dirList"
import { AdminDirView } from "./dirView"
import { CircularProgress } from "@mui/material"
import { memberGeneralinfo } from "../../../classes/models"



export function AdminDirectory(){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[user, setUser] = useState<memberGeneralinfo>()
    const[stage, setStage] = useState(-1)

    useEffect(()=>{
        setTitle(`Directory - ${appName}`)
    },[])


    if(stage == -1){
        return <AdminDirList actiony={(action,user)=>{ // The `user` must have been prepared (gen and fin) on click
            setUser(user)
            setStage(action)
        }} />
    }
    if((stage == 0 || stage == 2) && user){
        return <AdminDirView user={user} backy={(action)=>{
            setStage(action)
        }}/>
    }
    if(stage == 1 && user){
        return <AdminDirAdd user={user} backy={()=>{
            setStage(-1)
        }}/>
    }
    return LoadLay()
}

