import { useEffect, useState } from "react";
import useWindowDimensions from "../../../helper/dimension";
import { Btn, BtnIcn, ErrorCont, LoadLay, LrText, Mgin, appName, icony, myEles, setTitle } from "../../../helper/general";
import { AdminNav } from "../nav";
import { Announcement, ArrowDropDown, ArrowRightAltRounded, ArrowRightOutlined, ArrowRightRounded, AttachFile, Close, LockOutlined, Mail, Menu, NotificationImportant, NotificationsActive, NotificationsActiveOutlined, PersonOutline, PieChart, SavingsOutlined, VolumeUpOutlined } from "@mui/icons-material";
import dp from "../../../assets/dp.png"
import { annEle } from "../../classes/classes";
import { AdminDashboard } from "./dashbrd";
import { AdminDirectory } from "./directory/directory";
import { AdminMessaging } from "./messages/messages";
import { AdminPayments } from "./payments/payments";
import { AdminSettings } from "./settings/settings";
import { getMemId, makeRequest, resHandler } from "../../../helper/requesthandler";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Toast from "../../toast/toast";
import { adminUserEle, highlightEle } from "../../classes/models";


export function Admin(){
    const navigate = useNavigate()
    const location = useLocation()
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[showNav, setShowNav] = useState(false)
    const[tabPos, setTabPos] = useState(0)
    const[me, setMe] = useState<adminUserEle>()
    const tabs = [
        'Overview',
        'Directory',
        'Payments',
        'Messages',
        'Settings',
        'Logout'
    ]

    useEffect(()=>{
        makeRequest.get('checkTokenValidity',{},(task)=>{
          if(task.isSuccessful()){
            //OK
            getStuffs()
          }else{
            navigate('/adminlogin?rdr=')
          }
        })
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

    
    function getStuffs(){
        setLoad(true)
        setError(false)
        makeRequest.get(`getAdmin/${getMemId()}`,{},(task)=>{
            if(task.isSuccessful()){
                setLoad(false)
                if(task.exists()){
                    setMe(new adminUserEle(task.getData()))
                }else{
                    setError(true)
                    toast('Acct not found',0)
                }
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

    function isPermGranted(index:number){
        if(me){
            const prefix = index==1?'pd':index==2?'pp':'pm'
            return me.getPerm(prefix+'1')=='1' || me.getPerm(prefix+'2')=='1'
        }
        return true
    }

    return <div style={{
        width: dimen.width,
        height: dimen.height
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            getStuffs()
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
        <div style={{
            width:'100%',
            height:'100%',
            display:'flex'
        }}>
            <div style={{
                width:250,
                height:'100%',
                display: dimen.dsk?undefined:'none'
            }}>
                <AdminNav currentTab={tabPos} mye={mye} isMobile={!dimen.dsk} ocl={(pos)=>{
                    if(pos==(tabs.length-1)){
                        makeRequest.get('logout',{},(task)=>{
                            navigate('/adminlogin')
                        })
                    }
                    setTabPos(pos)
                }} showy={()=>{

                }}  />
            </div>
            <div style={{
                flex:1,
                display:'flex',
                flexDirection:'column',
                height:'100%',
            }}>
                <div style={{
                    width:'100%',
                    padding:'10px 20px',
                    boxSizing:'border-box',
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.06), 0 2px 5px rgba(0, 0,0,0.1)'
                }}>
                    <LrText
                        left={<div className="hlc">
                            <div style={{
                                display: dimen.dsk?'none':undefined,
                                padding:5,
                                marginRight:10
                            }} onClick={()=>{
                                setShowNav(true)
                            }}>
                                <Menu />
                            </div>
                            <mye.HTv text={tabs[tabPos]} size={16} color={mye.mycol.primarycol} />
                        </div>}
                        right={<div className="hlc">
                            <NotificationsActiveOutlined className="icon" />
                            <Mgin right={15}/>
                            <div style={{
                                width:1,
                                height:20,
                                backgroundColor:mye.mycol.primarycol
                            }}></div>
                            <Mgin right={15}/>
                            <img src={dp} alt="Admin Name" height={42}  />
                            <Mgin right={5}/>
                            <ArrowDropDown className="icon" />
                        </div>}
                        />
                </div>
                <div style={{
                    flex:1,
                    width:'100%',
                    overflowY:'scroll',
                    backgroundColor:'rgba(0,0,0,0.02)'
                }}>
                    {tabPos===0?((me && me.getRole()=='0')?<AdminDashboard />:<NotAllowed />):tabPos===1?(isPermGranted(1)?<AdminDirectory />:<NotAllowed/>)
                    :tabPos===2?(isPermGranted(2)?<AdminPayments />:<NotAllowed />)
                    :tabPos===3?(isPermGranted(3)?<AdminMessaging />:<NotAllowed />)
                    :tabPos===4?((me && me.getRole()=='0')?<AdminSettings />:<NotAllowed />):<LoadLay />}
                </div>
            </div>
        </div>
        <div style={{
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            display: (!dimen.dsk && showNav) ? undefined:'none'
        }}>
            <AdminNav currentTab={tabPos} mye={mye} isMobile={!dimen.dsk} ocl={(pos)=>{
                if(pos==(tabs.length-1)){
                    makeRequest.get('logout',{},(task)=>{
                        navigate('/adminlogin')
                    })
                }
                setShowNav(false)
                setTabPos(pos)
            }} showy={()=>{
                setShowNav(false)
            }}  />
        </div>
    </div>

    function NotAllowed() {
        return <div className="ctr" style={{
            width:'100%',
            height:'100%'
        }}>
            <div className="vlc">
                <LockOutlined style={{
                    fontSize:30,
                    color:mye.mycol.primarycol
                }} />
                <Mgin top={20} />
                <mye.HTv text="Access Denied" />
                <Mgin top={10} />
                <mye.Tv text="The admin did not grant you access to this page" />
            </div>
        </div>
    }

}
