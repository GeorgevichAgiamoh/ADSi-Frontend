import { useEffect, useState } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { Btn, DatePicky, EditTextFilled, IconBtn, Line, LoadLay, LrText, Mgin, appName, icony, myEles, setTitle } from "../../../../helper/general"
import { AccountBalance, Add, ArrowBack, ArrowForward, CalendarMonth, CalendarViewDayOutlined, Close, CloudDownloadOutlined, Filter1Outlined, FilterOutlined, KeyboardArrowDown, ListAltOutlined, MoreVert, PersonOutline, SearchOutlined, SortOutlined, TroubleshootRounded } from "@mui/icons-material"
import { indivEle } from "../../../classes/classes"
import { format } from "date-fns"
import { AdminDirAdd } from "./dirAdd"
import { AdminDirList } from "./dirList"
import { AdminDirView } from "./dirView"
import { CircularProgress } from "@mui/material"



export function AdminDirectory(){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[user, setUser] = useState<indivEle>()
    const[stage, setStage] = useState(-1)

    useEffect(()=>{
        setTitle(`Directory - ${appName}`)
    },[])


    if(stage == -1){
        return <AdminDirList actiony={(action,user)=>{
            setUser(user)
            setStage(action)
        }} />
    }
    if(stage == 0 && user){
        return <AdminDirView approved={true} user={user} backy={()=>{
            setStage(-1)
        }}/>
    }
    if(stage == 1){
        return <AdminDirAdd backy={()=>{
            setStage(-1)
        }}/>
    }
    if(stage == 2 && user){
        return <AdminDirView approved={false} user={user} backy={()=>{
            setStage(-1)
        }}/>
    }
    return LoadLay()
}

