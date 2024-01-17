import { useEffect, useState } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { appName, myEles, setTitle } from "../../../../helper/general"
import { CircularProgress } from "@mui/material"
import { MemberPayTypes } from "./payTypeList"
import { MemberPaymentList } from "./paymentList"
import { memberBasicinfo, payRecordEle } from "../../../classes/models"



export function MemberPayments(mainprop:{mbi:memberBasicinfo}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[payRecord, setPayRecord] = useState<payRecordEle>()
    const[dues, setDues] = useState<payRecordEle[]>([])
    const[investments, setInvestments] = useState<payRecordEle[]>([])
    const[stage, setStage] = useState(-1)

    useEffect(()=>{
        setTitle(`Payments - ${appName}`)
    },[])


    if(stage == -1){
        return <MemberPayTypes mbi={mainprop.mbi} actiony={(action,d,i,pt)=>{
            setDues(d)
            setInvestments(i)
            setPayRecord(pt)
            setStage(action)
        }} />
    }
    if(stage == 0 || stage == 1){
        return <MemberPaymentList isDues={stage==1} dues={dues} investments={investments} backy={()=>{
            setStage(-1)
        }} />
    }
    if(stage == 1  && payRecord){
        
    }
    if(stage == 2 && payRecord){
        
    }
    return <div className="ctr" style={{
        width:'100%',
        height:'100%'
    }}>
        <CircularProgress className="icon" />
    </div>

    

}

