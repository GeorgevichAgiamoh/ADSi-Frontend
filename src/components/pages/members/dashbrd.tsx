import { PersonOutline, SavingsOutlined, VolumeUpOutlined, ArrowRightOutlined, Close, AttachFile, Mail, PieChart } from "@mui/icons-material";
import { useState, useEffect } from "react";
import useWindowDimensions from "../../../helper/dimension";
import { myEles, setTitle, appName, Mgin, LrText, BtnIcn, icony, IconBtn, Btn } from "../../../helper/general";
import { annEle } from "../../classes/classes";
import { memberBasicinfo, memberGeneralinfo } from "../../classes/models";
import { useNavigate } from "react-router-dom";





export function MemberDashboard(mainprop:{mbi:memberBasicinfo,mgi?:memberGeneralinfo}){
    const navigate = useNavigate()
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
        <LrText 
        left={<div>
            <mye.HTv text={`Hello, ${mainprop.mbi.getFirstName()}`} size={26} color={mye.mycol.primarycol} />
            <Mgin top={20} />
            <mye.Tv text="Welcome to your dashboard" />
        </div>}
        right={<Btn txt={`${mainprop.mgi?'EDIT':'VERIFY'} PROFILE`} width={150}  onClick={()=>{
            navigate('/completeprofile')
        }} bkg={mainprop.mgi?mye.mycol.btnstrip:mye.mycol.primarycol} tcol={mainprop.mgi?mye.mycol.primarycol:mye.mycol.white} /> }
        />
        <Mgin top={30} />
        <div id="lshdw" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?40:20,
            boxSizing:'border-box',
            width:'100%'
        }}>
            <div className="hlc">
                <SavingsOutlined style={{
                    fontSize:25,
                    color: mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.BTv text="Share Capital" size={20} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={30} />
            <LrText 
            left={<mye.Tv text="Invest with a minimum of N10,000 and start reaping the benefits" />}
            right={<div className="hlc">
                <mye.Tv text="Pay" color={mye.mycol.primarycol} onClick={()=>{

                }} />
                <Mgin right={20} />
                <mye.Tv text="View" onClick={()=>{

                }} />
            </div>}
            />
        </div>
        <Mgin top={20} />
        <div id="lshdw" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?40:20,
            boxSizing:'border-box',
            width:'100%'
        }}>
            <div className="hlc">
                <SavingsOutlined style={{
                    fontSize:25,
                    color: mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.BTv text="Annual Dues Payment" size={20} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={30} />
            <LrText 
            left={<mye.Tv text="Next Dues payment of N12,000 is due for 1st Jan 2025" />}
            right={<div className="hlc">
                <mye.Tv text="Pay" color={mye.mycol.primarycol} onClick={()=>{

                }} />
            </div>}
            />
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
             <div id="clk" className="hlc" onClick={()=>{

             }}>
                <mye.HTv text="View Announcements" color={mye.mycol.primarycol} size={12} />
                <Mgin right={10} />
                <ArrowRightOutlined className="icon" />
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

}