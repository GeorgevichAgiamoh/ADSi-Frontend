import { useEffect, useState } from "react";
import { ErrorOutline, Info } from "@mui/icons-material";
import { MsgAlert, PincodeLay } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, isEmlValid, EditTextFilled, Btn, LrText } from "../../helper/general";



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
            <mye.BTv text="Member Login" size={40} color={mye.mycol.primarycol} />
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
            <mye.BTv text="Forgot Pin" size={40} color={mye.mycol.primarycol} />
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







export function Verif(){
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
            <mye.BTv text="Verification" size={40} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            <mye.Tv text="Please enter the verification code we just sent to your phone number" center />
            <Mgin top={20} />
            <PincodeLay mye={mye} ocl={()=>{

            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Didn't receive a code?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Resend" color={mye.mycol.primarycol} onClick={()=>{
                //TODO Login
            }} />}/>
            <Mgin top={40} />
            <Btn txt="VERIFY" onClick={()=>{

            }} />
        </div>

    </div>

}




export function ResetPin(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')
    const[remember, setRemember] = useState(false)

    useEffect(()=>{
        setTitle(`Reset Pin - ${appName}`)
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
            <mye.BTv text="Reset Pin" size={40} color={mye.mycol.primarycol} />
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
            <Btn txt="RESET PIN" onClick={()=>{
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



export function MailLogin(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[eml,setEml] = useState('')
    const[pwd,setPwd] = useState('')

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
            <mye.HTv text="Login" size={30} />
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
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Password" />
                <Mgin top={5} />
                <EditTextFilled hint="********" value={pwd} pwd min={8} recv={(v)=>{
                    setPwd(v)
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="LOGIN" onClick={()=>{
                //TODO implement
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Forgot your password?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Reset password" color={mye.mycol.primarycol} onClick={()=>{
                //TODO Login
            }} />}/>
        </div>

    </div>

}



export function PasswordResetRequest(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[eml,setEml] = useState('')

    useEffect(()=>{
        setTitle(`Password Reset - ${appName}`)
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
            <mye.HTv text="Password Reset" size={30} />
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
            <Btn txt="RESET PASSWORD" onClick={()=>{
                //TODO implement
            }} />
        </div>

    </div>

}



export function PasswordReset(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')

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
            <mye.HTv text="Password Reset" size={30} />
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="New Password" />
                <Mgin top={5} />
                <EditTextFilled hint="********" value={pwd1} pwd min={8} recv={(v)=>{
                    setPwd1(v)
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Confirm Password" />
                <Mgin top={5} />
                <EditTextFilled hint="********" value={pwd2} pwd min={8} recv={(v)=>{
                    setPwd2(v)
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="SAVE PASSWORD" onClick={()=>{
                //TODO implement
            }} />
        </div>

    </div>

}