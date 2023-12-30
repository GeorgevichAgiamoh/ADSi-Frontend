import { PersonOutline, SavingsOutlined, VolumeUpOutlined, ArrowRightOutlined, Close, AttachFile, Mail, PieChart } from "@mui/icons-material";
import { useState, useEffect } from "react";
import useWindowDimensions from "../../../helper/dimension";
import { myEles, setTitle, appName, Mgin, LrText, BtnIcn, icony, IconBtn } from "../../../helper/general";
import { annEle } from "../../classes/classes";





export function AdminDashboard(){
    const mye = new myEles(false);
    const myKey = Date.now()
    const dimen = useWindowDimensions();
    const[showNewAnn, setShowNewAnn] = useState(false)
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
            alignItems:'center'
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
             left={<div id="clk" className="hlc" onClick={()=>{

             }}>
                <mye.HTv text="View All" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             right={<div id="clk" className="hlc" onClick={()=>{
                setShowNewAnn(true)
             }}>
                <mye.HTv text="Make Announcement" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
             </div>}
             />
        </div>

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
            <NewAnn />
        </div>
    </div>

    function NewAnn(){
        const[atitle, setATitle] = useState('')
        const[amsg, setAMsg] = useState('')

        return <div style={{
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
                <input className="tinp"
                    type="text"
                    value={amsg}
                    placeholder="Type message here"
                    onChange={(e)=>{
                        setAMsg(e.target.value)
                    }}
                    style={{
                        flex:1,
                        width:'100%'
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
                    <IconBtn icon={Mail} mye={mye} text="SUBMIT" ocl={()=>{
                        
                    }} />
                </div>
            </div>
        </div>

    }

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