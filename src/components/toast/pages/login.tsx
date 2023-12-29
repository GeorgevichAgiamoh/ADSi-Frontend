import { useEffect, useState } from "react";
import { Btn, EditText, EditTextFilled, LrText, Mgin, appName, isEmlValid, myEles, setTitle } from "../../../helper/general"
import useWindowDimensions from "../../../helper/dimension";
import { MsgAlert } from "../../../helper/adsi";
import coin from '../../../assets/coin.png'
import thumb from '../../../assets/thumbs.png'
import { ErrorOutline, Info } from "@mui/icons-material";



export function MemberLogin(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[eml,setEml] = useState('')

    useEffect(()=>{
        setTitle(`Login - ${appName}`)
    },[])

    return <div className="ctr" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        <div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <mye.BTv text="Member Login" size={40} />
            <Mgin top={20} />
            <mye.Tv text="Please enter the email you used to register on your organization's portal and we will send you a link to create a new password" center />
            <Mgin top={10} />
            <div style={{
                display: isEmlValid(eml)?'none':undefined,
                width:'100%'
            }}>
            <MsgAlert icon={ErrorOutline} mye={mye} msg="Please enter a valid emmail address" isError />
            </div>
            <Mgin top={10} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Email" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter Email" value={eml} eml noSpace min={3} recv={(v)=>{
                    setEml(v)
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="SEND LINK" onClick={()=>{
                //TODO implement
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Don't have an account?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Create an account" color={mye.mycol.primarycol} onClick={()=>{
                //TODO Login
            }} />}/>
        </div>

    </div>

}




export function Login(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[idormail,setIdormail] = useState('')
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')
    const[remember, setRemember] = useState(false)

    useEffect(()=>{
        setTitle(`Login - ${appName}`)
    },[])

    return <div className="ctr" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        <div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <mye.BTv text="Member Login" size={40} />
            <Mgin top={20} />
            <div style={{
                display: pwd1.length>8?'none':undefined,
                width:'100%'
            }}>
            <MsgAlert icon={Info} mye={mye} msg="Your Password must be at least 8 characters" />
            </div>
            <Mgin top={30} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Member ID or Email" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter ID or Email" value={idormail} noSpace min={8} recv={(v)=>{
                    setIdormail(v)
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Create Password" />
                <Mgin top={5} />
                <EditTextFilled hint="*******" value={pwd1} pwd min={8} recv={(v)=>{
                    setPwd1(v)
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Re-enter Password" />
                <Mgin top={5} />
                <EditTextFilled hint="*******" value={pwd2} pwd min={8} recv={(v)=>{
                    setPwd2(v)
                }} />
            </div>
            <Mgin top={10} />
            <label style={{
                alignSelf:'flex-start'
            }}>
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={()=>{
                        setRemember(!remember)
                    }}
                    />
                Remember me
            </label>
            <Mgin top={25} />
            <Btn txt="LOGIN" onClick={()=>{
                //TODO implement
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Don't have an account?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Create an account" color={mye.mycol.primarycol} onClick={()=>{
                //TODO Login
            }} />}/>
        </div>

    </div>
}




export function ForgotPin(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[eml,setEml] = useState('')

    useEffect(()=>{
        setTitle(`Forgot password - ${appName}`)
    },[])

    return <div className="ctr" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        <div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <mye.BTv text="Forgot Pin" size={40} />
            <Mgin top={20} />
            <mye.Tv text="Please enter your registered email address to receive a password reset link" center />
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Email" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter Email" value={eml} eml noSpace min={3} recv={(v)=>{
                    setEml(v)
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="SEND LINK" onClick={()=>{
                //TODO implement
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Don't have an account?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Create an account" color={mye.mycol.primarycol} onClick={()=>{
                //TODO Login
            }} />}/>
        </div>

    </div>

}


