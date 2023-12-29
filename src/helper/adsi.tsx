//Incudes components specific to ADSI 

import { ChangeEvent, useRef, useState } from "react";
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


export function PincodeLay(prop:{mye:myEles, ocl:(val:string)=>void}){
    const [pin, setPin] = useState(['', '', '', '']);
    const pinInputRefs = [useRef<HTMLInputElement>(null),useRef<HTMLInputElement>(null),useRef<HTMLInputElement>(null),useRef<HTMLInputElement>(null)];

    const handlePinChange = (index: number, value: string) => {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Move focus to the next input, if available
        if (value !== '' && pinInputRefs[index + 1].current) {
            if(index < 3){
                pinInputRefs[index + 1].current?.focus();
            }else{
                prop.ocl(pin[0]+pin[1]+pin[2]+pin[3]);
            }
        }
    };

    const handleBackspace = (index: number, value: string) => {
        if (value === '' && index > 0 && pinInputRefs[index - 1].current) {
        pinInputRefs[index - 1].current?.focus();
        }
    };

    return (
        <div>
        {pin.map((digit, index) => (
            <input className="pincode"
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handlePinChange(index, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                    handleBackspace(index, pin[index]);
                    }
                }}
                ref={pinInputRefs[index]}
            />
        ))}
        </div>
    );
}














