import { useEffect, useState } from "react";
import { DoneOutline, ErrorOutline, Info, InfoOutlined, MailOutline } from "@mui/icons-material";
import { MsgAlert, PincodeLay, PoweredBySSS } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, isEmlValid, EditTextFilled, Btn, LrText, ErrorCont, isMemID, useQuery, saveWhoType, formatMemId, isPhoneNigOk } from "../../helper/general";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../toast/toast";
import axios from "axios";
import { getMemId, makeRequest, saveMemId } from "../../helper/requesthandler";




export function ForgotPassword(){
    const navigate = useNavigate()
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[mid,setMemid] = useState('')
    const[sent,setSent] = useState(false)

    useEffect(()=>{
        setTitle(`Forgot password - ${appName}`)
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

    return <div className="ctr" style={{
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
        {sent?<div className="ctr" style={{
            width:'100%',
            height:'100%'
        }}>
            <MailOutline style={{
                color:mye.mycol.primarycol,
                fontSize:30
            }} />
            <Mgin top={10} />
            <mye.BTv text="Reset Email Sent" size={18} />
            <Mgin top={10} />
            <mye.Tv text="Go and click the password reset link sent to your email" />
        </div>:<div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <mye.BTv text="Forgot Pin" size={40} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            <mye.Tv text="Please enter your ADSI Number and we will send a password reset link to the email you registred with" center />
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="ADSI Number" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter ADSI Number" value={mid} digi min={1} recv={(v)=>{
                    setMemid(v)
                }} />
            </div>
            <Mgin top={20} />
            <Btn txt="SEND LINK" onClick={()=>{
                if(!isMemID(mid)){
                    toast('Invalid ADSI Number',0)
                    return
                }
                setLoad(true)
                makeRequest.post('sendPasswordResetEmail',{
                    memid:mid
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        setSent(true)
                    }else{
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Don't have an account?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Create an account" color={mye.mycol.primarycol} onClick={()=>{
                navigate(`/register`)
            }} />}/>
        </div>}

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




export function ResetPassword(){
    const navigate = useNavigate()
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')
    const token = useParams().token;
    const[changed,setChanged] = useState(false)

    useEffect(()=>{
        setTitle(`Reset Password - ${appName}`)
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

    return <div className="ctr" style={{
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
        {changed?<div className="ctr" style={{
            width:'100%',
            height:'100%'
        }}>
            <DoneOutline style={{
                color:mye.mycol.primarycol,
                fontSize:30
            }} />
            <Mgin top={10} />
            <mye.BTv text="Password Changed" size={18} />
            <Mgin top={10} />
            <mye.Tv text="Please proceed to login" />
            <Mgin top={10} />
            <Btn txt="LOGIN" width={100} onClick={()=>{
                navigate(`/login`)
            }} />
        </div>:<div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <mye.BTv text="Reset Password" size={40} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            <div style={{
                display: pwd1.length>6?'none':undefined,
                width:'100%'
            }}>
            <MsgAlert icon={Info} mye={mye} msg="Your Password must be at least 6 characters" />
            </div>
            <Mgin top={30} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Create Password" />
                <Mgin top={5} />
                <EditTextFilled hint="*******" value={pwd1} pwd min={6} recv={(v)=>{
                    setPwd1(v)
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Re-enter Password" />
                <Mgin top={5} />
                <EditTextFilled hint="*******" value={pwd2} pwd min={6} recv={(v)=>{
                    setPwd2(v)
                }} />
            </div>
            <Mgin top={25} />
            <Btn txt="RESET PASSWORD" onClick={()=>{
                if(pwd1.length<6){
                    toast('Password must be minimum of 6 characters',0)
                    return;
                }
                if(pwd1 != pwd2){
                    toast('Password mismatch',0)
                    return;
                }
                setLoad(true)
                makeRequest.post('resetPassword',{
                    token: token,
                    pwd:pwd1
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        setChanged(true)
                    }else{
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} />
            <Mgin top={20} />
            <LrText left={<mye.Tv text="Don't have an account?" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Create an account" color={mye.mycol.primarycol} onClick={()=>{
                navigate(`/register`)
            }} />}/>
        </div>}

    </div>
}



export function MailLogin(mainprop:{isAdmin?:boolean}){
    const qry = useQuery();
    const rdr  = qry.get('rdr')||""
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[mid,setMid] = useState(qry.get('mid') ?? '')
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
            <mye.HTv text={`${mainprop.isAdmin?'Admin ':''}login`} size={30} />
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="ADSI Number" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter ADSI Number" value={mid} digi noSpace min={1} recv={(v)=>{
                    console.log('..LOGIN.')
                    setMid(v.trim())
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
                }} finise={()=>{
                    do_login()
                }}/>
            </div>
            <Mgin top={20} />
            <Btn txt="LOGIN" onClick={()=>{
                do_login()
            }} />
            <Mgin top={10} />
            <LrText left={<mye.Tv text="" color={mye.mycol.primarycol} />} 
            right={<mye.Tv text="Reset password" color={mye.mycol.primarycol} onClick={()=>{
                navigate('/forgotpassword')
            }} />}/>
            <Mgin top={10} />
            <mye.Tv text="Haven't registered yet ?"  />
            <Mgin top={10} />
            <Btn txt="REGISTER" onClick={()=>{
                navigate(`/register?mid=${mid}`)
            }} bkg={mye.mycol.btnstrip} tcol={mye.mycol.primarycol} />
            <PoweredBySSS floaatIt noPadding/>
        </div>

    </div>

    function do_login() {
        console.log(mid.length)
        if(pwd.length < 6){
            toast('Invalid password',0)
            return;
        }
        if(!isMemID(mid)){
            toast('Invalid ID',0)
            return;
        }
        let memId = formatMemId(mid)
        setLoad(true)
        makeRequest.post('login',{
            memid: memId,
            password: pwd,
        },(task)=>{
            if(task.isSuccessful()){
                saveMemId(task.getData()['memid'])
                saveWhoType(mainprop.isAdmin??false)
                if(mainprop.isAdmin){
                    makeRequest.post('authAsAdmin',{},(task)=>{
                        setLoad(false)
                        if(task.isSuccessful()){
                            navigate(`/admindash`)
                        }else{
                            toast(task.getErrorMsg(),0)
                        }
                    },true)
                }else{
                    setLoad(false)
                    navigate(`/${rdr}`)
                }
            }else{
                setLoad(false)
                toast(task.getErrorMsg(),0)
            }
        },true)
    }

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
                <EditTextFilled hint="********" value={pwd1} pwd min={6} recv={(v)=>{
                    setPwd1(v)
                }} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Confirm Password" />
                <Mgin top={5} />
                <EditTextFilled hint="********" value={pwd2} pwd min={6} recv={(v)=>{
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