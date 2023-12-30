import { useEffect, useState } from "react";
import useWindowDimensions from "../../helper/dimension";
import { LrText, Mgin, appName, icony, myEles, setTitle } from "../../helper/general";
import { AdminNav } from "./nav";
import { Announcement, ArrowDropDown, ArrowRightAltRounded, ArrowRightOutlined, ArrowRightRounded, Menu, NotificationImportant, NotificationsActive, NotificationsActiveOutlined, PersonOutline, PieChart, SavingsOutlined, VolumeUpOutlined } from "@mui/icons-material";
import dp from "../../assets/dp.png"
import { annEle } from "../classes/classes";


export function Admin(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[showNav, setShowNav] = useState(false)
    const[tabPos, setTabPos] = useState(0)
    const tabs = [
        'Overview',
        'Directory',
        'Payments',
        'Messages',
        'Settings',
        'Logout'
    ]

    return <div style={{
        width: dimen.width,
        height: dimen.height
    }}>
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
                    {<AdminDashboard />}
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
                setShowNav(false)
                setTabPos(pos)
            }} showy={()=>{
                setShowNav(false)
            }}  />
        </div>
    </div>

}


export function AdminDashboard(){
    const mye = new myEles(false);
    const myKey = Date.now()
    const dimen = useWindowDimensions();
    const anns = [
        new annEle("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit temporibus tempore vero quo nemo? Provident aperiam tenetur ut illo laborum. Suscipit sint beatae ad modi eveniet cumque cum. Nostrum, asperiores?",
        "28/02/21"),
        new annEle("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit temporibus tempore vero quo nemo? Provident aperiam tenetur ut illo laborum. Suscipit sint beatae ad modi eveniet cumque cum. Nostrum, asperiores?",
        "28/02/21"),
        new annEle("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit temporibus tempore vero quo nemo? Provident aperiam tenetur ut illo laborum. Suscipit sint beatae ad modi eveniet cumque cum. Nostrum, asperiores?",
        "28/02/21"),
        new annEle("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit temporibus tempore vero quo nemo? Provident aperiam tenetur ut illo laborum. Suscipit sint beatae ad modi eveniet cumque cum. Nostrum, asperiores?",
        "28/02/21"),
    ]

    useEffect(()=>{
        setTitle(`Admin Dashboard - ${appName}`)
    },[])

    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <Mgin top={20} />
        <mye.BTv text="Hello Admin" size={26} color={mye.mycol.primarycol} />
        <Mgin top={20} />
        <mye.Tv text="Good morning, welcome to your dashboard" />
        <Mgin top={30} />
        <div style={{
            display:'flex',
            width:'100%',
            flexWrap:'wrap',
            alignItems:'center',
            justifyContent:'center'
        }}>
            <Tab1 icon={PersonOutline} title="Members" value="10000" color={mye.mycol.primarycol} />
            <Tab1 icon={SavingsOutlined} title="Total Revenue" value="10,000,000" color={mye.mycol.hs_blue} />
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
             left={<div className="hlc" onClick={()=>{

             }}>
                <mye.HTv text="View All" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             right={<div className="hlc" onClick={()=>{
                
             }}>
                <mye.HTv text="Make Announcement" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             />
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
                    flex:1,
                    boxSizing:'border-box',
                    paddingRight:20
                }}>
                    <mye.Tv text={prop.ele.getMessage()} color={mye.mycol.imghint} maxLines={2} size={12} />
                </div>
                <div style={{
                    flex:1,
                }}>
                    <LrText 
                    left={<mye.Tv text={prop.ele.getDate()} size={12} color={mye.mycol.primarycol} />}
                    right={<mye.Tv text={'View'} size={12} color={mye.mycol.primarycol} onClick={()=>{

                    }} />}
                    />
                </div>
            </div>
            <Mgin top={10} />
            <div style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.1)'}}></div>
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

    function Tab2() {
        
        return <div id="lshdw" style={{
            width: dimen.dsk?300:'100%',
            margin: dimen.dsk?20:'10px 0px',
            height:150,
            boxSizing:'border-box',
            position:'relative',
            borderRadius:5,
            backgroundColor:mye.mycol.btnstrip5,
        }}>
            <PieChart style={{
                fontSize:100,
                color:mye.mycol.primarycol,
                position:'absolute',
                top:20,
                right:20
            }} />
            <div style={{
                position:'absolute',
                left:20,
                bottom:20
            }}>
                <div className="hlc">
                    <div style={{width:10,height:10,borderRadius:2,backgroundColor:mye.mycol.secondarycol}}></div>
                    <Mgin right={5} />
                    <mye.Tv text="Males" color={mye.mycol.primarycol} />
                    <Mgin right={10} />
                    <mye.Tv text="70%" color={mye.mycol.primarycol} />
                </div>
                <Mgin top={10}/>
                <div className="hlc">
                    <div style={{width:10,height:10,borderRadius:2,backgroundColor:mye.mycol.primarycol}}></div>
                    <Mgin right={5} />
                    <mye.Tv text="Females" color={mye.mycol.primarycol} />
                    <Mgin right={10} />
                    <mye.Tv text="30%" color={mye.mycol.primarycol} />
                </div>
            </div>
        </div>
    }
}