import { useEffect, useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import coin from '../../assets/coin.png'
import thumb from '../../assets/thumbs.png'
import { MsgAlert } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, EditTextFilled, Btn, useQuery, ErrorCont, isEmlValid, isPhoneNigOk } from "../../helper/general";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../toast/toast";
import { makeRequest, saveMemId } from "../../helper/requesthandler";



export function Register(){
    const qry = useQuery();
    const navigate = useNavigate()
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[fname,setFName] = useState('')
    const[mname,setMName] = useState('')
    const[lname,setLName] = useState('')
    const[eml,setEml] = useState(qry.get('eml') ?? '')
    const[phn,setPhn] = useState('')
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')
    const[memid,setMemid] = useState(qry.get('mid') ?? '')

    useEffect(()=>{
        setTitle(`Register - ${appName}`)
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
            <mye.HTv text="Create an Account" size={35} />
            <Mgin top={20} />
            <MsgAlert icon={InfoOutlined} mye={mye} msg="Fields marked * are compulsory" />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:'100%'
            }}>
                <div style={{
                    flex:1
                }}>
                    <mye.Tv text="*First Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="First Name" value={fname} noSpace min={3} recv={(v)=>{
                        setFName(v.trim())
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="Middle Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Middle Name" value={mname} noSpace min={0} recv={(v)=>{
                        setMName(v.trim())
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Last Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Last Name" value={lname} noSpace min={3} recv={(v)=>{
                        setLName(v.trim())
                    }} />
                </div>
            </div>
            <Mgin top={5} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Email Address" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter Email Address" value={eml} noSpace min={0} recv={(v)=>{
                    setEml(v.trim())
                }} />
            </div>
            <Mgin top={5} />
            <mye.Tv text="For Verification purposes, please use official coorperative email address" color={mye.mycol.hint} size={12} />
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Phone Number" />
                <Mgin top={5} />
                <EditTextFilled hint="08012345678" value={phn} digi noSpace min={11} max={15} recv={(v)=>{
                    setPhn(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Password" />
                <Mgin top={5} />
                <EditTextFilled hint="******" value={pwd1} min={6} pwd recv={(v)=>{
                    setPwd1(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Confirm Password" />
                <Mgin top={5} />
                <EditTextFilled hint="******" value={pwd2} min={6} pwd recv={(v)=>{
                    setPwd2(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Member ID" />
                <Mgin top={5} />
                <EditTextFilled hint="00000001" value={memid} min={8} max={8}digi recv={(v)=>{
                    setMemid(v.trim())
                }} />
            </div>
            <Mgin top={35} />
            <Btn txt="CREATE ACCOUNT" onClick={()=>{
                if(fname.length < 3){
                    toast('Invalid First Name Input',0)
                    return;
                }
                if(lname.length < 3){
                    toast('Invalid Last Name Input',0)
                    return;
                }
                if(eml.length >0 && !isEmlValid(eml)){
                    toast('Invalid Email',0)
                    return
                }
                if(!isPhoneNigOk(phn)){
                    toast('Invalid Phone Number',0)
                    return
                }
                if(pwd1.length < 6){
                    toast('Invalid Password',0)
                    return
                }
                if(pwd1 != pwd2){
                    toast('password mismatch',0)
                    return
                }
                if(memid.length != 8){
                    toast('Invalid member ID. Must be 8 characters',0)
                    return
                }
                setLoad(true)
                makeRequest.post('register',{
                    memid:memid,
                    phn:phn,
                    password:pwd1
                },(task)=>{
                    if(task.isSuccessful()){
                        //Set Basic Data
                        makeRequest.post('setMemberBasicInfo',{
                            memid:memid,
                            fname:fname,
                            lname:lname,
                            mname:mname,
                            eml:eml,
                            phn:phn,
                            verif:'0'
                        },(task)=>{
                            saveMemId(memid)
                            makeRequest.get('logout',{},(task)=>{
                                setLoad(false)
                                navigate('/login')
                            })
                        })
                    }else{
                        setLoad(false)
                        toast(task.getErrorMsg()+' Maybe login instead',0)
                    }
                },true)
            }} />
            <Mgin top={20} />
            <div className="hlc">
                <mye.Tv text="Already have an account?" color={mye.mycol.primarycol} />
                <Mgin right={10} />
                <mye.Tv text="Sign In" color={mye.mycol.primarycol} onClick={()=>{
                    navigate(`/login?eml=${memid.length>7?memid:eml}`)
                }} />
            </div>
        </div>

    </div>

}



export function MakePayment(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[shares,setShares] = useState('')
    const[amt, setAmt] = useState('')
    const[paySuccess, setPaySuccess] = useState(false)

    useEffect(()=>{
        setTitle(`Make Payment - ${appName}`)
    },[])

    return <div className="ctr" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        {paySuccess?<div className="vlc" style={{
            width:dimen.dsk?300:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <img src={thumb} alt="Payments" height={100} />
            <Mgin top={30} />
            <mye.BTv text="Payment Successful" size={22} />
            <Mgin top={30} />
            <Btn txt="PROCEED TO DASHBOARD" onClick={()=>{

            }} />
            </div>:
        <div className="vlc" style={{
            width:dimen.dsk?500:dimen.width,
            padding:dimen.dsk?0:10,
            boxSizing:'border-box'
        }}>
            <img src={coin} alt="Payments" height={100} />
            <Mgin top={30}/>
            <mye.HTv text="You are required to pay the following"  />
            <Mgin top={10}/>
            <mye.Tv text="1. Membership Registration: N5000 (One-time payment)" />
            <Mgin top={5} />
            <mye.Tv text="2. Thrift (annual Dues): N1000 monthly (N12,000 paid annually)" />
            <Mgin top={5} />
            <mye.Tv text="3. Share Capital: Minimum of 1000 shares @ N10 per share" />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:'100%'
            }}>
                <div style={{
                    flex:1
                }}>
                    <mye.Tv text="*Shares" />
                    <Mgin top={5} />
                    <EditTextFilled hint="1000" value={shares} noSpace digi recv={(v)=>{
                        setShares(v)
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Amount To Pay" />
                    <Mgin top={5} />
                    <div style={{
                        width:'100%',
                        boxSizing:'border-box',
                        padding:'15px 20px',
                        backgroundColor: mye.mycol.btnstrip,
                        borderRadius:10
                    }}>
                        <mye.Tv  text={amt.length!==0?amt:"Auto Calculated"} size={16} color={mye.mycol.hint}/>
                    </div>
                </div>
            </div>,
            <Mgin top={35} />
            <Btn txt="PAY" onClick={()=>{
                setPaySuccess(true)
            }} />
        </div>}
    </div>

}


