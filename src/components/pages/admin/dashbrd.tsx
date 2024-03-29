import { PersonOutline, SavingsOutlined, VolumeUpOutlined, ArrowRightOutlined, Close, AttachFile, Mail } from "@mui/icons-material";
import { useState, useEffect } from "react";
import useWindowDimensions from "../../../helper/dimension";
import { myEles, setTitle, appName, Mgin, LrText, BtnIcn, icony, IconBtn, ErrorCont, MyPieChart, hexToRgba, masterID } from "../../../helper/general";
import { adminUserEle, annEle, highlightEle, payStat } from "../../classes/models";
import { CircularProgress } from "@mui/material";
import Toast from "../../toast/toast";
import { makeRequest, resHandler } from "../../../helper/requesthandler";
import { useLocation, useNavigate } from "react-router-dom";
import tabcard from "../../../assets/tabcard.png"
import { PoweredBySSS, getGreeting } from "../../../helper/adsi";
import naira from "../../../assets/naira.png"





export function AdminDashboard(mainprop:{me:adminUserEle}){
    const location = useLocation()
    const navigate = useNavigate()
    const mye = new myEles(false);
    const myKey = Date.now()
    const dimen = useWindowDimensions();
    const[showNewAnn, setShowNewAnn] = useState(false)
    const[hele,setHele] = useState<highlightEle>()
    const[anns,setAnns] = useState<annEle[]>([])
    const[atitle, setATitle] = useState('')
    const[amsg, setAMsg] = useState('')
    const[totRev, setTotRev] = useState('...')

    useEffect(()=>{
        setTitle(`Admin Dashboard - ${appName}`)
        getHgl()
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

    function getHgl(){
        setError(false)
        getAnns()
        makeRequest.get('getHighlights',{},(task)=>{
            if(task.isSuccessful()){
                setHele(new highlightEle(task.getData()))
            }else{
                handleError(task)
            }
        })
        makeRequest.get(`getRevenue/0`,{},(task)=>{
            if(task.isSuccessful()){
                const st0 = new payStat(task.getData())
                makeRequest.get(`getRevenue/1`,{},(task)=>{
                    if(task.isSuccessful()){
                        const st1 = new payStat(task.getData())
                        makeRequest.get(`getRevenue/2`,{},(task)=>{
                            if(task.isSuccessful()){
                                const st2 = new payStat(task.getData())
                                setTotRev((parseInt(st0.getTotal())+parseInt(st1.getTotal())+parseInt(st2.getTotal())).toString())
                            }
                        })
                           
                    }
                })
            }
        })
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
            getHgl()
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
        <mye.BTv text="Hello Admin" size={26} color={mye.mycol.primarycol} />
        <Mgin top={20} />
        <mye.Tv text={`Good ${getGreeting()}, welcome to your dashboard`} />
        <Mgin top={30} />
        <div style={{
            display:'flex',
            width:'100%',
            flexWrap:'wrap',
            alignItems:'center'
        }}>
            <Tab1 icon={PersonOutline} title="Members" value={hele?hele.getTotalUsers():'...'} color={mye.mycol.primarycol} />
            <Tab1  title="Total Revenue" value={totRev} color={mye.mycol.hs_blue} />
            <Tab2 />
        </div>
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
             <LrText 
             left={<div style={{
                display:'none'
             }} id="clk" className="hlc" onClick={()=>{

             }}>
                <mye.HTv text="View All" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             right={<div id="clk" style={{
                display:mainprop.me.getMemId()!= masterID?'none':undefined
             }} className="hlc" onClick={()=>{
                if(mainprop.me.getMemId()!= masterID){
                    toast('Only super admins can make announcement',0)
                    return
                }
                setShowNewAnn(true)
             }}>
                <mye.HTv text="Make Announcement" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             />
        </div>
        <PoweredBySSS />

        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:showNewAnn?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 25%':0
        }}>
            <div style={{
                backgroundColor: mye.mycol.bkg,
                width:'100%',
                height:'100%',
                display:'flex',
                flexDirection:'column',
                borderRadius:10
            }}>
                <div style={{
                    backgroundColor:mye.mycol.primarycol,
                    padding:'10px 20px',
                    borderRadius:'10px 10px 0 0'
                }}>
                    <LrText 
                    left={<mye.HTv text="New Announcement" color={mye.mycol.white} size={16} />}
                    right={<BtnIcn icon={Close} color={mye.mycol.white} ocl={()=>{
                        setShowNewAnn(false)
                    }}  />}
                    />
                </div>
                <div style={{
                    width:'100%',
                    flex:1,
                    boxSizing:'border-box',
                    padding:'15px 30px',
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <Mgin top={20} />
                    <input className="tinp"
                        type="text"
                        value={atitle}
                        placeholder="Title"
                        onChange={(e)=>{
                            setATitle(e.target.value)
                        }}
                        style={{
                            width:'100%',
                        }}
                    />
                    <Mgin top={5} />
                    <div style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.1)'}}></div>
                    <textarea
                        value={amsg}
                        placeholder="Type message here"
                        onChange={(e)=>{
                            setAMsg(e.target.value)
                        }}
                        style={{
                            flex:1,
                            marginTop:10,
                            width:'100%',
                            border:'none',
                            outline:'none',
                            resize:'none'
                        }}
                    />
                    <div style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.1)'}}></div>
                    <Mgin top={20} />
                    <div className="hlc" style={{
                        alignSelf:'flex-end'
                    }}>
                        <AttachFile id='clk' className="icon" style={{
                            fontSize:18
                        }} />
                        <Mgin right={10} />
                        <IconBtn icon={Mail} mye={mye} text={"SUBMIT"} ocl={()=>{
                            if(atitle.trim().length ==0){
                                toast('Please enter title',0)
                                return;
                            }
                            if(amsg.trim().length <3){
                                toast('Please enter message',0)
                                return;
                            }
                            setLoad(true)
                            makeRequest.post('setAnnouncements',{
                                title:atitle.trim(),
                                msg:amsg.trim(),
                                time:Date.now().toString()
                            },(task)=>{
                                if(task.isSuccessful()){
                                    toast('Announcement added',1)
                                    setShowNewAnn(false)
                                    getAnns()
                                }else{
                                    setLoad(false)
                                    handleError(task)
                                }
                            })
                        }}  width={120}/>
                    </div>
                </div>
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

    function Tab1(prop:{title:string, value:string, icon?:icony, color:string}) {
        
        return <div id="lshdw" style={{
            width: dimen.dsk?300:'100%',
            margin: dimen.dsk?20:'10px 0px',
            height:150,
            boxSizing:'border-box',
            position:'relative',
            borderRadius:10,
            backgroundImage: `url(${tabcard})`,
            backgroundSize: 'cover',
        }}>
            <div className="ctr" style={{
                width:70,
                height:70,
                backgroundColor:hexToRgba(prop.color,0.1),
                borderRadius:'50%',
                position:'absolute',
                top:20,
                right:20
            }}>
                {prop.icon?<prop.icon style={{
                    fontSize:20,
                    color: prop.color
                }} />:<img src={naira} height={20} alt="." color={prop.color} />}
            </div>
            <div style={{
                position:'absolute',
                left:20,
                bottom:20
            }}>
                <mye.Tv text={prop.title} color={mye.mycol.primarycol} />
                <Mgin top={10}/>
                <mye.BTv text={prop.value} size={20}  />
            </div>
        </div>
    }

    function Tab2() {

        function getPerc(isMale:boolean){
            if(!hele){
                return 0
            }
            let sum = hele.getTotalMales()+hele.getTotalFemales()
            if(sum==0){
                sum = 1;
            }
            return Math.round(((isMale?hele.getTotalMales():hele.getTotalFemales())/(sum))*100)
        }
        
        return <div id="lshdw" style={{
            width: dimen.dsk?300:'100%',
            margin: dimen.dsk?20:'10px 0px',
            height:150,
            boxSizing:'border-box',
            position:'relative',
            borderRadius:5,
            backgroundImage: `url(${tabcard})`,
            backgroundSize: 'cover',
        }}>
            <div style={{
                width:70,
                height:70,
                position:'absolute',
                top:20,
                right:20,
            }}>
                <MyPieChart size={70} key={hele?0.1213:0.34} values={[getPerc(true),getPerc(false)]} colors={[mye.mycol.primarycol, mye.mycol.secondarycol]}/>
            </div>
            <div style={{
                position:'absolute',
                left:20,
                bottom:20
            }}>
                <div className="hlc">
                    <div style={{width:10,height:10,borderRadius:2,backgroundColor:mye.mycol.primarycol}}></div>
                    <Mgin right={5} />
                    <mye.Tv text="Males" color={mye.mycol.primarycol} />
                    <Mgin right={10} />
                    <mye.Tv text={hele?getPerc(true).toString()+'%':'...'} color={mye.mycol.primarycol} />
                </div>
                <Mgin top={10}/>
                <div className="hlc">
                    <div style={{width:10,height:10,borderRadius:2,backgroundColor:mye.mycol.secondarycol}}></div>
                    <Mgin right={5} />
                    <mye.Tv text="Females" color={mye.mycol.primarycol} />
                    <Mgin right={10} />
                    <mye.Tv text={hele?getPerc(false).toString()+'%':'...'} color={mye.mycol.primarycol} />
                </div>
            </div>
        </div>
    }
}