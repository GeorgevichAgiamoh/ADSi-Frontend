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
    const[outstanding, setOutstanding] = useState<string[]>()
    const[stage, setStage] = useState(-1)

    useEffect(()=>{
        setTitle(`Payments - ${appName}`)
    },[])


    if(stage == -1){
        return <MemberPayTypes  mbi={mainprop.mbi} actiony={(action,o,pt)=>{
            setPayRecord(pt)
            setOutstanding(o)
            setStage(action)
        }} />
    }
    if(stage == 0 || stage == 1|| (stage == 2 && outstanding)){
        return <MemberPaymentList tabPos={stage} outstanding={outstanding} backy={()=>{
            setStage(-1)
        }} />
    }
    return <div className="ctr" style={{
        width:'100%',
        height:'100%'
    }}>
        <CircularProgress className="icon" />
    </div>

    

}

