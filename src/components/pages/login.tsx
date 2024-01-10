import { useEffect, useState } from "react";
import { ErrorOutline, Info, InfoOutlined } from "@mui/icons-material";
import { MsgAlert, PincodeLay } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, isEmlValid, EditTextFilled, Btn, LrText, ErrorCont, isMemID, useQuery, saveWhoType } from "../../helper/general";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../toast/toast";
import axios from "axios";
import { makeRequest, saveMemId } from "../../helper/requesthandler";



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



export function MailLogin(mainprop:{isAdmin?:boolean}){
    const qry = useQuery();
    const rdr  = qry.get('rdr')||""
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[eml,setEml] = useState(qry.get('eml') ?? '')
    const[pwd,setPwd] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        setTitle(`Login - ${appName}`)
    },[])



    const[load, setLoad]=useState(false)
    const[loadMsg, setLoadMsg]=useState('Just a sec')
    const[error, setError]=useState(false)
    const[toastMeta, setToastMeta] = useState({visible: false,msg: "",action:2,invoked:0})
    const[timy, setTimy] = useState<{timer?:NodeJS.Timeout}>({timer:undefined});
    function toast(msg:string, action:number,delay?:number){
      var _delay = delay || 5000
      setToastMeta({
          action: action,
          msg: msg,
          visible:true,
          invoked: Date.now()
      })
      clearTimeout(timy.timer)
      setTimy({
          timer:setTimeout(()=>{
              if(Date.now()-toastMeta.invoked > 4000){
                  setToastMeta({
                      action:2,
                      msg:"",
                      visible:false,
                      invoked: 0
                  })
              }
          },_delay)
      });
    }

    return <div className="vlc" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{

        }}/>
        <div className="prgcont" style={{display:load?"flex":"none"}}>
            <div className="hlc" style={{
                backgroundColor:mye.mycol.bkg,
                borderRadius:10,
                padding:20,
            }}>
                <CircularProgress style={{color:mye.mycol.primarycol}}/>
                <Mgin right={20} />
                <mye.Tv text={loadMsg} />
            </div>
        </div>
        <Toast isNgt={false} msg= {toastMeta.msg} action={toastMeta.action} visible={toastMeta.visible} canc={()=>{
                setToastMeta({
                    action:2,
                    msg:"",
                    visible:false,
                    invoked:0,
                })
            }} />
        <div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <Mgin top={40} />
            <mye.HTv text="Login" size={30} />
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Email or member ID" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter Email or member ID" value={eml} noSpace min={8} recv={(v)=>{
                    setEml(v.trim())
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Password" />
                <Mgin top={5} />
                <EditTextFilled hint="********" value={pwd} pwd min={6} recv={(v)=>{
                    setPwd(v.trim())
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="LOGIN" onClick={()=>{
                console.log(eml.length)
                if(eml.length<8 || pwd.length < 6){
                    toast('Invalid Email/ID or password',0)
                    return;
                }
                if(!isMemID(eml) && !isEmlValid(eml)){
                    toast('Invalid Email/ID',0)
                    return;
                }
                let memId = '', email = ''
                if(isMemID(eml)){
                    memId = eml
                }else{
                    email = eml
                }
                setLoad(true)
                new makeRequest().post('login',{
                    memid: memId,
                    email: email,
                    password: pwd
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        saveMemId(task.getData()['memid'])
                        saveWhoType(mainprop.isAdmin??false)
                        navigate(`/${rdr}`)
                    }else{
                        toast(task.getErrorMsg(),0)
                    }
                },true)
            }} />
            <div className="vlc" style={{
                width:'100%',
                display:mainprop.isAdmin?'none':undefined
            }}>
                <Mgin top={10} />
                <LrText left={<mye.Tv text="Forgot your password?" color={mye.mycol.primarycol} />} 
                right={<mye.Tv text="Reset password" color={mye.mycol.primarycol} onClick={()=>{

                }} />}/>
                <Mgin top={10} />
                <mye.Tv text="Haven't registered yet ?"  />
                <Mgin top={10} />
                <Btn txt="REGISTER" onClick={()=>{
                    navigate(`/register?${isMemID(eml)?'mid':'eml'}=${eml}`)
                }} bkg={mye.mycol.btnstrip} tcol={mye.mycol.primarycol} />
            </div>
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