import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown } from "@mui/icons-material"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony } from "../../../../helper/general"
import { indivEle } from "../../../classes/classes"



export function AdminDirList(mainprop:{actiony:(action:number,user:indivEle)=>void}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[search, setSearch] = useState('')
    const[showVerified, setShowVerified] = useState(true)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    const[showingIndex,setShowingIndex] = useState(0)
    const indivs = [
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),
        new indivEle('00000001','Femi','Adeyinka','Davies','M','21/04/1987','07069636261','davies@yinka.com','Some place in Nigeria','Nigeria','Lagos','Lagos'),

    ]

    useEffect(()=>{
        setTitle(`Directory List - ${appName}`)
    },[])


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
            <Tab1 icon={PersonOutline} title="Verified Members" value="19670" color={mye.mycol.primarycol} />
            <Tab1 icon={PersonOutline} title="Unverified Members" value="19670" color={mye.mycol.primarycol} />
        </div>
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
                <Btn txt="Verified" round onClick={()=>{
                    setShowVerified(true)
                }} transparent={!showVerified} />
            </div>
            <Mgin right={10} />
            <div style={{
                flex:1
            }}>
                <Btn txt="Unverified" round onClick={()=>{
                    setShowVerified(false)
                }} transparent={showVerified}/>
            </div>
        </div>}
        right={<div className="flexi">
            <div>
                <OlnBtnPlus text="New User" ocl={()=>{

                }} />
            </div>
            <Mgin right={10} />
            <OlnBtnPlus text="Bulk CSV" ocl={()=>{

            }} />
            <Mgin right={10} maxOut={!dimen.dsk} />
            <IconBtn icon={CloudDownloadOutlined} mye={mye} text="Download" ocl={()=>{

            }} />
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
                <PersonOutline style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Individuals" size={16} color={mye.mycol.secondarycol} />
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
                        <MyCell text="Surname"  isBold/>
                        <MyCell text="Other Names"  isBold/>
                        <MyCell text="Gender"  isBold/>
                        <MyCell text="DOB"  isBold/>
                        <MyCell text="Member ID"  isBold/>
                        <MyCell text="Phone No."  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    {
                        indivs.slice((showingIndex*20),(showingIndex*20+20)).map((ele,index)=>{
                            return <div className="hlc" key={myKey+index+showingIndex*20}>
                                <MyCell text={(index+1+showingIndex*20).toString()} />
                                <MyCell text={ele.lName} />
                                <MyCell text={ele.fName+' '+ele.mName} />
                                <MyCell text={ele.gender} />
                                <MyCell text={ele.dob} />
                                <MyCell text={ele.memId} />
                                <MyCell text={ele.phone} />
                                <Opts index={index} user={ele} />
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
                    Array.from({length:Math.floor(indivs.length/20)+1},(_,index)=>{
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
                    const len = Math.floor(indivs.length/20)
                    console.log(len)
                    console.log(showingIndex)
                    if(showingIndex < len){
                        setShowingIndex(showingIndex+1)
                    }
                }} />
            </div>
        </div>
    </div>

    function Opts(prop:{index:number,user:indivEle}) {
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
                    mainprop.actiony(0,prop.user)
                }} alignStart special />
                <Line />
                <MyCell text="Edit" ocl={()=>{
                    mainprop.actiony(1,prop.user)
                }} alignStart special/>
                <Line />
                <MyCell text="Deactivate" ocl={()=>{
                    mainprop.actiony(2,prop.user)
                }} alignStart special />
            </div>
        </div>
    }

    function MyCell(prop:{text:string,isBold?:boolean,alignStart?:boolean,ocl?:()=>void, special?:boolean}) {
        return <div className="ctr" style={{
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

    function OlnBtnPlus(prop:{text:string,ocl:()=>void}) {
        return <div className="hlc" style={{
            border: `solid ${mye.mycol.primarycol} 1px`,
            padding:9,
            borderRadius:10,
            width:120
        }}>
            <LrText 
            left={<mye.Tv text={prop.text} wrapit={false} color={mye.mycol.primarycol}/>}
            right={<Add className="icon" />}
            />
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

