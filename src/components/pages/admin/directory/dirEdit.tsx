import { ArrowBack, PersonOutline, CalendarMonth, AccountBalance } from "@mui/icons-material"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, EditTextFilled, LrText, DatePicky, Btn, ErrorCont, isPhoneNigOk, isEmlValid } from "../../../../helper/general"
import { mLoc } from "monagree-locs/dist/classes"
import { mLga, mState } from "monagree-locs"
import { defVal, memberBasicinfo, memberGeneralinfo } from "../../../classes/models"
import { mBanks } from "monagree-banks"
import { CircularProgress } from "@mui/material"
import Toast from "../../../toast/toast"
import { makeRequest } from "../../../../helper/requesthandler"
import { useLocation, useNavigate } from "react-router-dom"
import { PoweredBySSS } from "../../../../helper/adsi"
import { listCountries, Country, getByCode } from "countries-ts"


export function AdminDirEdit(mainprop:{backy:(action:number)=>void,user:memberBasicinfo}){
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
    const[addr, setAddr] = useState('')
    const[acctName, setAcctname] = useState('')
    const[acctNum, setAcctNum] = useState('')
    const[bank, setBank] = useState('')

    const[gender, setGender] = useState('')
    const[country, setCountry] = useState<Country>()
    const[state, setState] = useState<mLoc>()
    const[city, setCity] = useState<mLoc>()
    const[state_custom, setState_custom] = useState('')
    const[city_custom, setCity_custom] = useState('')

    const[dob, setDOB] = useState<Date>()
    const[askdob, setAskDOB] = useState(false)


    useEffect(()=>{
        setTitle(`Edit Member - ${appName}`)
        setFname(mainprop.user.getFirstName())
        setMname(mainprop.user.getMiddleName())
        setLname(mainprop.user.getlastName())
        setMemID(mainprop.user.getMemberID())
        setPhn(mainprop.user.getPhone())
        setEml(mainprop.user.getEmail())
        setAddr(mainprop.user.generalData.getAddr())
        setAcctname(mainprop.user.finData!.getAccountName())
        setAcctNum(mainprop.user.finData!.getAccountNumber())
        setBank(mainprop.user.finData!.getBankCode())

        setGender(mainprop.user.generalData.getGender())
        setCountry(getByCode(mainprop.user.generalData.getCountry()))
        if(mainprop.user.generalData.isLocsCustom()){
            setState_custom(mainprop.user.generalData.getState())
            setCity_custom(mainprop.user.generalData.getLga())
        }else{
            setState(mState.getStateByCode('00',mainprop.user.generalData.getState()))
            setCity(mLga.getLgaByCode('00',mainprop.user.generalData.getState(),mainprop.user.generalData.getLga()))
        }
        
        
        if(mainprop.user.generalData.getDob()!=defVal){
            setDOB(new Date(parseFloat(mainprop.user.generalData.getDob())))
        }
        setMyKey(Date.now())
        
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
                    <EditTextFilled disabled hint="00000000" min={1} value={memID} recv={(v)=>{
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
                    <select id="dropdown" name="dropdown" value={country?.code || ''} onChange={(e)=>{
                        const ele = getByCode(e.target.value)
                        setCountry(ele)
                        setState(undefined)
                        setCity(undefined)
                    }}>
                        <option value="">Choose Country</option>
                        {
                            listCountries().map((ele, index)=>{
                                return <option key={myKey+index+10000} value={ele.code}>{ele.label}</option>
                            })
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5,
                    display:country?.code!='NG'?'none':undefined
                }}>
                    <mye.Tv text="State" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={state?.getId()||''} onChange={(e)=>{
                        if(country?.code == 'NG'){
                            const ele = mState.getStateByCode('00',e.target.value)
                            setState(ele)
                            setCity(undefined)
                        }
                        
                    }}>
                        <option value="">Let me input manually</option>
                        {
                            country?country?.code == 'NG'?mState.getStatesByCountry('00',true).map((ele, index)=>{
                                return <option key={myKey+index+1000} value={ele.getId()}>{ele.getName()}</option>
                            }):undefined:<option value="option1">Choose Country First</option>
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5,
                    display:country?.code!='NG'?'none':undefined
                }}>
                    <mye.Tv text="City" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={city?.getId()||''} onChange={(e)=>{
                        if(country?.code == 'NG' && state){
                            const ele = mLga.getLgaByCode('00',state!.getId(),e.target.value)
                            setCity(ele)
                        }
                    }}>
                        <option value="">Choose One</option>
                        {
                            (country&& state)?mLga.getLgasByState('00',state!.getId(),true).map((ele, index)=>{
                                return <option key={myKey+index+100} value={ele.getId()}>{ele.getName()}</option>
                            }):<option value="option1">Choose Country & State First</option>
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5,
                    display:country?.code!='NG'?undefined:'none'
                }}>
                    <mye.Tv text="Type State" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Your State" min={3} value={state_custom} recv={(v)=>{
                        setState_custom(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5,
                    display:country?.code!='NG'?undefined:'none'
                }}>
                    <mye.Tv text="Type City" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Your City" min={3} value={city_custom} recv={(v)=>{
                        setCity_custom(v)
                    }} />
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
                    toast('Invalid Country Input',0)
                    return
                }
                if(!state &&  state_custom.length < 3){
                    toast('Invalid State location Input',0)
                    return
                }
                if(!city && city_custom.length < 3){
                    toast('Invalid City Input',0)
                    return
                }
                if(addr.length < 3){
                    toast('Invalid Address Input',0)
                    return;
                }
                if(fname.length < 3 || lname.length < 3){
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
                    memid:mainprop.user.getMemberID(),
                    bnk:bank,
                    anum:acctNum,
                    aname:acctName,
                },(task)=>{
                    if(task.isSuccessful()){
                        toast('Updating basic info',2)
                        makeRequest.post('setMemberBasicInfo',{
                            memid:mainprop.user.getMemberID(),
                            fname:fname,
                            lname:lname,
                            mname:mname,
                            eml:eml,
                            phn:phn,
                            verif:'0',
                            pay: (mainprop.user.isPaid())?'1':'0'
                        },(task)=>{
                            if(task.isSuccessful()){
                                toast('Updating General Info',2)
                                makeRequest.post('setMemberGeneralInfo',{
                                    memid:mainprop.user.getMemberID(),
                                    sex:gender,
                                    marital:mainprop.user.generalData.getMarital(),
                                    dob:dob.getTime().toString(),
                                    nationality:country!.code,
                                    state:state?state.getId():state_custom,
                                    lga:city?city.getId():city_custom,
                                    town:mainprop.user.generalData.getTown(),
                                    addr:addr,
                                    job:mainprop.user.generalData.getJob(),
                                    kin_fname:mainprop.user.generalData.getkin_FirstName(),
                                    kin_lname:mainprop.user.generalData.getkin_LastName(),
                                    kin_mname:mainprop.user.generalData.getkin_MiddleName(),
                                    kin_type:mainprop.user.generalData.getkin_Type(),
                                    kin_phn:mainprop.user.generalData.getkin_phone(),
                                    kin_addr:mainprop.user.generalData.getkin_Addr(),
                                    kin_eml:mainprop.user.generalData.getkin_Email()
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
        <PoweredBySSS floaatIt/>
    </div>

}
