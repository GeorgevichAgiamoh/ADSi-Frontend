import { useState, useEffect, useRef } from "react"
import { mLoc } from "monagree-locs/dist/classes"
import { mCountry, mLga, mState } from "monagree-locs"
import { mBanks } from "monagree-banks"
import { defVal, memberBasicinfo, memberFinancialinfo, memberGeneralinfo } from "../../classes/models"
import { Btn, DatePicky, EditTextFilled, ErrorCont, LrText, Mgin, appName, isEmlValid, isPhoneNigOk, myEles, setTitle } from "../../../helper/general"
import { ArrowBack, PersonOutline, CalendarMonth, AccountBalance } from "@mui/icons-material"
import { CircularProgress } from "@mui/material"
import { format } from "date-fns"
import { useLocation, useNavigate } from "react-router-dom"
import useWindowDimensions from "../../../helper/dimension"
import { resHandler, makeRequest, getMemId } from "../../../helper/requesthandler"
import Toast from "../../toast/toast"



export function MyProfile(mainprop:{mbi:memberBasicinfo,mgi?:memberGeneralinfo}){
    const location = useLocation()
    const navigate = useNavigate()
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const [myKey, setMyKey] = useState(Date.now())
    const[fname, setFname] = useState('')
    const[mname, setMname] = useState('')
    const[lname, setLname] = useState('')
    const[memID, setMemID] = useState('')
    const[phn, setPhn] = useState('')
    const[eml, setEml] = useState('')
    const[addr, setAddr] = useState('')
    const[acctName, setAcctname] = useState('')
    const[acctNum, setAcctNum] = useState('')
    const[bank, setBank] = useState('')

    const[gender, setGender] = useState('')
    const[country, setCountry] = useState<mLoc>()
    const[state, setState] = useState<mLoc>()
    const[city, setCity] = useState<mLoc>()

    const[dob, setDOB] = useState<Date>()
    const[askdob, setAskDOB] = useState(false)

    const[showPP,setShowPP] = useState(false)


    useEffect(()=>{
        setTitle(`My Profile - ${appName}`)
        setFname(mainprop.mbi.getFirstName())
        setMname(mainprop.mbi.getMiddleName())
        setLname(mainprop.mbi.getlastName())
        setMemID(mainprop.mbi.getMemberID())
        setPhn(mainprop.mbi.getPhone())
        setEml(mainprop.mbi.getEmail())

        if(mainprop.mgi){
            setAddr(mainprop.mgi.getAddr())
            setGender(mainprop.mgi.getGender())
            setCountry(mCountry.getCountryByCode(mainprop.mgi.getCountry()))
            setState(mCountry.getCountryByCode(mainprop.mgi.getState()))
            setCity(mCountry.getCountryByCode(mainprop.mgi.getLga()))
            if(mainprop.mgi.getDob()!=defVal){
                setDOB(new Date(parseFloat(mainprop.mgi.getDob())))
            }
        }
        setMyKey(Date.now())
        begin()
    },[])

    function handleError(task:resHandler){
        setLoad(false)
        setError(true)
        if(task.isLoggedOut()){
            navigate(`/login?rdr=${location.pathname.substring(1)}`)
        }else{
            toast(task.getErrorMsg(),0)
        }
    }

    function begin(){
        setLoad(true)
        setError(false)
        makeRequest.get(`getMemberFinancialInfo/${getMemId()}`,{},(task)=>{
            if(task.isSuccessful()){
                if(task.exists()){
                    const mfi = new memberFinancialinfo(task.getData())
                    setAcctname(mfi.getAccountName())
                    setAcctNum(mfi.getAccountNumber())
                    setBank(mfi.getBankCode())
                }
                setLoad(false)
            }else{
                handleError(task)
            }
        })
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

    return <div key={myKey} className="vlc" style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            begin()
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
        <Mgin top={40} />
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
                <mye.HTv size={14} text="Personal Information" color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="First Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Grey" min={6} value={fname} recv={(v)=>{
                        setFname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Middle Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Amarchi" min={6} value={mname} recv={(v)=>{
                        setMname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Last Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Adamma" min={6} value={lname} recv={(v)=>{
                        setLname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="ADSI Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00000000" min={6} value={memID} recv={(v)=>{
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
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Gender" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={gender} onChange={(e)=>{
                        setGender(e.target.value)
                    }}>
                        <option value="">Choose One</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Date of Birth" />
                    <Mgin top={5}/>
                    <div style={{
                        width:'100%',
                        height:45,
                        borderRadius:8,
                        backgroundColor:mye.mycol.btnstrip,
                        padding:10,
                        boxSizing:'border-box',
                        position:'relative'
                    }} >
                        <LrText 
                        left={<div id="clk" onClick={()=>{
                            setAskDOB(true)
                        }}><mye.Tv text={dob?format(dob,'dd-MM-yy'):'DD/MM/YY'} /></div>}
                        right={<CalendarMonth id="clk" style={{
                            fontSize:20,
                            color:mye.mycol.secondarycol
                        }} onClick={()=>{
                            setAskDOB(true)
                        }}/>}
                        />
                        <div style={{
                            display:askdob?undefined:'none',
                            position:'absolute',
                            top:0,
                            right:0,
                            zIndex:2,
                            pointerEvents:'auto'
                        }}>
                            <DatePicky rdy={(d)=>{
                                setAskDOB(false)
                                setDOB(d)
                            }} closy={()=>{
                                setAskDOB(false)
                            }}/>
                        </div>
                    </div>
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
                <div style={{
                    width:'100%',
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Residential Address" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="A place on earth" min={6} value={addr} recv={(v)=>{
                        setAddr(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Country" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={country?.getId() || ''} onChange={(e)=>{
                        const ele = mCountry.getCountryByCode(e.target.value)
                        setCountry(ele)
                    }}>
                        <option value="">Choose One</option>
                        {
                            mCountry.getAllCountries().map((ele, index)=>{
                                return <option key={myKey+index+10000} value={ele.getId()}>{ele.getName()}</option>
                            })
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="State" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={state?.getId()||''} onChange={(e)=>{
                        if(country){
                            const ele = mState.getStateByCode(country!.getId(),e.target.value)
                            setState(ele)
                        }
                        
                    }}>
                        <option value="">Choose One</option>
                        {
                            country?mState.getStatesByCountry(country!.getId(),true).map((ele, index)=>{
                                return <option key={myKey+index+1000} value={ele.getId()}>{ele.getName()}</option>
                            }):<option value="option1">Choose Country First</option>
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="City" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={city?.getId()||''} onChange={(e)=>{
                        if(country && state){
                            const ele = mLga.getLgaByCode(country!.getId(),state!.getId(),e.target.value)
                            setCity(ele)
                        }
                    }}>
                        <option value="">Choose One</option>
                        {
                            (country&& state)?mLga.getLgasByState(country!.getId(),state!.getId(),true).map((ele, index)=>{
                                return <option key={myKey+index+100} value={ele.getId()}>{ele.getName()}</option>
                            }):<option value="option1">Choose Country & State First</option>
                        }
                    </select>
                </div>
            </div>
            <Mgin top={60} />
            <div className="hlc">
                <AccountBalance style={{
                    fontSize:20,
                    color:mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.HTv size={14} text="Account Details" color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:'100%',
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Account Name" min={6} value={acctName} recv={(v)=>{
                        setAcctname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00000000000" digi min={7} max={12} value={acctNum} recv={(v)=>{
                        setAcctNum(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Bank" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={bank} onChange={(e)=>{
                        setBank(e.target.value)
                    }}>
                        <option value="">Click to Choose</option>
                        {
                            mBanks.getAllBanks(true).map((ele,index)=>{
                                return <option key={myKey+0.015+index} value={ele.code}>{ele.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <Mgin top={50}/>
            <Btn txt="SAVE" onClick={()=>{
                if(bank.length == 0){
                    toast('Invalid Bank Input',0)
                    return
                }
                if(acctNum.length < 10){
                    toast('Invalid Account Number',0)
                    return
                }
                if(acctName.length < 3){
                    toast('Invalid Account Name',0)
                    return
                }

                if(gender.length == 0){
                    toast('Invalid gender Input',0)
                    return
                }
                if(!dob){
                    toast('Invalid Date of Birth Input',0)
                    return
                }
                if(!country){
                    toast('Invalid Nationality Input',0)
                    return
                }
                if(!state){
                    toast('Invalid State Input',0)
                    return
                }
                if(!city){
                    toast('Invalid Local Government Input',0)
                    return
                }
                if(addr.length < 3){
                    toast('Invalid Address Input',0)
                    return;
                }
                if(fname.length < 3 || lname.length < 3 || mname.length < 3){
                    toast('Invalid Name Input',0)
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

                setLoad(true)
                toast('Updating financial info',2)
                makeRequest.post('setMemberFinancialInfo',{
                    memid:mainprop.mbi.getMemberID(),
                    bnk:bank,
                    anum:acctNum,
                    aname:acctName,
                },(task)=>{
                    if(task.isSuccessful()){
                        toast('Updating basic info',2)
                        makeRequest.post('setMemberBasicInfo',{
                            memid:mainprop.mbi.getMemberID(),
                            fname:fname,
                            lname:lname,
                            mname:mname,
                            eml:eml,
                            phn:phn,
                            verif:'0',
                            pay: (mainprop.mbi.isPaid())?'1':'0'
                        },(task)=>{
                            if(task.isSuccessful()){
                                if(mainprop.mgi){
                                    toast('Updating General Info',2)
                                    makeRequest.post('setMemberGeneralInfo',{
                                        memid:mainprop.mgi.getMemberID(),
                                        sex:gender,
                                        marital:mainprop.mgi.getMarital(),
                                        dob:dob.getTime().toString(),
                                        nationality:country.getId(),
                                        state:state.getId(),
                                        lga:city.getId(),
                                        town:mainprop.mgi.getTown(),
                                        addr:addr,
                                        job:mainprop.mgi.getJob(),
                                        kin_fname:mainprop.mgi.getkin_FirstName(),
                                        kin_lname:mainprop.mgi.getkin_LastName(),
                                        kin_mname:mainprop.mgi.getkin_MiddleName(),
                                        kin_type:mainprop.mgi.getkin_Type(),
                                        kin_phn:mainprop.mgi.getkin_phone(),
                                        kin_addr:mainprop.mgi.getkin_Addr(),
                                        kin_eml:mainprop.mgi.getkin_Email()
                                    },(task)=>{
                                        setLoad(false)
                                        if(task.isSuccessful()){
                                            toast('All Info update successful',1)
                                        }else{
                                            if(task.isLoggedOut()){
                                                navigate('/login')
                                                return
                                            }
                                            toast(task.getErrorMsg(),0)
                                        }
                                    })
                                }else{
                                    setLoad(false)
                                    setShowPP(true)
                                }
                            }else{
                                setLoad(false)
                                if(task.isLoggedOut()){
                                    navigate('/login')
                                    return
                                }
                                toast(task.getErrorMsg(),0)
                            }
                        })
                    }else{
                        setLoad(false)
                        if(task.isLoggedOut()){
                            navigate('/login')
                            return
                        }
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} width={200} />
        </div>
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:showPP?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(0,0,0,0.1)'
        }}>
            <ShowPP closy={()=>{
                setShowPP(false)
            }} />
        </div>
    </div>
    
    function ShowPP(prop:{closy:()=>void}) {

        return <div className="ctr" style={{
            backgroundColor:mye.mycol.bkg,
            borderRadius:10,
            padding:dimen.dsk?40:20,
            boxSizing:'border-box',
            overflow:'scroll',
            width:dimen.dsk2?'40%':dimen.dsk?'50%':'80%',
            height:'50%'
        }}>
            <div className="vlc" style={{
                width:'100%',
            }} >
                <mye.HTv text="Complete Profile" />
                <Mgin top={20} />
                <mye.Tv text="We could not update some information as your profile is not yet complete" />
                <Mgin top={20} />
                <Btn txt="COMPLETE PROFILE" width={140} onClick={()=>{
                    navigate('/completeprofile')
                }} />
            </div>
        </div>
    }

    function gimmeWidth(long?:boolean){
        return dimen.dsk?long?'450px':'300px':'100%'
    }

}

