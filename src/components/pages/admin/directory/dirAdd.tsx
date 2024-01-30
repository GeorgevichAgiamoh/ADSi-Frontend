import { ArrowBack, PersonOutline, CalendarMonth, AccountBalance } from "@mui/icons-material"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, EditTextFilled, LrText, DatePicky, Btn, ErrorCont, isPhoneNigOk, isEmlValid, formatMemId } from "../../../../helper/general"
import { mLoc } from "monagree-locs/dist/classes"
import { mCountry, mLga, mState } from "monagree-locs"
import { defVal, memberGeneralinfo } from "../../../classes/models"
import { mBanks } from "monagree-banks"
import { CircularProgress } from "@mui/material"
import Toast from "../../../toast/toast"
import { makeRequest } from "../../../../helper/requesthandler"
import { useLocation, useNavigate } from "react-router-dom"
import { CustomCountryTip, PoweredBySSS } from "../../../../helper/adsi"


export function AdminDirAdd(mainprop:{backy:(action:number)=>void}){
    const dimen = useWindowDimensions()
    const navigate = useNavigate()
    const location = useLocation()
    const mye = new myEles(false)
    const [myKey, setMyKey] = useState(Date.now())
    const[fname, setFname] = useState('')
    const[mname, setMname] = useState('')
    const[lname, setLname] = useState('')
    const[memID, setMemID] = useState('')
    const[phn, setPhn] = useState('')
    const[eml, setEml] = useState('')


    useEffect(()=>{
        setTitle(`Create Member - ${appName}`)        
    },[])

    function gimmeWidth(long?:boolean){
        return dimen.dsk?long?'450px':'300px':'100%'
    }

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

    return <div key={myKey} style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
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
        <div id="clk" className="hlc" onClick={()=>{
            mainprop.backy(-1)
        }}>
            <ArrowBack className="icon" />
            <Mgin right={10} />
            <mye.HTv text="Go Back" size={14} />
        </div>
        <Mgin top={20} />
        <div id="lshdw" style={{
            backgroundColor: mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10
        }}>
            <div className="hlc">
                <PersonOutline style={{
                    fontSize:20,
                    color:mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.HTv size={14} text="New Member" color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="*First Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Grey" min={3} value={fname} recv={(v)=>{
                        setFname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Middle Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Amarchi" min={3} value={mname} recv={(v)=>{
                        setMname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="*Last Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Adamma" min={3} value={lname} recv={(v)=>{
                        setLname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="ADSI Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00000000" min={1} value={memID} recv={(v)=>{
                        setMemID(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Phone Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="09193282737" min={5} max={20} value={phn} recv={(v)=>{
                        setPhn(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Email" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Example@gmail.com" min={6} eml value={eml} recv={(v)=>{
                        setEml(v)
                    }} />
                </div>
            </div>
            <Mgin top={50}/>
            <Btn txt="CREATE MEMBER" onClick={()=>{
                if(fname.length < 3){
                    toast('Invalid First Name Input',0)
                    return;
                }
                if(lname.length < 3){
                    toast('Invalid Last Name Input',0)
                    return;
                }
                if(!isEmlValid(eml)){
                    toast('Invalid Email',0)
                    return
                }
                if(!isPhoneNigOk(phn)){
                    toast('Invalid Phone Number',0)
                    return
                }
                if(memID.length == 0){
                    toast('Enter ADSI Number',0)
                    return
                }
                setLoad(true)
                const fMemId = formatMemId(memID)
                makeRequest.post('register',{
                    memid:fMemId,
                    email:eml,
                    password:'123456' //Default pwd
                },(task)=>{
                    if(task.isSuccessful()){
                        //Set Basic Data
                        makeRequest.post('setMemberBasicInfo',{
                            memid:fMemId,
                            fname:fname,
                            lname:lname,
                            mname:mname,
                            eml:eml,
                            phn:phn,
                            verif:'0',
                            pay:'1'
                        },(task)=>{
                            setLoad(false)
                            if(task.isSuccessful()){
                                mainprop.backy(-1)
                            }else{
                                if(task.isLoggedOut()){
                                    navigate('/adminlogin')
                                    return;
                                }
                                toast(task.getErrorMsg(),0)
                            }
                        })
                    }else{
                        setLoad(false)
                        if(task.isLoggedOut()){
                            navigate('/adminlogin')
                            return;
                        }
                        toast(task.getErrorMsg(),0)
                    }
                },true)
                
            }} width={300} />
        </div>
        <PoweredBySSS floaatIt/>
    </div>

}
