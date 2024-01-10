import { useEffect, useState } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { Btn, BtnIcn, DatePicky, EditTextFilled, IconBtn, Line, LrText, Mgin, appName, icony, myEles, setTitle } from "../../../../helper/general"
import { AccountBalance, Add, ArrowBack, ArrowForward, AttachFile, CalendarMonth, CalendarViewDayOutlined, Close, CloseRounded, CloudDownloadOutlined, DoneRounded, Filter1Outlined, FilterOutlined, KeyboardArrowDown, ListAltOutlined, Mail, MoreVert, PersonOutline, SearchOutlined, SortOutlined, TroubleshootRounded } from "@mui/icons-material"
import { indivEle, msgMeta } from "../../../classes/classes"
import { format } from "date-fns"
import { CircularProgress } from "@mui/material"
import { AdminMsgList } from "./msglist"
import { AdminMsgView } from "./msgView"



export function AdminMessaging(){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[msg, setMsg] = useState<msgMeta>()
    const[stage, setStage] = useState(-1)

    useEffect(()=>{
        setTitle(`Directory - ${appName}`)
    },[])


    if(stage == -1){
        return <AdminMsgList actiony={(action,msg)=>{
            setMsg(msg)
            setStage(action)
        }} />
    }
    if(stage == 0 && msg){
        return <AdminMsgView msg={msg} backy={()=>{
            setStage(-1)
        }}/>
    }
    if(stage == 1){
        
    }
    if(stage == 2 && msg){
        
    }
    return <div className="ctr" style={{
        width:'100%',
        height:'100%'
    }}>
        <CircularProgress className="icon" />
    </div>

    

}

export function NewMsg(prop:{closy:()=>void}){
    const[ato, setATo] = useState('')
    const[asubject, setASubject] = useState('')
    const[amsg, setAMsg] = useState('')
    const mye = new myEles(false)

    return <div style={{
        backgroundColor: mye.mycol.bkg,
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        borderRadius:10
    }}>
        <div style={{
            backgroundColor:mye.mycol.primarycol,
            padding:'10px 20px',
            borderRadius:'10px 10px 0 0'
        }}>
            <LrText 
            left={<mye.HTv text="New Message" color={mye.mycol.white} size={16} />}
            right={<BtnIcn icon={Close} color={mye.mycol.white} ocl={()=>{
                prop.closy()
            }}  />}
            />
        </div>
        <div style={{
            width:'100%',
            flex:1,
            boxSizing:'border-box',
            padding:'15px 30px',
            display:'flex',
            flexDirection:'column'
        }}>
            <Mgin top={20} />
            <input className="tinp"
                type="text"
                value={ato}
                placeholder="To"
                onChange={(e)=>{
                    setATo(e.target.value)
                }}
                style={{
                    width:'100%',
                }}
            />
            <Mgin top={5} />
            <Line />
            <Mgin top={20} />
            <input className="tinp"
                type="text"
                value={asubject}
                placeholder="Subject"
                onChange={(e)=>{
                    setASubject(e.target.value)
                }}
                style={{
                    width:'100%',
                }}
            />
            <Mgin top={5} />
            <Line />
            <input className="tinp"
                type="text"
                value={amsg}
                placeholder="Type message here"
                onChange={(e)=>{
                    setAMsg(e.target.value)
                }}
                style={{
                    flex:1,
                    width:'100%'
                }}
            />
            <Line />
            <Mgin top={20} />
            <div className="hlc" style={{
                alignSelf:'flex-end'
            }}>
                <AttachFile id='clk' className="icon" style={{
                    fontSize:18
                }} />
                <Mgin right={10} />
                <IconBtn icon={Mail} mye={mye} text="SEND MESSAGE" ocl={()=>{
                    
                }} width={150} />
            </div>
        </div>
    </div>
}


export function ReplyMsg(prop:{frm:string, to:string,finise:(msg:string)=>void,closy:()=>void}){
    const[amsg, setAMsg] = useState('')
    const mye = new myEles(false)

    return <div style={{
        backgroundColor: mye.mycol.bkg,
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        borderRadius:10,
        alignItems:'self-start',
        padding:20,
        boxSizing:'border-box'
    }}>
        <div style={{
            alignSelf:'flex-end'
        }}>
            <BtnIcn icon={Close} color={mye.mycol.primarycol} ocl={()=>{
                prop.closy()
            }}  />
        </div>
        <mye.Tv  text={`From: ${prop.frm}`} />
        <Mgin top={10} />
        <mye.Tv  text={`To: ${prop.to}`} />
        <Mgin top={20} />
        <input className="tinp"
            type="text"
            value={amsg}
            placeholder="Type message here"
            onChange={(e)=>{
                setAMsg(e.target.value)
            }}
            style={{
                flex:1,
                width:'100%',
                borderRadius:10,
                backgroundColor:mye.mycol.btnstrip
            }}
        />
        <Mgin top={20} />
        <div className="hlc">
            <AttachFile id='clk' className="icon" style={{
                fontSize:18
            }} />
            <Mgin right={10} />
            <IconBtn icon={Mail} mye={mye} text="SEND MESSAGE" ocl={()=>{
                if(amsg.length>0){
                    prop.finise(amsg)
                }
            }} width={150} />
        </div>
    </div>
}


export function MsgSendStat(prop:{success:boolean,closy:()=>void}){
    const mye = new myEles(false)

    return <div style={{
        backgroundColor: mye.mycol.bkg,
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        borderRadius:10,
        alignItems:'center',
        padding:20,
        boxSizing:'border-box'
    }}>
        <div style={{
            alignSelf:'flex-end'
        }}>
            <BtnIcn icon={Close} color={mye.mycol.primarycol} ocl={()=>{
                prop.closy()
            }}  />
        </div>
        <Mgin top={10} />
        <div className="ctr" style={{
            flex:1,
            width:'100%'
        }}>
            {prop.success?<DoneRounded style={{
                fontSize:35,
                color:mye.mycol.primarycol
            }} />:<CloseRounded style={{
                fontSize:35,
                color:mye.mycol.red
            }} />}
            <Mgin top={20} />
            <mye.Tv  center text={prop.success?'Your message has been sent successfully':'Message could not be sent'} />
            <Mgin top={20} />
            <Btn txt="CONTINUE" onClick={()=>{

            }} width={150} smallie />
        </div>
    </div>
}