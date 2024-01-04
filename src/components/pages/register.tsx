import { useEffect, useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import coin from '../../assets/coin.png'
import thumb from '../../assets/thumbs.png'
import { MsgAlert } from "../../helper/adsi";
import useWindowDimensions from "../../helper/dimension";
import { myEles, setTitle, appName, Mgin, EditTextFilled, Btn } from "../../helper/general";



export function Register(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[fnane,setFName] = useState('')
    const[mnane,setMName] = useState('')
    const[lnane,setLName] = useState('')
    const[eml,setEml] = useState('')
    const[phn,setPhn] = useState('')
    const[pwd1,setPwd1] = useState('')
    const[pwd2,setPwd2] = useState('')
    const[memid,setMemid] = useState('')

    useEffect(()=>{
        setTitle(`Register - ${appName}`)
    },[])

    return <div className="vlc" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        <div className="vlc" style={{
            width:dimen.dsk?500:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <Mgin top={40} />
            <mye.HTv text="Create an Account" size={35} />
            <Mgin top={20} />
            <MsgAlert icon={InfoOutlined} mye={mye} msg="Fields marked * are compulsory" />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:'100%'
            }}>
                <div style={{
                    flex:1
                }}>
                    <mye.Tv text="*First Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="First Name" value={fnane} noSpace min={3} recv={(v)=>{
                        setFName(v)
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Middle Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Middle Name" value={mnane} noSpace min={3} recv={(v)=>{
                        setMName(v)
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Last Name" />
                    <Mgin top={5} />
                    <EditTextFilled hint="Last Name" value={lnane} noSpace min={3} recv={(v)=>{
                        setLName(v)
                    }} />
                </div>
            </div>,
            <Mgin top={5} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Email Address" />
                <Mgin top={5} />
                <EditTextFilled hint="Enter Email Address" value={eml} eml noSpace min={3} recv={(v)=>{
                    setEml(v)
                }} />
            </div>
            <Mgin top={5} />
            <mye.Tv text="For Verification purposes, please use official coorperative email address" color={mye.mycol.hint} size={12} />
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Phone Number" />
                <Mgin top={5} />
                <EditTextFilled hint="08012345678" value={phn} digi noSpace min={11} max={11} recv={(v)=>{
                    setPhn(v)
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Password" />
                <Mgin top={5} />
                <EditTextFilled hint="******" value={pwd1} min={6} pwd recv={(v)=>{
                    setPwd1(v)
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Confirm Password" />
                <Mgin top={5} />
                <EditTextFilled hint="******" value={pwd2} min={6} pwd recv={(v)=>{
                    setPwd2(v)
                }} />
            </div>
            <Mgin top={15} />
            <div style={{
                width:'100%'
            }}>
                <mye.Tv text="*Member ID" />
                <Mgin top={5} />
                <EditTextFilled hint="00000001" value={memid} min={8} max={8}digi recv={(v)=>{
                    setMemid(v)
                }} />
            </div>
            <Mgin top={35} />
            <Btn txt="CREATE ACCOUNT" onClick={()=>{
                //TODO implement
            }} />
            <Mgin top={20} />
            <div className="hlc">
                <mye.Tv text="Already have an account?" color={mye.mycol.primarycol} />
                <Mgin right={10} />
                <mye.Tv text="Sign In" color={mye.mycol.primarycol} onClick={()=>{
                    //TODO Login
                }} />
            </div>
        </div>

    </div>

}



export function MakePayment(){
    const mye = new myEles(false);
    const dimen = useWindowDimensions();
    const[shares,setShares] = useState('')
    const[amt, setAmt] = useState('')
    const[paySuccess, setPaySuccess] = useState(false)

    useEffect(()=>{
        setTitle(`Make Payment - ${appName}`)
    },[])

    return <div className="ctr" style={{
        width:dimen.width,
        height:dimen.height
    }}>
        {paySuccess?<div className="vlc" style={{
            width:dimen.dsk?300:'100%',
            padding:dimen.dsk?0:20,
            boxSizing:'border-box'
        }}>
            <img src={thumb} alt="Payments" height={100} />
            <Mgin top={30} />
            <mye.BTv text="Payment Successful" size={22} />
            <Mgin top={30} />
            <Btn txt="PROCEED TO DASHBOARD" onClick={()=>{

            }} />
            </div>:
        <div className="vlc" style={{
            width:dimen.dsk?500:dimen.width,
            padding:dimen.dsk?0:10,
            boxSizing:'border-box'
        }}>
            <img src={coin} alt="Payments" height={100} />
            <Mgin top={30}/>
            <mye.HTv text="You are required to pay the following"  />
            <Mgin top={10}/>
            <mye.Tv text="1. Membership Registration: N5000 (One-time payment)" />
            <Mgin top={5} />
            <mye.Tv text="2. Thrift (annual Dues): N1000 monthly (N12,000 paid annually)" />
            <Mgin top={5} />
            <mye.Tv text="3. Share Capital: Minimum of 1000 shares @ N10 per share" />
            <Mgin top={20} />
            <div className="hlc" style={{
                width:'100%'
            }}>
                <div style={{
                    flex:1
                }}>
                    <mye.Tv text="*Shares" />
                    <Mgin top={5} />
                    <EditTextFilled hint="1000" value={shares} noSpace digi recv={(v)=>{
                        setShares(v)
                    }} />
                </div>
                <div style={{
                    flex:1,
                    marginLeft:20
                }}>
                    <mye.Tv text="*Amount To Pay" />
                    <Mgin top={5} />
                    <div style={{
                        width:'100%',
                        boxSizing:'border-box',
                        padding:'15px 20px',
                        backgroundColor: mye.mycol.btnstrip,
                        borderRadius:10
                    }}>
                        <mye.Tv  text={amt.length!==0?amt:"Auto Calculated"} size={16} color={mye.mycol.hint}/>
                    </div>
                </div>
            </div>,
            <Mgin top={35} />
            <Btn txt="PAY" onClick={()=>{
                setPaySuccess(true)
            }} />
        </div>}
    </div>

}


