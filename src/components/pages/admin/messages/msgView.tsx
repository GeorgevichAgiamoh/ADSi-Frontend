import { useEffect, useState } from "react"
import { Btn, IconBtn, Line, LrText, Mgin, appName, myEles, setTitle } from "../../../../helper/general"
import useWindowDimensions from "../../../../helper/dimension"
import { ArrowBack, FileOpenOutlined, Forward, PersonOutline, Reply } from "@mui/icons-material"
import {  msgMeta } from "../../../classes/classes"
import dp from "../../../../assets/dp.png"
import { MsgSendStat, ReplyMsg } from "./messages"


export function AdminMsgView(mainprop:{msg:msgMeta,backy:()=>void}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[showReply, setShowReply] = useState(false)
    const[replyStat, setReplyStat] = useState(2)//0=Failed, 1= Succcess
    

    useEffect(()=>{
        setTitle(`View User - ${appName}`)
    },[])

    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <div id="clk" className="hlc" onClick={()=>{
            mainprop.backy()
        }}>
            <ArrowBack className="icon" />
            <Mgin right={10} />
            <mye.HTv text="Go Back" size={14} />
        </div>
        <Mgin top={20} />
        <div id="lshdw" className="vlc" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            boxSizing:'border-box',
            padding:dimen.dsk?20:10
        }}>
            <LrText
            left={<div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <img src={dp} alt="Messager" height={42}  />
                <Mgin right={15}/>
                <div>
                    <mye.Tv text="Sent By:"  />
                    <Mgin top={5} />
                    <mye.Tv text={mainprop.msg.whosent} />
                </div>
            </div>}
            right={<mye.Tv text={mainprop.msg.date} size={16} />}
            />
            <Mgin top={20} />
            <mye.BTv size={20} text={mainprop.msg.subject} color={mye.mycol.primarycol}/>
            <Mgin top={20} />
            <mye.Tv  text={mainprop.msg.msg} />
        </div>
        <Mgin top={20} />
        <LrText 
        left={<IconBtn mye={mye} icon={Reply} text="Reply" ocl={()=>{
            setShowReply(true)
        }} width={150} />}
        right={<IconBtn mye={mye} icon={Forward} text="Forward" ocl={()=>{

        }} width={150} outld/>}
        />
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:showReply?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 35%':0
        }}>
            <ReplyMsg finise={(msg)=>{
                setShowReply(false)
                setReplyStat(1)
            }} frm={mainprop.msg.whosent} to={mainprop.msg.whoreceived} closy={()=>{
                setShowReply(false)
            }}/>
        </div>
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:(replyStat < 2)?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 35%':0
        }}>
            <MsgSendStat success={replyStat==1} closy={()=>{
                setReplyStat(2)
            }} />
        </div>
    </div>

    function InfoLay(prop:{sub:string, main:string}) {
        return <div style={{
            minWidth:dimen.dsk?120:100,
            marginTop:dimen.dsk?20:20,
            marginRight:10
        }}>
            <mye.Tv text={prop.sub} color={mye.mycol.imghint} size={12} />
            <Mgin top={5} />
            <mye.Tv text={prop.main} size={16} />
        </div>
    }

}