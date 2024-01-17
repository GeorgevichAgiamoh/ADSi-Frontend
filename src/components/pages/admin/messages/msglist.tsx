

import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown, Message, Outbox, Inbox, Done } from "@mui/icons-material"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony, MyCB } from "../../../../helper/general"
import { msgMeta } from "../../../classes/classes"
import { NewMsg } from "./messages"



export function AdminMsgList(mainprop:{actiony:(action:number,user:msgMeta)=>void}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[search, setSearch] = useState('')
    const[showOutbox, setShowOutbox] = useState(true)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    const[showingIndex,setShowingIndex] = useState(0)
    const[selMsgs, setSelMsgs] = useState<string[]>([])
    const[showNewMsg, setShowNewMsg] = useState(false)
    const msgMetas = [
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        new msgMeta('Notification of Interest',"Lorem ipsum dolor sit amet, xonstst sgetes",'Chinedu Anthony','Mikel Jones','12/2/2021; 3:46PM'),
        
    ]

    useEffect(()=>{
        setTitle(`Message List - ${appName}`)
    },[])

    function updateSelMsgs(id:string, rmv?:boolean){
        let nsel = [...selMsgs]
        if(rmv){
            setSelMsgs(nsel.filter(item=>item!==id))
        }else{
            nsel = nsel.filter(item=>item!==id)
            nsel.push(id)
            setSelMsgs(nsel)
        }
    }

    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
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
                <Btn txt="Outbox" round onClick={()=>{
                    setShowOutbox(true)
                }} transparent={!showOutbox} />
            </div>
            <Mgin right={10} />
            <div style={{
                flex:1
            }}>
                <Btn txt="Inbox" round onClick={()=>{
                    setShowOutbox(false)
                }} transparent={showOutbox}/>
            </div>
        </div>}
        right={<div className="flexi">
            <IconBtn icon={Message} mye={mye} text="NEW MESSAGE" ocl={()=>{
                setShowNewMsg(true)
            }} bkg={mye.mycol.secondarycol} width={150} />
        </div>}
        />
        <Mgin top={15} />
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
                {showOutbox?<Outbox style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />:<Inbox style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />}
                <Mgin right={10}/>
                <mye.HTv text={showOutbox?"Outbox":'Inbox'} size={16} color={mye.mycol.secondarycol} />
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
                        <MyCB mye={mye} checked={selMsgs.length == msgMetas.length} ocl={()=>{
                            const all:string[] = []
                            if(selMsgs.length != msgMetas.length){
                                for (let i = 0; i < msgMetas.length; i++){
                                    all.push(i.toString())
                                }
                            }
                            setSelMsgs(all)
                        }} />
                        <MyCell text={showOutbox?"Sent To":'Received From'}  isBold   />
                        <MyCell text="Message"  isBold  big />
                        <MyCell text="Date"  isBold   />
                        <MyCell text="Action"  isBold   />
                    </div>
                    {
                        msgMetas.slice((showingIndex*20),(showingIndex*20+20)).map((ele,index)=>{
                            return <div className="hlc" key={myKey+index+showingIndex*20}>
                               <MyCB mye={mye} checked={selMsgs.includes((index+showingIndex*20).toString())} ocl={()=>{
                                    const id = (index+showingIndex*20).toString()
                                    updateSelMsgs(id,selMsgs.includes(id))
                                }} />
                                <MyCell text={showOutbox?ele.whoreceived:ele.whosent}    />
                                <MyCell text={ele.msg}  big />
                                <MyCell text={ele.date}   />
                                <Opts index={index} msg={ele}  />
                            </div>
                        })
                    }
                </div>
            </div>
            <Mgin top={20} />
            <div className="hlc">
                <ArrowBack id="clk" className="icon" onClick={()=>{
                    if(showingIndex >0){
                        setShowingIndex(showingIndex-1)
                    }
                }} />
                <Mgin right={10} />
                {
                    Array.from({length:Math.floor(msgMetas.length/20)+1},(_,index)=>{
                        return <div id="clk" key={myKey+index+10000} className="ctr" style={{
                            width:25,
                            height:25,
                            backgroundColor:showingIndex==index?mye.mycol.black:'transparent',
                            borderRadius:'50%'
                        }} onClick={()=>{
                            setShowingIndex(index)
                        }}>
                            <mye.BTv text={(index+1).toString()} color={showingIndex==index?mye.mycol.white:mye.mycol.black} size={16}/>
                        </div>
                    })
                }
                <Mgin right={10} />
                <ArrowForward id="clk" className="icon" onClick={()=>{
                    const len = Math.floor(msgMetas.length/20)
                    console.log(len)
                    console.log(showingIndex)
                    if(showingIndex < len){
                        setShowingIndex(showingIndex+1)
                    }
                }} />
            </div>
        </div>
        {/* Absolutely positioned (dialog) */}
        <div className="ctr" style={{
            display:showNewMsg?undefined:'none',
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            boxSizing:'border-box',
            backgroundColor:'rgba(0,0,0,0.1)',
            padding: dimen.dsk?'10% 25%':0
        }}>
            <NewMsg closy={()=>{
                setShowNewMsg(false)
            }} />
        </div>
    </div>

    function Opts(prop:{index:number,msg:msgMeta}) {
        return <div className="ctr" style={{
            flex:(dimen.dsk2 )?1:undefined,
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
                <MyCell text="View" ocl={()=>{
                    mainprop.actiony(0,prop.msg)
                }} alignStart special />
                <Line />
                <MyCell text="Delete" ocl={()=>{
                    mainprop.actiony(1,prop.msg)
                }} alignStart special />
            </div>
        </div>
    }

    function MyCell(prop:{text:string,isBold?:boolean,alignStart?:boolean,ocl?:()=>void, special?:boolean,big?:boolean}) {
        return <div id={prop.special?'clk':undefined} className="ctr" style={{
            flex:(dimen.dsk2 && !prop.special)?1:undefined,
            width:(dimen.dsk2 && !prop.special)?undefined:prop.big?200:100,
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

}

