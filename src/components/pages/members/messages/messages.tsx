import { useEffect, useState } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { LoadLay, appName, myEles, setTitle } from "../../../../helper/general"
import { payTypeEle } from "../../../classes/classes"
import { CircularProgress } from "@mui/material"
import { MemberMessagesList } from "./messageList"
import { msgThread, memberBasicinfo } from "../../../classes/models"
import { MemberMessageThread } from "./messageThread"



export function MemberMessages(mainprop:{mbi:memberBasicinfo}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[stage, setStage] = useState(-1)
    const[thread, setThread] = useState<msgThread>()

    useEffect(()=>{
        setTitle(`Messages - ${appName}`)
    },[])


    if(stage == -1){
        return <MemberMessagesList mbi={mainprop.mbi} actiony={(thread,action)=>{
            setStage(action)
            setThread(thread)
        }} backy={()=>{
            setStage(-1)
        }} />
    }
    if(stage == 1 && thread){
        return <MemberMessageThread mbi={mainprop.mbi} backy={()=>{
            setStage(-1)
        }} thread={thread} />
    }
    return LoadLay()
}

