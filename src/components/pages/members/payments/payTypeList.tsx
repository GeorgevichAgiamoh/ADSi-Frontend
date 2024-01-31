/* eslint-disable eqeqeq */
import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown, Savings, PaymentOutlined, SavingsOutlined, AddOutlined, MonetizationOnOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { useState, useEffect, ChangeEvent } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import tabcard from "../../../../assets/tabcard.png"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony, EditTextFilled, MyCB, hexToRgba, ErrorCont, pricePerShare, isDigit, paystackPK, getPayRef } from "../../../../helper/general"
import { indivEle, payTypeEle } from "../../../classes/classes"
import { defVal, memberBasicinfo, payRecordEle, payStat } from "../../../classes/models"
import { useLocation, useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Toast from "../../../toast/toast"
import { getMemId, makeRequest, resHandler } from "../../../../helper/requesthandler"
import Barcode from "react-barcode"
import { PoweredBySSS } from "../../../../helper/adsi"



export function MemberPayTypes(mainprop:{mbi:memberBasicinfo,actiony:(action:number, outstanding:string[],payRecord?:payRecordEle)=>void}){
    const location = useLocation()
    const navigate = useNavigate()
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    const[makePaymet,setMakePayment] = useState(0)
    const[showPP,setShowPP] = useState(false)

    const[investments5,setInvestments5] = useState<payRecordEle[]>([])
    const[dues,setDues] = useState<payRecordEle[]>([])
    const[dueStat,setDueStat] = useState<payStat>()
    const[invStat,setInvStat] = useState<payStat>()

    const[cpay, setCPay] = useState<payRecordEle>()

    const[showReceipt, setShowReceipt] = useState(false)
    const[outstanding,setOutstanding] = useState<string[]>([])
    

    useEffect(()=>{
        setTitle(`My Payments - ${appName}`)
        getStats()
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

    function getStats(){
        setLoad(true)
        setError(false)
        makeRequest.get(`getMemPaysStat/${getMemId()}/1`,{},(task)=>{
            if(task.isSuccessful()){
                setDueStat(new payStat(task.getData()))
                makeRequest.get(`getMemPaysStat/${getMemId()}/2`,{},(task)=>{
                    if(task.isSuccessful()){
                        setInvStat(new payStat(task.getData()))
                        get5pays();
                    }else{
                        handleError(task)
                    }
                })
            }else{
                handleError(task)
            }
        })
    }

    function get5pays(){
        setLoad(true)
        setError(false)
        makeRequest.get(`getMemPays/${getMemId()}/2`,{
            start: 0,
            count: 5
        },(task)=>{
          if(task.isSuccessful()){
            const tem:payRecordEle[] = []
            for(const key in task.getData()){
                tem.push(new payRecordEle(task.getData()[key]))
            }
            setInvestments5(tem)
            makeRequest.get(`getMemPays/${getMemId()}/1`,{
                start: 0,
                count: 50
            },(task)=>{
              if(task.isSuccessful()){
                const tem:payRecordEle[] = []
                for(const key in task.getData()){
                    tem.push(new payRecordEle(task.getData()[key]))
                }
                setDues(tem)
                //--- OUTSTANDINGS
                const cy = new Date().getFullYear()
                const yrs:string[] = []
                for(let i = cy; i > 2022; i--){ //Starts at 2023
                    yrs.push(i.toString())
                }
                let paids:string[] = [];
                for(let d of tem){
                    if(yrs.includes(d.getYear())){
                        paids.push(d.getYear())
                    }
                }
                const notPaids:string[] = []
                for (let y in yrs){
                    if(!paids.includes(yrs[y])){
                        notPaids.push(yrs[y])
                    }
                }
                setOutstanding(notPaids)
                setLoad(false)
              }else{
                handleError(task)
              } 
            })
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

    return <div className="vlc" style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <ErrorCont isNgt={false} visible={error} retry={()=>{
            setError(false)
            getStats()
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
        <div style={{
            display:'flex',
            width:'100%',
            flexWrap:'wrap',
            alignItems:'center'
        }}>
            <Tab1 ocl={()=>{
                mainprop.actiony(0,outstanding)
            }}  icon={MonetizationOnOutlined} title="Total Share Capital" value={invStat?(invStat.getTotal()+'/'+(invStat.getTotal()/10)+' shares'):'...'} color={mye.mycol.green} />
            <Tab1 ocl={()=>{
                mainprop.actiony(1,outstanding)
            }} icon={MonetizationOnOutlined} title="Total Dues Paid" value={dueStat?dueStat.getTotal():'...'} color={mye.mycol.hs_blue} />
            <Tab1 ocl={()=>{
                mainprop.actiony(2,outstanding)
            }} icon={MonetizationOnOutlined} title="Outstanding Payment" value={`N${outstanding.length*5000}`} color={mye.mycol.red} />
        </div>
        <Mgin top={30} />
        <div id='lshdw' style={{
            width:'100%',
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10,
            boxSizing:'border-box'
        }}>
            <LrText 
            left={<div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <MonetizationOnOutlined style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Share Capital" size={16} color={mye.mycol.secondarycol} />
            </div>}
            right={<IconBtn icon={Add} mye={mye} text="Invest" ocl={()=>{
                setMakePayment(2)
            }} />}
            />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:dimen.dsk2?'100%':dimen.dsk?dimen.width-450:dimen.width-60,
                overflowX:'scroll'
            }}>
                <div style={{
                    width:dimen.dsk2?'100%':undefined
                }}>
                    <div className="hlc">
                        <MyCell text="Shares"  isBold/>
                        <MyCell text="Amount"  isBold/>
                        <MyCell text="Date"  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    <Line />
                    {
                        investments5.map((ele,index)=>{
                            return <div key={myKey+index+0.011} style={{
                                width:'100%'
                            }}>
                                <div className="hlc" key={myKey+index+0.1}>
                                    <MyCell text={ele.getShares()} />
                                    <MyCell text={'N'+ele.getAmt()} />
                                    <MyCell text={ele.getDate()} />
                                    <Opts index={index} payRecord={ele} />
                                </div>
                                <Line />
                            </div>
                        })  
                    }
                </div>
            </div>
            <div id="clk" className="hlc" onClick={()=>{
                mainprop.actiony(0,outstanding)
            }}>
            <mye.HTv text="View All" color={mye.mycol.primarycol} size={12} />
            <Mgin right={10} />
            <ArrowRightOutlined className="icon" />
            </div>
        </div>
        <Mgin top={40} />
        <div id='lshdw' style={{
            width:'100%',
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10,
            boxSizing:'border-box'
        }}>
            <LrText 
            left={<div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <MonetizationOnOutlined style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Dues History" size={16} color={mye.mycol.secondarycol} />
            </div>}
            right={<IconBtn icon={Add} mye={mye} text="Pay Dues" ocl={()=>{
                setMakePayment(1)
            }} />}
            />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:dimen.dsk2?'100%':dimen.dsk?dimen.width-450:dimen.width-60,
                overflowX:'scroll'
            }}>
                <div style={{
                    width:dimen.dsk2?'100%':undefined
                }}>
                    <div className="hlc">
                        <MyCell text="Year"  isBold/>
                        <MyCell text="Amount"  isBold/>
                        <MyCell text="Date"  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    <Line />
                    {
                        dues.map((ele,index)=>{
                            return <div key={myKey+index+0.021} style={{
                                width:'100%'
                            }}>
                                <div className="hlc" key={myKey+index+0.1}>
                                    <MyCell text={ele.getYear()} />
                                    <MyCell text={'N'+ele.getAmt()} />
                                    <MyCell text={ele.getDate()} />
                                    <Opts index={index} payRecord={ele} />
                                </div>
                                <Line />
                            </div>
                        })  
                    }
                </div>
            </div>
            <div id="clk" className="hlc" onClick={()=>{
                mainprop.actiony(1,outstanding)
            }}>
            <mye.HTv text="View All" color={mye.mycol.primarycol} size={12} />
            <Mgin right={10} />
            <ArrowRightOutlined className="icon" />
            </div>
        </div>
        <PoweredBySSS />
        {/* Absolutely positioned (dialog) */}
        {makePaymet!=0?<div className="ctr" style={{
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(0,0,0,0.1)'
        }}>
            <MakePayment mbi={mainprop.mbi} makePaymet={makePaymet}  closy={(sp)=>{
                setMakePayment(0)
                if(sp){
                    setShowPP(true)
                }
            }} />
        </div>:<div></div>}
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
                <mye.HTv text="Processing" />
                <Mgin top={20} />
                <mye.Tv text="Your payment is being processed. You can refresh the page to confirm" />
                <Mgin top={20} />
                <Btn txt="CLOSE" width={100} onClick={()=>{
                    setShowPP(false)
                }} />
            </div>
        </div>
    }

    function Opts(prop:{index:number,payRecord:payRecordEle}) {
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
                    setCPay(prop.payRecord)
                    setShowReceipt(true)
                }} alignStart special />
                <Line />
            </div>
        </div>
    }

    function MyCell(prop:{text:string,isBold?:boolean,alignStart?:boolean,ocl?:()=>void, special?:boolean}) {
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
            {prop.isBold?<mye.BTv text={prop.text} size={14} color={mye.mycol.primarycol}  />:<mye.Tv text={prop.text} size={14} color={mye.mycol.imghint} />}
        </div>
    }


    function Tab1(prop:{title:string, value:string, icon:icony, color:string, ocl:()=>void}) {
        
        return <div id="lshdw" style={{
            width: dimen.dsk?300:'100%',
            margin: dimen.dsk?20:'10px 0px',
            height:150,
            boxSizing:'border-box',
            position:'relative',
            borderRadius:10,
            backgroundImage: `url(${tabcard})`,
            backgroundSize: 'cover',
        }} onClick={prop.ocl}>
            <div className="ctr" style={{
                width:70,
                height:70,
                backgroundColor:hexToRgba(prop.color,0.1),
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

function MakePayment(prop:{makePaymet:number,mbi:memberBasicinfo,closy:(showPP?:boolean)=>void}) {
    const myKey = Date.now()
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[shares,setShares] = useState('')
    const[year,setYear] = useState('')
    const[amt,setAmt] = useState('')

    const[years,setYears] = useState<string[]>([])

    useEffect(()=>{
        const cy = new Date().getFullYear()
        const tem:string[] = []
        for(let i = cy; i > cy-20; i--){
            tem.push(i.toString())
        }
        setYears(tem)
        if(prop.makePaymet==1){
            setAmt('12000')
        }
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
          };
    },[])
    
    function payWithPaystack() {
        if((window as any).PaystackPop){
            var handler = (window as any).PaystackPop.setup({

                subaccount: "ACCT_putnq50bqlukxxj",
        
                key: paystackPK,
            
                email: prop.mbi.getEmail()==defVal?prop.mbi.getPhone()+'@adsicoop.com.ng':prop.mbi.getEmail(),
            
                amount: parseFloat(amt) * 100, //In kobo
            
                currency: 'NGN', 
            
                ref: getPayRef(prop.makePaymet.toString(),amt,getMemId()), 
            
                callback: function(response:any) {
                    //var reference = response.reference;
                    prop.closy(true)
                },
            
                onClose: function() {
                    toast('Transaction cancelled',0);
                },
                metadata: {
                    name: prop.mbi.getFirstName()+' '+prop.mbi.getlastName(),
                    time: Date.now().toString(),
                    year: year, 
                    shares: shares 
                    },
                });
                handler.openIframe();
        }else{
            toast('An error occured. Please refresh the page',0)
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
        backgroundColor:mye.mycol.bkg,
        borderRadius:10,
        padding:dimen.dsk?40:20,
        boxSizing:'border-box',
        overflow:'scroll',
        width:dimen.dsk2?'40%':dimen.dsk?'50%':'70%'
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
        <div className="vlc" style={{
            width:'100%',
        }} >
            <Close className="icon" style={{
                alignSelf:'flex-end'
            }} onClick={()=>{
                prop.closy()
            }}/>
        </div>
        <Mgin top={10} />
        {prop.makePaymet==1?<div style={{
            width:'100%'
        }}>
            <mye.Tv text="Year To Pay For" />
            <Mgin top={3}/>
            <select id="dropdown" name="dropdown" value={year} onChange={(e)=>{
                setYear(e.target.value)
            }}>
                <option value="">Choose A Year</option>
                {
                    years.map((yr,index)=>{
                        return <option key={myKey+index+1} value={yr}>{yr}</option>
                    })
                }
            </select>
        </div>:<div style={{
            width:'100%'
        }}>
            <mye.Tv text="Shares" />
            <Mgin top={3}/>
            <EditTextFilled hint="No. of share (at 10 naira each)" min={4} digi value={shares} recv={(v)=>{
                const sh = v.trim()
                setShares(sh)
                if(sh.length>1 && isDigit(sh)){
                    setAmt((parseFloat(sh)* pricePerShare).toString())
                }
            }} />
        </div>}
        <Mgin top={20} />
        <div style={{
            width:'100%'
        }}>
            <mye.Tv text="You Will Pay" />
            <Mgin top={3}/>
            <mye.BTv text={`NGN ${amt}`} size={16}/>
        </div>
        <Mgin top={15} />
        <Btn txt="PAY" onClick={()=>{
            payWithPaystack()
        }} />
    </div>
}