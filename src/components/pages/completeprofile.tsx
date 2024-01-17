import { useEffect, useState } from "react";
import { Add, CalendarMonth, InfoOutlined } from "@mui/icons-material";
import coin from '../../assets/coin.png'
import thumb from '../../assets/thumbs.png'
import { MsgAlert } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, EditTextFilled, Btn, useQuery, ErrorCont, isEmlValid, isPhoneNigOk, LrText, DatePicky, IconBtn, LoadLay } from "../../helper/general";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../toast/toast";
import { getMemId, makeRequest } from "../../helper/requesthandler";
import { memberBasicinfo, memberFinancialinfo, memberGeneralinfo } from "../classes/models";
import { format } from "date-fns";
import { mLoc } from "monagree-locs/dist/classes";
import { mCountry, mLga, mState } from "monagree-locs";
import { mBanks } from "monagree-banks";



export function CompleteProfile(){
    const qry = useQuery();
    const myKey = Date.now()
    const rdr = qry.get('rdr') ?? ''
    const navigate = useNavigate()
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[rdy, setRdy] = useState(false)

    const[fname,setFName] = useState('')
    const[mname,setMName] = useState('')
    const[lname,setLName] = useState('')
    const[eml,setEml] = useState(qry.get('eml') ?? '')
    const[phn,setPhn] = useState('')

    const[sex,setSex] = useState('')
    const[marital,setMarital] = useState('')
    const[dob,setDob] = useState<Date>()
    const[askdob,setAskDOB] = useState(false)
    const[nationality,setNationality] = useState<mLoc>()
    const[state,setState] = useState<mLoc>()
    const[lga,setLga] = useState<mLoc>()
    const[town,setTown] = useState('')
    const[addr,setAddr] = useState('')
    const[job,setJob] = useState('')
    const[nin,setNin] = useState('')
    const[kin_fname,setkinFname] = useState('')
    const[kin_lname,setkinLname] = useState('')
    const[kin_mname,setkinMname] = useState('')
    const[kin_type,setkinType] = useState('')
    const[kin_phone,setkinPhone] = useState('')
    const[kin_addr,setkinAddr] = useState('')
    const[kin_eml,setkinEml] = useState('')

    const[bnk,setBnk] = useState('')
    const[anum,setANum] = useState('')
    const[aname,setAName] = useState('')

    const[mbi,setMbi] = useState<memberBasicinfo>()
        

    useEffect(()=>{
        setTitle(`Edit Your Profile - ${appName}`)
        getMemInfo()
    },[])

    function getMemInfo(){
        setError(false)
        setRdy(false)
        if(getMemId().length==0){
            navigate('/login')
            return;
        }
        makeRequest.get(`getMemberBasicInfo/${getMemId()}`,{},(task)=>{
            if(task.isSuccessful()){
                const mbi = new memberBasicinfo(task.getData())
                setFName(mbi.getFirstName())
                setLName(mbi.getlastName())
                setMName(mbi.getMiddleName())
                setEml(mbi.getEmail())
                setPhn(mbi.getPhone())
                setMbi(mbi)
                makeRequest.get(`getMemberGeneralInfo/${getMemId()}`,{},(task)=>{
                    if(task.isSuccessful()){
                        if(task.exists()){
                            const mgi = new memberGeneralinfo(task.getData())
                            setSex(mgi.getGender())
                            setMarital(mgi.getMarital())
                            setDob(new Date(parseFloat(mgi.getDob())))
                            setNationality(mCountry.getCountryByCode(mgi.getCountry()))
                            setState(mState.getStateByCode(mgi.getCountry(), mgi.getState()))
                            setLga(mLga.getLgaByCode(mgi.getCountry(),mgi.getState(),mgi.getLga()))
                            setTown(mgi.getTown())
                            setAddr(mgi.getAddr())
                            setJob(mgi.getJob())
                            setNin(mgi.getNin())
                            setkinFname(mgi.getkin_FirstName())
                            setkinLname(mgi.getkin_LastName())
                            setkinMname(mgi.getkin_MiddleName())
                            setkinType(mgi.getkin_Type())
                            setkinPhone(mgi.getkin_phone())
                            setkinAddr(mgi.getkin_Addr())
                            setkinEml(mgi.getkin_Email())     
                        }
                        makeRequest.get(`getMemberFinancialInfo/${getMemId()}`,{},(task)=>{
                            if(task.isSuccessful()){
                                if(task.exists()){
                                    const mfi = new memberFinancialinfo(task.getData())
                                    setBnk(mfi.getBankCode())
                                    setANum(mfi.getAccountNumber())
                                    setAName(mfi.getAccountName())
                                }
                                setRdy(true)
                            }else{
                                if(task.isLoggedOut()){
                                    navigate('/login')
                                    return
                                }
                                setError(true)
                            }
                        })
                    }else{
                        if(task.isLoggedOut()){
                            navigate('/login')
                            return
                        }
                        setError(true)
                    }
                })
            }else{
                if(task.isLoggedOut()){
                    navigate('/login')
                    return
                }
                setError(true)
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
        {rdy?<div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <Mgin top={40} />
            <mye.HTv text="Edit Your Profile" size={35} />
            <Mgin top={20} />
            <MsgAlert icon={InfoOutlined} mye={mye} msg="Fields marked * are compulsory" />
            <Mgin top={20} />
            <mye.BTv size={18} text="Section 1 - Basic Information" />
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
                    <mye.Tv text="*Middle Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Middle Name" value={mname} noSpace min={3} recv={(v)=>{
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
            <Mgin top={35} />
            <Btn txt="SAVE BASIC PROFILE" onClick={()=>{
                if(fname.length < 3 || lname.length < 3 || mname.length < 3){
                    toast('Invalid Name Input',0)
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
                setLoad(true)
                makeRequest.post('setMemberBasicInfo',{
                    memid:getMemId(),
                    fname:fname,
                    lname:lname,
                    mname:mname,
                    eml:eml,
                    phn:phn,
                    verif:'0',
                    pay: (mbi&&mbi.isPaid())?'1':'0'
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        toast('Basic Info update successful',1)
                    }else{
                        if(task.isLoggedOut()){
                            navigate('/login')
                            return
                        }
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} />
            <Mgin top={40} />
            <mye.BTv size={18} text="Section 2 - General Profile" />
            <Mgin top={20} />
            <div style={{
                width:'100%',
            }}>
                <mye.Tv text="*Gender" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={sex} onChange={(e)=>{
                    setSex(e.target.value)
                }}>
                    <option value="">Click to Choose</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%',
            }}>
                <mye.Tv text="*Marital Status" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={marital} onChange={(e)=>{
                    setMarital(e.target.value)
                }}>
                    <option value="">Click to Choose</option>
                    <option value="M">Married</option>
                    <option value="S">Single</option>
                    <option value="D">Divorced</option>
                    <option value="W">Widowed</option>
                    <option value="P">Separated</option>
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                    width:'100%'
                }}>
                    <mye.Tv text="*Date of Birth" />
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
                                setDob(d)
                            }} closy={()=>{
                                setAskDOB(false)
                            }}/>
                        </div>
                    </div>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Nationality" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={nationality?.getId() || ''} onChange={(e)=>{
                    const ele = mCountry.getCountryByCode(e.target.value)
                    setNationality(ele)
                }}>
                    <option value="">Click to Choose</option>
                    {
                        mCountry.getAllCountries().map((ele, index)=>{
                            return <option key={myKey+index+10000} value={ele.getId()}>{ele.getName()}</option>
                        })
                    }
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*State Of Origin" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={state?.getId()||''} onChange={(e)=>{
                    if(nationality){
                        const ele = mState.getStateByCode(nationality!.getId(),e.target.value)
                        setState(ele)
                    }
                    
                }}>
                    <option value="">Click to Choose</option>
                    {
                        nationality?mState.getStatesByCountry(nationality!.getId()).map((ele, index)=>{
                            return <option key={myKey+index+1000} value={ele.getId()}>{ele.getName()}</option>
                        }):<option value="option1">Choose Country First</option>
                    }
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Local Government Area" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={lga?.getId()||''} onChange={(e)=>{
                    if(nationality && state){
                        const ele = mLga.getLgaByCode(nationality!.getId(),state!.getId(),e.target.value)
                        setLga(ele)
                    }
                }}>
                    <option value="">Click to Choose</option>
                    {
                        (nationality&& state)?mLga.getLgasByState(nationality!.getId(),state!.getId()).map((ele, index)=>{
                            return <option key={myKey+index+100} value={ele.getId()}>{ele.getName()}</option>
                        }):<option value="option1">Choose Country & State First</option>
                    }
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Hometown" />
                <Mgin top={5} />
                <EditTextFilled hint="Hometown" value={town} min={3} recv={(v)=>{
                    setTown(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Residential Address" />
                <Mgin top={5} />
                <EditTextFilled hint="Residential Address" value={addr} min={3} recv={(v)=>{
                    setAddr(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Occupation" />
                <Mgin top={5} />
                <EditTextFilled hint="Occupation" value={job} min={3} recv={(v)=>{
                    setJob(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*NIN Number" />
                <Mgin top={5} />
                <EditTextFilled hint="NIN Number" value={nin} digi min={8} recv={(v)=>{
                    setNin(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <LrText wrap={!dimen.dsk}
            left={<div>
                <mye.Tv text="*VALID MEANS OF IDENTIFICATION"  />
                <Mgin top={5} />
                <mye.Tv text="Official Government Issued Certificate" size={12} />
            </div>}
            right={<IconBtn icon={Add} mye={mye} ocl={()=>{
                toast('Coming soon',2)
            }} text="ATTACH DOC" />}
            />
            <Mgin top={15} />
            <mye.Tv color={mye.mycol.primarycol} text="Info about Next of Kin" />
            <Mgin top={15} />
            <div className="hlc" style={{
                width:'100%'
            }}>
                <div style={{
                    flex:1
                }}>
                    <mye.Tv text="*First Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="First Name" value={kin_fname} noSpace min={3} recv={(v)=>{
                        setkinFname(v.trim())
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Middle Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Middle Name" value={kin_mname} noSpace min={3} recv={(v)=>{
                        setkinMname(v.trim())
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Last Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Last Name" value={kin_lname} noSpace min={3} recv={(v)=>{
                        setkinLname(v.trim())
                    }} />
                </div>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%',
            }}>
                <mye.Tv text="*Relationship with Next of kin" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={kin_type} onChange={(e)=>{
                    setkinType(e.target.value)
                }}>
                    <option value="">Click to Choose</option>
                    <option value="S">Spouse</option>
                    <option value="P">Parent</option>
                    <option value="B">Sibling</option>
                    <option value="C">Child</option>
                    <option value="R">Relative</option>
                    <option value="F">Friend</option>
                    <option value="W">Colleague</option>
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Phone Number of Next of Kin" />
                <Mgin top={5} />
                <EditTextFilled hint="08012345678" value={kin_phone} digi noSpace min={11} max={15} recv={(v)=>{
                    setkinPhone(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Residential Address of Next of Kin" />
                <Mgin top={5} />
                <EditTextFilled hint="Residential Address of Next of Kin" value={kin_addr} min={3} recv={(v)=>{
                    setkinAddr(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Email Address of Next of kin" />
                <Mgin top={5} />
                <EditTextFilled hint="Email Address of Next of kin" eml value={kin_eml} noSpace min={6} recv={(v)=>{
                    setkinEml(v.trim())
                }} />
            </div>
            <Mgin top={35} />
            <Btn txt="SAVE GENERAL PROFILE" onClick={()=>{
                if(sex.length == 0){
                    toast('Invalid gender Input',0)
                    return
                }
                if(marital.length == 0){
                    toast('Invalid Marital Input',0)
                    return
                }
                if(!dob){
                    toast('Invalid Date of Birth Input',0)
                    return
                }
                if(!nationality){
                    toast('Invalid Nationality Input',0)
                    return
                }
                if(!state){
                    toast('Invalid State Input',0)
                    return
                }
                if(!lga){
                    toast('Invalid Local Government Input',0)
                    return
                }
                if(town.length < 3){
                    toast('Invalid Town Input',0)
                    return;
                }
                if(addr.length < 3){
                    toast('Invalid Address Input',0)
                    return;
                }
                if(job.length < 3){
                    toast('Invalid Occupation Input',0)
                    return;
                }
                if(nin.length < 8){
                    toast('Invalid Nin Input',0)
                    return;
                }
                if(kin_fname.length < 3 || kin_mname.length < 3 || kin_lname.length < 3){
                    toast('Invalid Next of Kin Names Input',0)
                    return;
                }
                if(kin_type.length == 0){
                    toast('Invalid Next of Kin Relationship',0)
                    return
                }
                if(!isPhoneNigOk(kin_phone)){
                    toast('Invalid Next of Kin Phone Number',0)
                    return
                }
                if(kin_addr.length < 3){
                    toast('Invalid Next of Kin Address Input',0)
                    return;
                }
                if(!isEmlValid(kin_eml)){
                    toast('Invalid Next of Kin Email.',0)
                    return
                }
                setLoad(true)
                makeRequest.post('setMemberGeneralInfo',{
                    memid:getMemId(),
                    sex:sex,
                    marital:marital,
                    dob:dob.getTime().toString(),
                    nationality:nationality.getId(),
                    state:state.getId(),
                    lga:lga.getId(),
                    town:town,
                    addr:addr,
                    job:job,
                    nin:nin,
                    kin_fname:kin_fname,
                    kin_lname:kin_lname,
                    kin_mname:kin_mname,
                    kin_type:kin_type,
                    kin_phn:kin_phone,
                    kin_addr:kin_addr,
                    kin_eml:kin_eml
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        toast('General Info update successful',1)
                    }else{
                        if(task.isLoggedOut()){
                            navigate('/login')
                            return
                        }
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} />
            <Mgin top={40} />
            <mye.BTv size={18} text="Section 3 - Financial Information" />
            <Mgin top={20} />
            <div style={{
                width:'100%',
            }}>
                <mye.Tv text="*Bank" />
                <Mgin top={5}/>
                <select id="dropdown" name="dropdown" value={bnk} onChange={(e)=>{
                    setBnk(e.target.value)
                }}>
                    <option value="">Click to Choose</option>
                    {
                        mBanks.getAllBanks().map((ele,index)=>{
                            return <option key={myKey+0.05+index} value={ele.code}>{ele.name}</option>
                        })
                    }
                </select>
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Account Number" />
                <Mgin top={5} />
                <EditTextFilled hint="1234567890" value={anum} noSpace min={10} recv={(v)=>{
                    setANum(v.trim())
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Account Name" />
                <Mgin top={5} />
                <EditTextFilled hint="Account Name" value={aname} noSpace min={10} recv={(v)=>{
                    setAName(v.trim())
                }} />
            </div>
            <Mgin top={35} />
            <Btn txt="SAVE FINANCIAL INFO" onClick={()=>{
                if(bnk.length == 0){
                    toast('Invalid Bank Input',0)
                    return
                }
                if(anum.length < 10){
                    toast('Invalid Account Number',0)
                    return
                }
                if(aname.length < 3){
                    toast('Invalid Account Name',0)
                    return
                }
                setLoad(true)
                makeRequest.post('setMemberFinancialInfo',{
                    memid:getMemId(),
                    bnk:bnk,
                    anum:anum,
                    aname:aname,
                },(task)=>{
                    setLoad(false)
                    if(task.isSuccessful()){
                        toast('Financial Info update successful',1)
                    }else{
                        if(task.isLoggedOut()){
                            navigate('/login')
                            return
                        }
                        toast(task.getErrorMsg(),0)
                    }
                })
            }} />
        </div>:LoadLay()}
    </div>

}


