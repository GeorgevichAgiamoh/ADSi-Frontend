import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown, Savings, PaymentOutlined, SavingsOutlined, AddOutlined } from "@mui/icons-material"
import { useState, useEffect, ChangeEvent } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony, EditTextFilled, MyCB } from "../../../../helper/general"
import { indivEle, payTypeEle } from "../../../classes/classes"



export function AdminPayTypes(mainprop:{actiony:(action:number,payType:payTypeEle)=>void}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    const[newPayType,setNewPayType] = useState(false)
    const payTypes = [
        new payTypeEle('Registration Fee',5000,0,0,0,0),
        new payTypeEle('Thrift/Annual Dues',12000,12,0,0,0),
        new payTypeEle('Share capital',5000,-1,1,1,1000),
    ]

    useEffect(()=>{
        setTitle(`Payment Types - ${appName}`)
    },[])


    return <div className="vlc" style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <div style={{
            alignSelf:'flex-end'
        }}>
            <IconBtn icon={Add} text="Payment Type" mye={mye} ocl={()=>{
                setNewPayType(true)
            }} width={160} bkg={mye.mycol.secondarycol}/>
        </div>
        <Mgin top={10} />
        <div style={{
            display:'flex',
            width:'100%',
            flexWrap:'wrap',
            alignItems:'center'
        }}>
            <Tab1 icon={SavingsOutlined} title="Total Payment" value="N300,000" color={mye.mycol.hs_blue} />
            <Tab1 icon={PersonOutline} title="Outstanding" value="N50,000" color={mye.mycol.red} />
        </div>
        <Mgin top={30} />
        <div className="vlc" id='lshdw' style={{
            width:'100%',
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10,
            boxSizing:'border-box'
        }}>
            <div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <PaymentOutlined style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Payment Type" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="hlc" style={{
                width:dimen.dsk2?'100%':dimen.dsk?dimen.width-450:dimen.width-60,
                overflowX:'scroll'
            }}>
                <div style={{
                    width:dimen.dsk2?'100%':undefined
                }}>
                    <div className="hlc">
                        <MyCell text="S/N"  isBold/>
                        <MyCell text="Name"  isBold/>
                        <MyCell text="Amount"  isBold/>
                        <MyCell text="Interval"  isBold/>
                        <MyCell text="Category"  isBold/>
                        <MyCell text="Tiers"  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    {
                        payTypes.map((ele,index)=>{
                            return <div className="hlc" key={myKey+index}>
                                <MyCell text={(index+1).toString()} />
                                <MyCell text={ele.name} />
                                <MyCell text={'N'+ele.amt} />
                                <MyCell text={ele.months==-1?'None':ele.months==0?'One-time':`${ele.months} months`} />
                                <MyCell text={ele.category==0?'Dues':'Investment'} />
                                <MyCell text={ele.tiers==0?'Flat Rate':'Tier Type'} />
                                <Opts index={index} payType={ele} />
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:newPayType?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)'
        }}>
            <NewPayType closy={()=>{
                setNewPayType(false)
            }} />
        </div>
    </div>

    function NewPayType(prop:{closy:()=>void}) {

        class monthEle{
            text:string
            month:number
            constructor(text:string,month:number){
                this.text = text
                this.month = month
            }
        }

        const myKey = Date.now()
        const[ptype,setPType] = useState(0)
        const[tier,setTier] = useState(0)
        const[name,setName] = useState('')
        const[amt,setAmt] = useState('')
        const[month,setMonth] = useState(new monthEle('',-1))
        const intervals = [
            new monthEle('None',-1),
            new monthEle('One-time',0),
            new monthEle('Every Day',0.1),
            new monthEle('Every Month',1),
            new monthEle('2 Months',2),
            new monthEle('3 Months',3),
            new monthEle('6 Months',6),
            new monthEle('12 Months',12),
        ]

        const handleRadio = (event:ChangeEvent<HTMLInputElement>) => {
            setTier(parseInt(event.target.value));
          };

        return <div style={{
            backgroundColor:mye.mycol.bkg,
            borderRadius:10,
            padding:20,
            overflow:'scroll',
            height:'75%',
            width:'50%'
        }}>
            <div className="vlc" style={{
                width:'100%',
            }} onClick={prop.closy}>
                <Close className="icon" style={{
                    alignSelf:'flex-end'
                }} />
            </div>
            <Mgin top={10} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Payment Type" />
                <Mgin top={3}/>
                <select id="dropdown" name="dropdown" value={ptype.toString()} onChange={(e)=>{
                    setPType(parseInt(e.target.value))
                }}>
                    <option value="0">Dues</option>
                    <option value="1">Investment</option>
                    <option value="2">Contributions</option>
                </select>
            </div>
            <Mgin top={20} />
            <mye.Tv text="Payment Tier" />
            <Mgin top={3}/>
            <div className="hlc">
                <label>
                    <input
                    type="radio"
                    value="0"
                    checked={tier === 0}
                    onChange={handleRadio}
                    />
                    Flat Rate
                </label>
                <Mgin right={20} />
                <label>
                    <input
                    type="radio"
                    value="1"
                    checked={tier === 1}
                    onChange={handleRadio}
                    />
                    Tier Type
                </label>
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Name" />
                <Mgin top={3}/>
                <EditTextFilled hint="Payment Name" min={3} value={name} finise={(v)=>[
                    setName(v.trim())
                ]} />
            </div>
            <Mgin top={20} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="Amount" />
                <Mgin top={3}/>
                <EditTextFilled digi noSpace hint="Payment Amount" min={1} value={amt} finise={(v)=>[
                    setAmt(v.trim())
                ]} />
            </div>
            <Mgin top={20} />
            <LrText 
            left={<mye.Tv text="Interval" color={mye.mycol.primarycol}  />}
            right={<AddOutlined className="icon" />}
            />
            <Mgin top={5} />
            <div className="flexi">
                {
                    intervals.map((ele,index)=>{
                        return <CB  me={ele} key={myKey+index} />
                    })
                }
            </div>
            <Mgin top={10} />
            <Line />
            <Mgin top={10} />
            <LrText 
            left={<mye.Tv text="Add Another Tier" color={mye.mycol.primarycol}  />}
            right={<AddOutlined className="icon" />}
            />
            <Mgin top={15} />
            <Btn txt="CREATE TYPE" onClick={()=>{

            }} />
        </div>

        function CB(prop:{me:monthEle}) {
            return <div className="hlc" style={{
                borderRadius:5,
                border: `${mye.mycol.btnstripx2} solid 1px`,
                padding:5,
                marginRight:10,
                marginTop:10
            }}>
                <MyCB noPadding checked={prop.me == month} mye={mye} ocl={()=>{
                    setMonth(prop.me)
                }}/>
                <Mgin right={5} />
                <mye.Tv text={prop.me.text} color={mye.mycol.primarycol} />
            </div>
        }
    }

    function Opts(prop:{index:number,payType:payTypeEle}) {
        return <div className="ctr" style={{
            width:100,
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
                <MyCell text="View" ocl={()=>{
                    mainprop.actiony(0,prop.payType)
                }} alignStart special />
                <Line />
                <MyCell text="Delete" ocl={()=>{
                    
                }} alignStart special/>
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

