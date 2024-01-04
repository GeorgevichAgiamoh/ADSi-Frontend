import { ArrowBack, PersonOutline, CalendarMonth, AccountBalance } from "@mui/icons-material"
import { ICountry, IState, ICity, Country, State, City } from "country-state-city"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, EditTextFilled, LrText, DatePicky, Btn } from "../../../../helper/general"


export function AdminDirAdd(mainprop:{backy:()=>void}){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const myKey = Date.now()
    const[fname, setFname] = useState('')
    const[mname, setMname] = useState('')
    const[lname, setLname] = useState('')
    const[memID, setMemID] = useState('')
    const[phn, setPhn] = useState('')
    const[eml, setEml] = useState('')
    const[addr, setAddr] = useState('')
    const[acctName, setAcctname] = useState('')
    const[acctNum, setAcctNum] = useState('')
    const[bank, setBank] = useState('')

    const[gender, setGender] = useState('Male')
    const[country, setCountry] = useState<ICountry>()
    const[state, setState] = useState<IState>()
    const[city, setCity] = useState<ICity>()

    const[dob, setDOB] = useState<Date>()
    const[askdob, setAskDOB] = useState(false)
    const[focusMonth, setFocusMonth] = useState<Date>()


    useEffect(()=>{
        setTitle(`Add User - ${appName}`)
    },[])

    function gimmeWidth(long?:boolean){
        return dimen.dsk?long?'450px':'300px':'100%'
    }

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
        <div id="lshdw" style={{
            backgroundColor: mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10
        }}>
            <div className="hlc">
                <PersonOutline style={{
                    fontSize:20,
                    color:mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.HTv size={14} text="Personal Information" color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="First Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Grey" min={6} value={fname} recv={(v)=>{
                        setFname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Middle Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Amarchi" min={6} value={mname} recv={(v)=>{
                        setMname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Last Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Adamma" min={6} value={lname} recv={(v)=>{
                        setLname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Member ID" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00000000" min={6} value={memID} recv={(v)=>{
                        setMemID(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Phone Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="09193282737" min={6} value={phn} recv={(v)=>{
                        setPhn(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Gender" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={gender} onChange={(e)=>{
                        setGender(e.target.value)
                    }}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Date of Birth" />
                    <Mgin top={5}/>
                    <div style={{
                        width:'100%',
                        height:45,
                        borderRadius:8,
                        backgroundColor:mye.mycol.btnstrip,
                        padding:10,
                        boxSizing:'border-box',
                        position:'relative'
                    }} >
                        <LrText 
                        left={<div id="clk" onClick={()=>{
                            setAskDOB(true)
                        }}><mye.Tv text={dob?format(dob,'dd-MM-yy'):'DD/MM/YY'} /></div>}
                        right={<CalendarMonth id="clk" style={{
                            fontSize:20,
                            color:mye.mycol.secondarycol
                        }} onClick={()=>{
                            setAskDOB(true)
                        }}/>}
                        />
                        <div style={{
                            display:askdob?undefined:'none',
                            position:'absolute',
                            top:0,
                            right:0,
                            zIndex:2,
                            pointerEvents:'auto'
                        }}>
                            <DatePicky rdy={(d)=>{
                                setAskDOB(false)
                                setDOB(d)
                            }} closy={()=>{
                                setAskDOB(false)
                            }}/>
                        </div>
                    </div>
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Email" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Example@gmail.com" min={6} eml value={eml} recv={(v)=>{
                        setEml(v)
                    }} />
                </div>
                <div style={{
                    width:'100%',
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Residential Address" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="A place on earth" min={6} value={addr} recv={(v)=>{
                        setAddr(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Country" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={country?.isoCode || ''} onChange={(e)=>{
                        const ele = Country.getCountryByCode(e.target.value)
                        console.log(ele?.latitude+', '+ele?.longitude)
                        setCountry(ele)
                    }}>
                        {
                            Country.getAllCountries().map((ele, index)=>{
                                return <option key={myKey+index+10000} value={ele.isoCode}>{ele.name}</option>
                            })
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="State" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={state?.isoCode||''} onChange={(e)=>{
                        if(country){
                            const ele = State.getStateByCodeAndCountry(e.target.value,country!.isoCode)
                            console.log(ele?.latitude+', '+ele?.longitude)
                            setState(ele)
                        }
                        
                    }}>
                        {
                            country?State.getStatesOfCountry(country!.isoCode).map((ele, index)=>{
                                return <option key={myKey+index+1000} value={ele.isoCode}>{ele.name}</option>
                            }):<option value="option1">Choose Country First</option>
                        }
                    </select>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="City" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={city?.name||''} onChange={(e)=>{
                        if(country && state){
                            const ele = City.getCitiesOfState(country!.isoCode,state!.isoCode).find((ele)=> ele.name == e.target.value)
                            console.log(ele?.latitude+', '+ele?.longitude)
                            setCity(ele)
                        }
                    }}>
                        {
                            (country&& state)?City.getCitiesOfState(country!.isoCode,state!.isoCode).map((ele, index)=>{
                                return <option key={myKey+index+100} value={ele.name}>{ele.name}</option>
                            }):<option value="option1">Choose Country & State First</option>
                        }
                    </select>
                </div>
            </div>
            <Mgin top={60} />
            <div className="hlc">
                <AccountBalance style={{
                    fontSize:20,
                    color:mye.mycol.secondarycol
                }} />
                <Mgin right={10} />
                <mye.HTv size={14} text="Account Details" color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:'100%',
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Account Name" min={6} value={acctName} recv={(v)=>{
                        setAcctname(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00000000000" digi min={7} max={12} value={acctNum} recv={(v)=>{
                        setAcctNum(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(true),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Bank" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00" min={6} value={bank} recv={(v)=>{
                        setAcctname(v)
                    }} />
                </div>
            </div>
            <Mgin top={50}/>
            <Btn txt="ADD" onClick={()=>{

            }} width={200} />
        </div>
    </div>

}
