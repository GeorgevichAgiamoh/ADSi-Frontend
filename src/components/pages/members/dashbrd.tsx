import { PersonOutline, SavingsOutlined, VolumeUpOutlined, ArrowRightOutlined, Close, AttachFile, Mail, PieChart } from "@mui/icons-material";
import { useState, useEffect } from "react";
import useWindowDimensions from "../../../helper/dimension";
import { myEles, setTitle, appName, Mgin, LrText, BtnIcn, icony, IconBtn, Btn, ErrorCont } from "../../../helper/general";
import { annEle, memberBasicinfo, memberGeneralinfo } from "../../classes/models";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../../toast/toast";
import { makeRequest, resHandler } from "../../../helper/requesthandler";





export function MemberDashboard(mainprop:{mbi:memberBasicinfo,mgi?:memberGeneralinfo,yearsOwed:string[],goto:(action:number)=>void}){
    const location = useLocation()
    const navigate = useNavigate()
    const mye = new myEles(false);
    const myKey = Date.now()
    const dimen = useWindowDimensions();
    const[anns,setAnns] = useState<annEle[]>([])


    useEffect(()=>{
        setTitle(`Member Dashboard - ${appName}`)
        getAnns()
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

    function getAnns(){
        setError(false)
        setLoad(true)
        makeRequest.get('getAnnouncements',{},(task)=>{
            setLoad(false)
            if(task.isSuccessful()){
                const tem:annEle[] = []
                for(const key in task.getData()){
                    tem.push(new annEle(task.getData()[key]))
                }
                setAnns(tem)
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


    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            getAnns()
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
        <Mgin top={20} />
        <LrText 
        left={<div>
            <mye.HTv text={`Hello, ${mainprop.mbi.getFirstName()}`} size={26} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            <mye.Tv text="Welcome to your dashboard" />
        </div>}
        right={<Btn txt={`${mainprop.mgi?'EDIT':'VERIFY'} PROFILE`} width={150}  onClick={()=>{
            mainprop.goto(3)
        }} bkg={mainprop.mgi?mye.mycol.btnstrip:mye.mycol.primarycol} tcol={mainprop.mgi?mye.mycol.primarycol:mye.mycol.white} /> }
        />
        <Mgin top={30} />
        <div id="lshdw" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?40:20,
            boxSizing:'border-box',
            width:'100%'
        }}>
            <div className="hlc">
                <SavingsOutlined style={{
                    fontSize:25,
                    color: mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.BTv text="Share Capital" size={20} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={30} />
            <LrText 
            left={<mye.Tv text="Invest with a minimum of N10,000 and start reaping the benefits" />}
            right={<div className="hlc">
                <mye.Tv text="Pay" color={mye.mycol.primarycol} onClick={()=>{
                    mainprop.goto(1)
                }} />
                <Mgin right={20} />
                <mye.Tv text="View" onClick={()=>{
                    mainprop.goto(1)
                }} />
            </div>}
            />
        </div>
        {mainprop.yearsOwed.length==0?<div></div>:<div style={{
            width:'100%',
        }}>
            <Mgin top={20} />
            <div id="lshdw" style={{
                backgroundColor:mye.mycol.white,
                borderRadius:10,
                padding:dimen.dsk?40:20,
                boxSizing:'border-box',
                width:'100%'
            }}>
                <div className="hlc">
                    <SavingsOutlined style={{
                        fontSize:25,
                        color: mye.mycol.secondarycol
                    }} />
                    <Mgin right={10} />
                    <mye.BTv text="Annual Dues Payment" size={20} color={mye.mycol.secondarycol} />
                </div>
                <Mgin top={30} />
                <LrText 
                left={<mye.Tv text={`Next Dues payment of N12,000 is due for 1st Jan ${mainprop.yearsOwed[0]}`} />}
                right={<div className="hlc">
                    <mye.Tv text="Pay" color={mye.mycol.primarycol} onClick={()=>{
                        mainprop.goto(1)
                    }} />
                </div>}
                />
            </div>
        </div>}
        <Mgin top={20} />
        <div id="lshdw" style={{
            width:'100%',
            padding:20,
            boxSizing:'border-box',
            backgroundColor:mye.mycol.bkg,
            borderRadius:10,
        }}>
            <div className="hlc">
                <VolumeUpOutlined style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Announcement" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            {
                anns.map((ann,index)=>{
                    return <AnnLay ele={ann} key={index+myKey+1} />
                })
            }
             <Mgin top={20} />
             <div id="clk" className="hlc" onClick={()=>{

             }}>
                <mye.HTv text="View Announcements" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>
        </div>
    </div>

function AnnLay(prop:{ele:annEle}) {
    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:10
    }}>
        <div style={{
            width:'100%',
            display:'flex',
            alignItems:'center'
        }}>
            <div style={{
                flex:2,
                boxSizing:'border-box',
                paddingRight:dimen.dsk2?100:dimen.dsk?50:20
            }}>
                <mye.Tv text={prop.ele.getMsg()} color={mye.mycol.imghint} maxLines={2} size={12} />
            </div>
            <div style={{
                flex:1,
            }}>
                <LrText 
                left={<mye.Tv text={prop.ele.getTime()} size={12} color={mye.mycol.primarycol} />}
                right={<mye.Tv text={'View'} size={12} color={mye.mycol.primarycol} onClick={()=>{

                }} />}
                />
            </div>
        </div>
        <Mgin top={10} />
        <div style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.1)'}}></div>
    </div>
}

}