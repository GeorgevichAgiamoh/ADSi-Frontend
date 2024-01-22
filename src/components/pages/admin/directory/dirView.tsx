import { useEffect, useState } from "react"
import { Btn, ErrorCont, Line, Mgin, appName, myEles, setTitle } from "../../../../helper/general"
import useWindowDimensions from "../../../../helper/dimension"
import { ArrowBack, FileOpenOutlined, PersonOutline } from "@mui/icons-material"
import { getCreatedTime, memberGeneralinfo } from "../../../classes/models"
import { CircularProgress } from "@mui/material"
import Toast from "../../../toast/toast"
import { makeRequest, resHandler } from "../../../../helper/requesthandler"
import { useLocation, useNavigate } from "react-router-dom"
import { PoweredBySSS } from "../../../../helper/adsi"


export function AdminDirView(mainprop:{user:memberGeneralinfo,backy:(action:number)=>void}){
    const location = useLocation()
    const navigate = useNavigate()
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const [mykey,setMyKey] = useState(Date.now())

    useEffect(()=>{
        setTitle(`Member Details - ${appName}`)
    },[])

    function handleError(task:resHandler){
        setLoad(false)
        setError(true)
        if(task.isLoggedOut()){
            navigate(`/adminlogin?rdr=${location.pathname.substring(1)}`)
        }else{
            toast(task.getErrorMsg(),0)
        }
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

    function updateData(key:string, value:string){
        setLoad(true)
        const ndata = {...mainprop.user.basicData!.data}
        ndata[key] = value
        makeRequest.post('setMemberBasicInfo',ndata,(task)=>{
            setLoad(false)
            if(task.isSuccessful()){
                mainprop.user.basicData!.data[key] = value
                toast('Update successful',1)
                setMyKey(Date.now()) // Rebuild entire page
            }else{
                handleError(task)
            }
        })
    }

    return <div key={mykey} style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            //getVS()
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
        <div className="hlc">
            <PersonOutline style={{
                fontSize:20,
                color:mye.mycol.secondarycol
            }} />
            <Mgin right={10} />
            <mye.HTv size={14} text="Personal Information" color={mye.mycol.secondarycol} />
        </div>
        <Mgin top={20} />
        <div id="lshdw" className="vlc" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            boxSizing:'border-box',
            padding:dimen.dsk?20:10
        }}>
            {!mainprop.user.basicData!.isVerified()?<div className="hlc" style={{
                alignSelf:'flex-end'
            }}>
                <Btn txt="APPROVE" onClick={()=>{
                    updateData('verif','1')
                }} width={120} />
                <Mgin right={20}/>
                <Btn txt="EDIT" onClick={()=>{
                    mainprop.backy(1)
                }} width={120} outlined/>
            </div>:<div className="hlc" style={{
                alignSelf:'flex-end'
            }}>
                <Btn txt="EDIT" onClick={()=>{
                    mainprop.backy(1)
                }} width={120} outlined/>
                <Mgin right={20}/>
                 <Btn txt="DEACTIVATE" onClick={()=>{
                    updateData('verif','0')
                }} width={120} bkg={mye.mycol.red} />
            </div>}
            <Mgin top={20} />
            <div style={{
                width:'100%',
                display:dimen.dsk?'flex':undefined,
                alignItems:'center'
            }}>
                <div className="flexi" style={{
                    flex:dimen.dsk?1:undefined,
                }}>
                    <InfoLay sub="First Name" main={mainprop.user.basicData!.getFirstName()} />
                    <InfoLay sub="Middle Name" main={mainprop.user.basicData!.getMiddleName()} />
                    <InfoLay sub="Last Name" main={mainprop.user.basicData!.getlastName()} />
                    <InfoLay sub="ADSI Number" main={mainprop.user.getMemberID()} />
                    <InfoLay sub="Phone Number" main={mainprop.user.basicData!.getPhone()} />
                    <InfoLay sub="Gender" main={mainprop.user.getGender()} />
                    <InfoLay sub="DOB" main={mainprop.user.getFormattedDOB()} />
                    <InfoLay sub="Email" main={mainprop.user.basicData!.getEmail()} />
                    <InfoLay sub="Residential Address" main={mainprop.user.getAddr()} />
                    <InfoLay sub="Country" main={mainprop.user.getFormattedCountry()} />
                    <InfoLay sub="State" main={mainprop.user.getFormattedState()} />
                    <InfoLay sub="City" main={mainprop.user.getFormattedLGA()} />
                </div>
                <Mgin right={dimen.dsk?20:0} top={dimen.dsk?0:20} />
                <Line vertical={dimen.dsk} col={mye.mycol.btnstrip} height={200}/>
                <Mgin right={dimen.dsk?20:0} top={dimen.dsk?0:20} />
                <div className="flexi" style={{
                    flex:dimen.dsk?1:undefined,
                }}>
                    <InfoLay sub="Account Name" main={mainprop.user.finData!.getAccountName()} />
                    <InfoLay sub="Account Number" main={mainprop.user.finData!.getAccountNumber()} />
                    <InfoLay sub="Bank" main={mainprop.user.finData!.getFormattedbank()} />
                    <InfoLay sub="Date of Initial Registration" main={getCreatedTime(mainprop.user.basicData!.data)} />
                    <div style={{
                        width:'100%',
                        marginTop:dimen.dsk?20:20,
                        marginRight:10
                    }}>
                        <mye.Tv text={'Upload Document'} color={mye.mycol.imghint} size={12} />
                        <Mgin top={5} />
                        <div className="hlc">
                            <FileOpenOutlined style={{
                                fontSize:20,
                                color:mye.mycol.secondarycol
                            }} />
                            <Mgin right={5} />
                            <mye.Tv text={"Driver's License.jpeg"} size={14} />
                        </div>
                        <Mgin top={5} />
                        <div className="hlc">
                            <FileOpenOutlined style={{
                                fontSize:20,
                                color:mye.mycol.secondarycol
                            }} />
                            <Mgin right={5} />
                            <mye.Tv text={"CooperativeID.jpeg"} size={14} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <PoweredBySSS floaatIt />
    </div>

    function InfoLay(prop:{sub:string, main:string}) {
        return <div style={{
            minWidth:dimen.dsk?120:100,
            marginTop:dimen.dsk?20:20,
            marginRight:10
        }}>
            <mye.Tv text={prop.sub} color={mye.mycol.imghint} size={12} />
            <Mgin top={5} />
            <mye.Tv text={prop.main} size={16} />
        </div>
    }

}