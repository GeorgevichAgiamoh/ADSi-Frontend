import { useEffect, useState } from "react"
import useWindowDimensions from "../../../helper/dimension"
import { Btn, IconBtn, LrText, Mgin, appName, icony, myEles, setTitle } from "../../../helper/general"
import { Add, CloudDownloadOutlined, Filter1Outlined, FilterOutlined, KeyboardArrowDown, ListAltOutlined, PersonOutline, SearchOutlined, SortOutlined } from "@mui/icons-material"
import { useScrollTrigger } from "@mui/material"


export function AdminDirectory(){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[search, setSearch] = useState('')
    const[showVerified, setShowVerified] = useState(true)

    useEffect(()=>{
        setTitle(`Directory - ${appName}`)
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
        <div id='lshdw' style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:10,
            boxSizing:'border-box'
        }}>
            <div className="hlc">
                <PersonOutline style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Individuals" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            
        </div>
    </div>

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