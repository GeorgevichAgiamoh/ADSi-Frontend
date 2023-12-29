//Incudes components specific to ADSI 

import { useState } from "react";
import { Mgin, icony, myEles } from "./general";
import { Close } from "@mui/icons-material";

export function MsgAlert(prop:{mye:myEles,icon:icony,msg:string,isError?:boolean}){
    const[show,setShow] = useState(true)
    const bkgCol = prop.isError?'rgba(255, 0, 0,0.1)':'rgba(57, 144, 229,0.1)',
     col = prop.isError?'rgb(255, 0, 0)':'rgb(57, 144, 229)'

    return <div style={{
        padding:'10px 20px',
        display:show?'flex':'none',
        width:'100%',
        boxSizing:'border-box',
        backgroundColor:bkgCol,
        borderRadius:10,
        alignItems:'center',
        
    }}>
        <prop.icon style={{
            color: col
        }}/>
        <Mgin right={10} />
        <div style={{
            flex:1
        }}>
            <prop.mye.Tv text={prop.isError?'Error: ':'Information: '+prop.msg} color={col} />
        </div>
        <Close id='clk' style={{
            color:prop.mye.mycol.black
        }} onClick={()=>{
            setShow(false)
        }} />
    </div>

}

















