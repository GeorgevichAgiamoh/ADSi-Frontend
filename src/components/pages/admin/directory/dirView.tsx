import { useEffect } from "react"
import { Btn, Line, Mgin, appName, myEles, setTitle } from "../../../../helper/general"
import useWindowDimensions from "../../../../helper/dimension"
import { ArrowBack, FileOpenOutlined, PersonOutline } from "@mui/icons-material"
import { indivEle } from "../../../classes/classes"


export function AdminDirView(mainprop:{user:indivEle,backy:()=>void,approved:boolean}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)

    useEffect(()=>{
        setTitle(`View User - ${appName}`)
    },[])

    return <div style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <div id="clk" className="hlc" onClick={()=>{
            mainprop.backy()
        }}>
            <ArrowBack className="icon" />
            <Mgin right={10} />
            <mye.HTv text="Go Back" size={14} />
        </div>
        <Mgin top={20} />
        <div className="hlc">
            <PersonOutline style={{
                fontSize:20,
                color:mye.mycol.secondarycol
            }} />
            <Mgin right={10} />
            <mye.HTv size={14} text="Personal Information" color={mye.mycol.secondarycol} />
        </div>
        <Mgin top={20} />
        <div id="lshdw" className="vlc" style={{
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            boxSizing:'border-box',
            padding:dimen.dsk?20:10
        }}>
            {mainprop.approved?<div className="hlc" style={{
                alignSelf:'flex-end'
            }}>
                <Btn txt="APPROVE" onClick={()=>{

                }} width={120} />
                <Mgin right={20}/>
                <Btn txt="EDIT" onClick={()=>{

                }} width={120} outlined/>
            </div>:<div className="hlc" style={{
                alignSelf:'flex-end'
            }}>
                <Btn txt="EDIT" onClick={()=>{

                }} width={120} outlined/>
                <Mgin right={20}/>
                 <Btn txt="DEACTIVATE" onClick={()=>{

                }} width={120} bkg={mye.mycol.red} />
            </div>}
            <Mgin top={20} />
            <div style={{
                width:'100%',
                display:dimen.dsk?'flex':undefined,
                alignItems:'center'
            }}>
                <div className="flexi" style={{
                    flex:dimen.dsk?1:undefined,
                }}>
                    <InfoLay sub="First Name" main={mainprop.user.fName} />
                    <InfoLay sub="Middle Name" main={mainprop.user.mName} />
                    <InfoLay sub="Last Name" main={mainprop.user.lName} />
                    <InfoLay sub="Member Id" main={mainprop.user.memId} />
                    <InfoLay sub="Phone Number" main={mainprop.user.phone} />
                    <InfoLay sub="Gender" main={mainprop.user.gender} />
                    <InfoLay sub="DOB" main={mainprop.user.dob} />
                    <InfoLay sub="Email" main={mainprop.user.email} />
                    <InfoLay sub="Residential Address" main={mainprop.user.address} />
                    <InfoLay sub="Country" main={mainprop.user.country} />
                    <InfoLay sub="State" main={mainprop.user.state} />
                    <InfoLay sub="City" main={mainprop.user.city} />
                </div>
                <Mgin right={dimen.dsk?20:0} top={dimen.dsk?0:20} />
                <Line vertical={dimen.dsk} col={mye.mycol.btnstrip} height={200}/>
                <Mgin right={dimen.dsk?20:0} top={dimen.dsk?0:20} />
                <div className="flexi" style={{
                    flex:dimen.dsk?1:undefined,
                }}>
                    <InfoLay sub="Account Name" main={mainprop.user.getFinancialInfo().acctName} />
                    <InfoLay sub="Account Number" main={mainprop.user.getFinancialInfo().acctNum} />
                    <InfoLay sub="Bank" main={mainprop.user.getFinancialInfo().bank} />
                    <InfoLay sub="Date of Initial Registration" main={'29/01/2016'} />
                    <div style={{
                        width:'100%',
                        marginTop:dimen.dsk?20:20,
                        marginRight:10
                    }}>
                        <mye.Tv text={'Upload Document'} color={mye.mycol.imghint} size={12} />
                        <Mgin top={5} />
                        <div className="hlc">
                            <FileOpenOutlined style={{
                                fontSize:20,
                                color:mye.mycol.secondarycol
                            }} />
                            <Mgin right={5} />
                            <mye.Tv text={"Driver's License.jpeg"} size={14} />
                        </div>
                        <Mgin top={5} />
                        <div className="hlc">
                            <FileOpenOutlined style={{
                                fontSize:20,
                                color:mye.mycol.secondarycol
                            }} />
                            <Mgin right={5} />
                            <mye.Tv text={"CooperativeID.jpeg"} size={14} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    function InfoLay(prop:{sub:string, main:string}) {
        return <div style={{
            minWidth:dimen.dsk?120:100,
            marginTop:dimen.dsk?20:20,
            marginRight:10
        }}>
            <mye.Tv text={prop.sub} color={mye.mycol.imghint} size={12} />
            <Mgin top={5} />
            <mye.Tv text={prop.main} size={16} />
        </div>
    }

}