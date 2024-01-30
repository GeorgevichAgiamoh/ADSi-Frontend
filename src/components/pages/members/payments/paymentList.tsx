import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown, SavingsOutlined, MonetizationOnOutlined, PrintOutlined } from "@mui/icons-material"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony, ErrorCont } from "../../../../helper/general"
import { indivEle, payInfo, payTypeEle } from "../../../classes/classes"
import Barcode from "react-barcode"
import { payRecordEle } from "../../../classes/models"
import { getMemId, makeRequest, resHandler } from "../../../../helper/requesthandler"
import { CircularProgress } from "@mui/material"
import Toast from "../../../toast/toast"
import { useLocation, useNavigate } from "react-router-dom"
import { PoweredBySSS } from "../../../../helper/adsi"



export function MemberPaymentList(mainprop:{tabPos:number,outstanding?:string[], backy:()=>void}){
    const location = useLocation()
    const navigate = useNavigate()
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[search, setSearch] = useState('')
    const[tabPos, setTabPos] = useState(0)
    const[cpay, setCPay] = useState<payRecordEle>()
    const[showReminder, setShowReminder] = useState(false)
    const[showReceipt, setShowReceipt] = useState(false)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    const[showingIndex,setShowingIndex] = useState(0)

    const[pays, setPays] = useState<payRecordEle[]>([])

    useEffect(()=>{
        setTitle(`Payment List - ${appName}`)
        getPays(mainprop.tabPos,0)
    },[])

    function getPays(tabPos:number,index:number){
        setError(false)
        setTabPos(tabPos)
        if(tabPos==2){
            return;
        }
        setLoad(true)
        makeRequest.get(`getMemPays/${getMemId()}/${tabPos==0?'2':'1'}`,{
            start:(index*5),
            count:5
        },(task)=>{
          if(task.isSuccessful()){
            const tem:payRecordEle[] = []
            for(const key in task.getData()){
                tem.push(new payRecordEle(task.getData()[key]))
            }
            setPays(tem)
            setLoad(false)
            setShowingIndex(index)
          }else{
            handleError(task)
          } 
        })
    }

    function handleError(task:resHandler){
        setLoad(false)
        setError(true)
        if(task.isLoggedOut()){
            navigate(`/login?rdr=${location.pathname.substring(1)}`)
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

    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            getPays(mainprop.tabPos,0)
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
            mainprop.backy()
        }}>
            <ArrowBack className="icon" />
            <Mgin right={10} />
            <mye.HTv text="Go Back" size={14} />
        </div>
        <Mgin top={20} />
        <div style={{
            display:'flex',
            width:'100%',
            flexWrap:'wrap',
            alignItems:'center'
        }}>
            <FiltrLay icon={FilterOutlined} text="Filter" />
            <FiltrLay icon={SortOutlined} text="Sort" />
            <div style={{
                width:dimen.dsk?400:'100%',
                display:'flex',
                margin: dimen.dsk?10:5,
            }}>
                <div className="hlc" id="lshdw" style={{
                    flex:1,
                    backgroundColor:mye.mycol.white,
                    borderRadius:10,
                }}>
                    <Mgin right={15} />
                    <SearchOutlined style={{
                        fontSize:20,
                        color:mye.mycol.imghint
                    }} />
                    <Mgin right={5} />
                    <input className="tinp"
                        type="text"
                        value={search}
                        placeholder="Search"
                        onChange={(e)=>{
                            setSearch(e.target.value)
                        }}
                        style={{
                            width:'100%',
                        }}
                    />
                </div>
                <Mgin right={10} />
                <div style={{
                    width:100
                }}>
                    <Btn txt="Search" onClick={()=>{
                        
                    }} />
                </div>
            </div>
        </div>
        <Mgin top={10} />
        <FiltrLay icon={ListAltOutlined} text="Entries" />
        <Mgin top={30} />
        <LrText wrap={!dimen.dsk}
        left={<div style={{
            width:250,
            display:'flex'
        }}>
            <div style={{
                flex:1
            }}>
                <Btn txt="Investments" round onClick={()=>{
                    getPays(0,0)
                }} transparent={tabPos!=0} width={120}/>
            </div>
            <Mgin right={10} />
            <div style={{
                flex:1
            }}>
                <Btn txt="Dues" round onClick={()=>{
                    getPays(1,0)
                }} transparent={tabPos!=1} />
            </div>
            <Mgin right={10} />
            <div style={{
                flex:1
            }}>
                <Btn txt="Outstanding" round onClick={()=>{
                    getPays(2,0)
                }} transparent={tabPos!=2} width={120}/>
            </div>
        </div>}
        right={<div className="flexi">
            <IconBtn icon={PrintOutlined} mye={mye} text="Print" ocl={()=>{

            }} width={100} />
            <Mgin right={10} />
            <IconBtn icon={CloudDownloadOutlined} mye={mye} text="Download CSV" ocl={()=>{

            }} width={140} />
        </div>}
        />
        <Mgin top={15} />
        {tabPos==2?<div>
            <mye.BTv text="You are owing dues for the following years" size={20} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            {
                mainprop.outstanding?mainprop.outstanding.map((yr,i)=>{
                    return <mye.Tv key={myKey+i+0.923} text={yr}/>
                }):<mye.Tv text="No Outstanding. Thank you"  />
            }
        </div>:<div className="vlc" id='lshdw' style={{
            width:'100%',
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10,
            boxSizing:'border-box'
        }}>
            <div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <MonetizationOnOutlined style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text={`${tabPos==0?'Investments':'Dues'} History`} size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="hlc" style={{
                width:dimen.dsk2?'100%':dimen.dsk?dimen.width-450:dimen.width-60,
                overflowX:'scroll'
            }}>
                {
                    tabPos==0?<div style={{
                    width:dimen.dsk2?'100%':undefined,
                    paddingBottom:optToShow!=-1?150:0,
                }}>
                    <div className="hlc">
                        <MyCell text="S/N"  isBold/>
                        <MyCell text="Shares"  isBold/>
                        <MyCell text="Amount"  isBold/>
                        <MyCell text="Date"  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    {
                        pays.slice((showingIndex*5),(showingIndex*5+5)).map((ele,index)=>{
                            return <div className="hlc" key={myKey+index+showingIndex*5}>
                                <MyCell text={(index+1+showingIndex*5).toString()} />
                                <MyCell text={ele.getShares()} />
                                <MyCell text={`N${ele.getAmt()}`} />
                                <MyCell text={ele.getDate()} />
                                <Opts index={index} pay={ele} />
                            </div>
                        })
                    }
                </div>:<div style={{
                        width:dimen.dsk2?'100%':undefined,
                        paddingBottom:optToShow!=-1?150:0,
                    }}>
                        <div className="hlc">
                            <MyCell text="S/N"  isBold/>
                            <MyCell text="Year"  isBold/>
                            <MyCell text="Amount"  isBold/>
                            <MyCell text="Date"  isBold/>
                            <MyCell text="Action"  isBold/>
                        </div>
                        {
                            pays.slice((showingIndex*5),(showingIndex*5+5)).map((ele,index)=>{
                                return <div className="hlc" key={myKey+index+showingIndex*5}>
                                    <MyCell text={(index+1+showingIndex*5).toString()} />
                                    <MyCell text={ele.getYear()} />
                                    <MyCell text={`N${ele.getAmt()}`} />
                                    <MyCell text={ele.getDate()} />
                                    <Opts index={index} pay={ele} />
                                </div>
                            })
                        }
                    </div>
                }
            </div>
            <Mgin top={20} />
            <div className="hlc">
                <ArrowBack id="clk" className="icon" onClick={()=>{
                    if(showingIndex >0){
                        getPays(tabPos,showingIndex-1)
                    }
                }} />
                <Mgin right={10} />
                {
                    Array.from({length:Math.floor((pays).length/20)+1},(_,index)=>{
                        return <div id="clk" key={myKey+index+10000} className="ctr" style={{
                            width:25,
                            height:25,
                            backgroundColor:showingIndex==index?mye.mycol.black:'transparent',
                            borderRadius:'50%'
                        }} onClick={()=>{
                            getPays(tabPos,showingIndex)
                        }}>
                            <mye.BTv text={(index+1).toString()} color={showingIndex==index?mye.mycol.white:mye.mycol.black} size={16}/>
                        </div>
                    })
                }
                <Mgin right={10} />
                <ArrowForward id="clk" className="icon" onClick={()=>{
                    const len = Math.floor((pays).length/20)
                    console.log(len)
                    console.log(showingIndex)
                    if(showingIndex < len){
                        getPays(tabPos,showingIndex+1)
                    }
                }} />
            </div>
        </div>}
        <PoweredBySSS />
         {/* Absolutely positioned (dialog) */}
         <div className="ctr" style={{
            display:showReminder?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 25%':0
        }}>
            <SendReminder />
        </div>
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:showReceipt?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 25%':0
        }}>
            {cpay?<PayReciept ele={cpay} />:<div></div>}
        </div>
    </div>

    function PayReciept(prop:{ele:payRecordEle}) {
        return <div className="vlc" style={{
            width:'100%',
            height:'100%',
            backgroundColor:mye.mycol.bkg,
            borderRadius:10,
            padding:20
        }}>
            <div id="clk" style={{
                    alignSelf:'flex-end'
                }} onClick={()=>{
                    setShowReceipt(false)
                }}>
                    <Close className="icon" />
                </div>
                <div className="ctr" style={{
                    flex:1
                }}>
                    <div className="vlc" id="lshdw" style={{
                        width:265,
                        padding:20,
                        boxSizing:'border-box',
                        borderRadius:10,
                    }}>
                        <mye.Tv text="PAYMENT RECEIPT" size={12} color={mye.mycol.primarycol} />
                        <Mgin top={15} />
                        <Line broken/>
                        <Mgin top={20} />
                        <LrText
                        left={<mye.Tv text="Date/Time:" size={12} />}
                        right={<mye.Tv text={prop.ele.getDate()} size={12} />}
                        />
                        <Mgin top={7} />
                        <LrText
                        left={<mye.Tv text="Type:" size={12} />}
                        right={<mye.Tv text={prop.ele.getType()} size={12} />}
                        />
                        <Mgin top={7} />
                        <LrText
                        left={<mye.Tv text="Receipt Id:" size={12} />}
                        right={<mye.Tv text={prop.ele.getReceiptId()} size={12} />}
                        />
                        <Mgin top={7} />
                        <Line broken/>
                        <Mgin top={7} />
                        <LrText
                        left={<mye.Tv text="Amount" size={12} />}
                        right={<mye.Tv text={`NGN ${prop.ele.getAmt()}`} size={12} />}
                        />
                        <Mgin top={7} />
                        <Line broken/>
                        <Mgin top={7} />
                        <LrText
                        left={<mye.Tv text="Visa Debit" size={12} />}
                        right={<mye.Tv text={`**** **** **** ****`} size={12} />}
                        />
                        <Mgin top={20} />
                        <mye.HTv text="Transaction Approved" size={12} />
                        <Mgin top={20} />
                        <Barcode value={prop.ele.getReceiptId()} height={30} displayValue={false} />
                        <Mgin top={10} />
                    </div>
                </div>
            </div>
    }

    function SendReminder(prop:{}) {
        return <div className="vlc" style={{
            width:'100%',
            height:'100%',
            backgroundColor:mye.mycol.bkg,
            borderRadius:10,
            padding:20
        }}>
            <div id="clk" style={{
                alignSelf:'flex-end'
            }} onClick={()=>{
                setShowReminder(false)
            }}>
                <Close className="icon" />
            </div>
            <div className="ctr" style={{
                flex:1
            }}>
                <mye.Tv text="Send Reminder" color={mye.mycol.primarycol} size={16} />
                <Mgin top={20} />
                <div className="hlc">
                    <Tab text="SMS" ocl={()=>{

                    }} />
                    <Mgin right={15} />
                    <Tab text="Email" ocl={()=>{

                    }} />
                </div>
            </div>
        </div>

        function Tab(prop:{text:string, ocl:()=>void}) {
            return <div id="clk" className="ctr" style={{
                width:80,
                height:100,
                borderRadius:5,
                backgroundColor:mye.mycol.btnstrip
            }} onClick={prop.ocl}>
                <mye.Tv text={prop.text} />
            </div>
        }
    }

    function Opts(prop:{index:number,pay:payRecordEle}) {
        return <div className="ctr" style={{
            flex:(dimen.dsk2)?1:undefined,
            width:(dimen.dsk2)?undefined:100,
            height:40,
            position:'relative'
        }}>
            <div id="clk" className="ctr" style={{
                width:40,
                height:40
            }} onClick={()=>{
                setOptToShow(prop.index)
            }}>
                <MoreVert className="icon" />
            </div>
            <div className="vlc" id="lshdw" style={{
                display:optToShow==prop.index?undefined:'none',
                backgroundColor:mye.mycol.white,
                borderRadius:10,
                width:100,
                position:'absolute',
                top:30,
                left:0,
                zIndex:10
            }}>
                <Close style={{
                    margin:5,
                    fontSize:15,
                    alignSelf:'flex-end',
                    color:mye.mycol.imghint
                }} onClick={()=>{
                    setOptToShow(-1)
                }} />
                <MyCell text="Receipt" ocl={()=>{
                    setCPay(prop.pay)
                    setShowReceipt(true)
                }} alignStart special />
                <Line />
                <MyCell text="Chat" ocl={()=>{
                    
                }} alignStart special/>
            </div>
        </div>
    }

    function MyCell(prop:{text:string,isBold?:boolean,alignStart?:boolean,ocl?:()=>void, special?:boolean, tCol?:string}) {
        return <div id={prop.special?'clk':undefined} className="ctr" style={{
            flex:(dimen.dsk2 && !prop.special)?1:undefined,
            width:(dimen.dsk2 && !prop.special)?undefined:100,
            height:40,
            padding:prop.alignStart?'0px 10px':undefined,
            boxSizing:'border-box',
            alignItems: prop.alignStart?'start':'center'
        }} onClick={()=>{
            setOptToShow(-1)
            if(prop.ocl){
                prop.ocl()
            }
        }}>
            {prop.isBold?<mye.BTv text={prop.text} size={14} color={mye.mycol.primarycol}  />:<mye.Tv text={prop.text} size={14} color={prop.tCol||mye.mycol.imghint} />}
        </div>
    }

    function FiltrLay(prop:{icon:icony,text:string}) {
        return <div id="lshdw" className="hlc" style={{
            padding:10,
            width:dimen.dsk?150:100,
            margin: dimen.dsk?10:5,
            backgroundColor:mye.mycol.white,
            borderRadius:10,
        }}>
            <prop.icon style={{
                fontSize:20,
                color:mye.mycol.imghint
            }} />
            <Mgin right={7} />
            <div style={{
                flex:1
            }}>
                <mye.Tv text={prop.text} color={mye.mycol.imghint} size={12}/>
            </div>
            <KeyboardArrowDown style={{
                fontSize:20,
                color:mye.mycol.imghint
            }} />
        </div>
    }


    function Tab1(prop:{title:string, value:string, icon:icony, color:string}) {
        
        return <div id="lshdw" style={{
            width: dimen.dsk?300:'100%',
            margin: dimen.dsk?20:'10px 0px',
            height:150,
            boxSizing:'border-box',
            position:'relative',
            borderRadius:5,
            backgroundColor:mye.mycol.btnstrip5,
        }}>
            <div className="ctr" style={{
                width:70,
                height:70,
                backgroundColor:prop.color,//TODO: With Opacity
                borderRadius:'50%',
                position:'absolute',
                top:20,
                right:20
            }}>
                <prop.icon style={{
                    fontSize:20,
                    color: prop.color
                }} />
            </div>
            <div style={{
                position:'absolute',
                left:20,
                bottom:20
            }}>
                <mye.Tv text={prop.title} color={prop.color} />
                <Mgin top={10}/>
                <mye.BTv text={prop.value} size={20}  />
            </div>
        </div>
    }

}

