import { PersonOutline, FilterOutlined, SortOutlined, SearchOutlined, ListAltOutlined, CloudDownloadOutlined, ArrowBack, ArrowForward, MoreVert, Close, Add, KeyboardArrowDown, UploadOutlined, AccountBalance, PeopleOutline } from "@mui/icons-material"
import { useState, useEffect, useRef } from "react"
import useWindowDimensions from "../../../../helper/dimension"
import { myEles, setTitle, appName, Mgin, Btn, LrText, IconBtn, Line, icony, EditTextFilled, MyCB } from "../../../../helper/general"
import { adminUserEle, indivEle } from "../../../classes/classes"
import { mLoc } from "monagree-locs/dist/classes"
import { mCountry, mLga, mState } from "monagree-locs"



export function SettingsList(){
    const dimen = useWindowDimensions()
    const mye = new myEles(false)
    const[cuser, setCUser] = useState<adminUserEle>()
    const[showStage, setShowStage] = useState(0)
    const myKey = Date.now()
    const[optToShow,setOptToShow] = useState(-1)
    //Cooperative Info
    const[name,setName] = useState('')
    const[regNo,setRegNo] = useState('')
    const[logo,setLogo] = useState<File>()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const[addr,setAddr] = useState('')
    //Financial Info
    const[aname,setAName] = useState('')
    const[anum,setANum] = useState('')
    const[bank,setBank] = useState('')
    //Personal Info
    const[fullName,setFullName] = useState('')
    const[email,setEmail] = useState('')
    const[phn,setPhn] = useState('')
    const[paddr,setPAddr] = useState('')
    //Edit Staff
    const[fname,setFname] = useState('')
    const[lname,setLname] = useState('')
    const[eml,setEml] = useState('')
    const[sid,setSid] = useState('')
    const[role,setRole] = useState('')
    const[perms,setPerms] = useState<string[]>([])

    const permies = [
        'View Directory',
        'Edit Directory',
        'View Payments',
        'Verify Payments',
        'View Messages',
        'Edit Messages',
    ]
    

    const users = [
        new adminUserEle('Chinedu Anthony','chinedu@gmail.com',0),
        new adminUserEle('Melisa Grimmes','grimmes@gmail.com',1),
        
    ]
    

    const[country, setCountry] = useState<mLoc>()
    const[state, setState] = useState<mLoc>()
    const[city, setCity] = useState<mLoc>()

    useEffect(()=>{
        setTitle(`Settings - ${appName}`)
    },[])


    return <div className="vlc" style={{
        width:'100%',
        boxSizing:'border-box',
        padding:dimen.dsk?40:20
    }}>
        <div style={{
            width:350,
            display:'flex'
        }}>
            <div style={{
                flex:1
            }}>
                <Btn txt="Account" round onClick={()=>{
                    setShowStage(0)
                }} transparent={showStage!=0} />
            </div>
            <Mgin right={20} />
            <div style={{
                flex:1
            }}>
                <Btn txt="Identity Management" round onClick={()=>{
                    setShowStage(1)
                }} transparent={showStage==0}/>
            </div>
        </div>
        <Mgin top={15} />
        {showStage==0?<div id='lshdw' style={{
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
                <mye.HTv text="Cooperative Information" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Cooperative Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Cooperative Name" min={6} value={name} recv={(v)=>{
                        setName(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Registration No." />
                    <Mgin top={5}/>
                    <EditTextFilled hint="00/0000" min={6} value={regNo} recv={(v)=>{
                        setRegNo(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Cooperative Logo" />
                    <Mgin top={5}/>
                    <div style={{
                        width:'100%',
                        height:45,
                        borderRadius:10,
                        backgroundColor:mye.mycol.btnstrip
                    }}>
                        <LrText 
                        left={<mye.Tv text={logo?logo.name:'Please upload Logo'} />}
                        right={<div>
                                <input
                                    type="file"
                                    onChange={(e)=>{
                                        const file = e.target.files?.[0];
                                        if(file){
                                            setLogo(file)
                                        }
                                    }}
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                />
                                <IconBtn icon={UploadOutlined} mye={mye} text="Upload" ocl={()=>[
                                    fileInputRef.current?.click()
                                ]} />
                            </div>}
                        />
                    </div>
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Cooperative Address" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Cooperative Address" min={6} value={addr} recv={(v)=>{
                        setAddr(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Country" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={country?.getId() || ''} onChange={(e)=>{
                        const ele = mCountry.getCountryByCode(e.target.value)
                        setCountry(ele)
                    }}>
                        {
                            mCountry.getAllCountries().map((ele, index)=>{
                                return <option key={myKey+index+10000} value={ele.getId()}>{ele.getName()}</option>
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
                    <select id="dropdown" name="dropdown" value={state?.getId()||''} onChange={(e)=>{
                        if(country){
                            const ele = mState.getStateByCode(country!.getId(),e.target.value)
                            setState(ele)
                        }
                        
                    }}>
                        {
                            country?mState.getStatesByCountry(country!.getId()).map((ele, index)=>{
                                return <option key={myKey+index+1000} value={ele.getId()}>{ele.getName()}</option>
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
                    <select id="dropdown" name="dropdown" value={city?.getId()||''} onChange={(e)=>{
                        if(country && state){
                            const ele = mLga.getLgaByCode(country!.getId(),state!.getId(),e.target.value)
                            setCity(ele)
                        }
                    }}>
                        {
                            (country&& state)?mLga.getLgasByState(country!.getId(),state!.getId()).map((ele, index)=>{
                                return <option key={myKey+index+100} value={ele.getId()}>{ele.getName()}</option>
                            }):<option value="option1">Choose Country & State First</option>
                        }
                    </select>
                </div>
            </div>
            <div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <AccountBalance style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Cooperative Account Details" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Account Name" min={6} value={aname} recv={(v)=>{
                        setAName(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Account Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="1234567890" min={6} value={anum} recv={(v)=>{
                        setANum(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Bank" />
                    <Mgin top={5}/>
                    <select id="dropdown" name="dropdown" value={bank} onChange={(e)=>{
                        setBank(e.target.value)
                    }}>
                        <option value={'044'}>Access Bank</option>
                        <option value={'057'}>Zenith Bank</option>
                        <option value={'011'}>First Bank of Nigeria</option>
                        <option value={'058'}>Guaranty Trust Bank (GTBank)</option>
                        <option value={'033'}>United Bank for Africa (UBA)</option>
                        <option value={'221'}>Stanbic IBTC Bank </option>
                        <option value={'070'}>Fidelity Bank</option>
                        <option value={'032'}>Union Bank of Nigeria</option>
                        <option value={'214'}>First City Monument Bank (FCMB)</option>
                        <option value={'050'}>Ecobank Nigeria</option>
                        <option value={'232'}>Sterling Bank</option>
                        <option value={'076'}>Polaris Bank</option>
                        <option value={'082'}>Keystone Bank</option>
                        <option value={'035'}>Wema Bank</option>
                        <option value={'030'}>Heritage Bank</option>
                        <option value={'215'}>Unity Bank</option>
                        <option value={'301'}>Jaiz Bank</option>
                    </select>
                </div>
            </div>
            <div className="hlc" style={{
                alignSelf:'flex-start'
            }}>
                <PersonOutline style={{
                    color:mye.mycol.secondarycol,
                    fontSize:20
                }} />
                <Mgin right={10}/>
                <mye.HTv text="Personal Information" size={16} color={mye.mycol.secondarycol} />
            </div>
            <Mgin top={20} />
            <div className="flexi">
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Full Name" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Full Name" min={6} value={fullName} recv={(v)=>{
                        setFullName(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Email" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Example@gmail.com" min={6} value={email} recv={(v)=>{
                        setEmail(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Phone Number" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="0817265252" min={11} max={11} value={phn} digi recv={(v)=>{
                        setPhn(v)
                    }} />
                </div>
                <div style={{
                    width:gimmeWidth(),
                    margin:dimen.dsk?20:5
                }}>
                    <mye.Tv text="Address" />
                    <Mgin top={5}/>
                    <EditTextFilled hint="Some place in Nigeria" min={6} value={paddr} recv={(v)=>{
                        setPAddr(v)
                    }} />
                </div>
            </div>
            <Mgin top={20} />
            <Btn txt="SAVE" width={120} onClick={()=>{
                
            }} />
        </div>:showStage==1?<div className="vlc" id='lshdw' style={{
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
                <mye.HTv text="Identity Management" size={16} color={mye.mycol.secondarycol} />
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
                        <MyCell text="Email Address"  isBold/>
                        <MyCell text="Role"  isBold/>
                        <MyCell text="Action"  isBold/>
                    </div>
                    {
                        users.map((ele,index)=>{
                            return <div className="hlc" key={myKey+index}>
                                <MyCell text={(index+1).toString()} />
                                <MyCell text={ele.name} />
                                <MyCell text={ele.email} />
                                <MyCell text={ele.getRole()} />
                                <Opts index={index} user={ele} />
                            </div>
                        })
                    }
                </div>
            </div>
            <Mgin top={20} />
            <div style={{
                alignSelf:'flex-end'
            }}>
                <IconBtn icon={Add} mye={mye} text="Add Staff" ocl={()=>{

                }} />
            </div>
        </div>:<div id='lshdw' style={{
            width:'100%',
            backgroundColor:mye.mycol.white,
            borderRadius:10,
            padding:dimen.dsk?20:10,
            boxSizing:'border-box'
        }}>
                <div id="clk" className="hlc" onClick={()=>{
                    setShowStage(1)
                }}>
                    <ArrowBack className="icon" />
                    <Mgin right={10} />
                    <mye.HTv text="Go Back" size={14} />
                </div>
                <Mgin top={20} />
                <LrText
                    left={<div className="hlc">
                        <PersonOutline style={{
                            color:mye.mycol.secondarycol,
                            fontSize:20
                        }} />
                        <Mgin right={10}/>
                        <mye.HTv text="Identity Management" size={16} color={mye.mycol.secondarycol} />
                    </div>}
                    right={<Btn txt="Assign" outlined width={120} onClick={()=>{

                    }} />}
                />
                <Mgin top={20} />
                <div className="flexi">
                    <div style={{
                        width:gimmeWidth(true),
                        margin:dimen.dsk?20:5
                    }}>
                        <mye.Tv text="Name" />
                        <Mgin top={5}/>
                        <div style={{
                            width:'100%',
                            display:'flex'
                        }}>
                            <div style={{
                                flex:1
                            }}>
                                <EditTextFilled hint="Last Name" min={6} value={lname} recv={(v)=>{
                                    setLname(v)
                                }} />
                            </div>
                            <div style={{
                                flex:1
                            }}>
                                <EditTextFilled hint="Other Names" min={6} value={fname} recv={(v)=>{
                                    setFname(v)
                                }} />
                            </div>
                            
                        </div>
                    </div>
                    <div style={{
                        width:gimmeWidth(),
                        margin:dimen.dsk?20:5
                    }}>
                        <mye.Tv text="Email Address" />
                        <Mgin top={5}/>
                        <EditTextFilled hint="example@gmail.com" min={6} value={eml} recv={(v)=>{
                            setEml(v)
                        }} />
                    </div>
                    <div style={{
                        width:gimmeWidth(),
                        margin:dimen.dsk?20:5
                    }}>
                        <mye.Tv text="Assign ID" />
                        <Mgin top={5}/>
                        <EditTextFilled hint="00000000" min={6} value={sid} recv={(v)=>{
                            setSid(v)
                        }} />
                    </div>
                    <div style={{
                        width:gimmeWidth(),
                        margin:dimen.dsk?20:5
                    }}>
                        <mye.Tv text="Role" />
                        <Mgin top={5}/>
                        <select id="dropdown" name="dropdown" value={role} onChange={(e)=>{
                            setRole(e.target.value)
                        }}>
                            <option value={'0'}>Admin</option>
                            <option value={'1'}>Accountant</option>
                        </select>
                    </div>
                </div>
                <div className="hlc">
                    <PeopleOutline style={{
                        color:mye.mycol.secondarycol,
                        fontSize:20
                    }} />
                    <Mgin right={10}/>
                    <mye.HTv text="Permissions" size={16} color={mye.mycol.secondarycol} />
                </div>
                <Mgin top={20} />
                <div className="flexi">
                    <mye.Tv text="Directory" />
                    <Mgin right={10} />
                    <Permy index={0} />
                    <Mgin right={10} />
                    <Permy index={1} />
                </div>
                <Mgin top={20} />
                <div className="flexi">
                    <mye.Tv text="Payments" />
                    <Mgin right={10} />
                    <Permy index={2} />
                    <Mgin right={10} />
                    <Permy index={3} />
                </div>
                <Mgin top={20} />
                <div className="flexi">
                    <mye.Tv text="Mesages" />
                    <Mgin right={10} />
                    <Permy index={4} />
                    <Mgin right={10} />
                    <Permy index={5} />
                </div>
                
        </div>}
    </div>

    function updatePerms(id:string, rmv?:boolean){
        let nsel = [...perms]
        if(rmv){
            setPerms(nsel.filter(item=>item!==id))
        }else{
            nsel = nsel.filter(item=>item!==id)
            nsel.push(id)
            setPerms(nsel)
        }
    }

    function Permy(prop:{index:number}) {
        return <label style={{
            display:'flex',
            fontSize:12,

        }}>
            <MyCB checked={perms.includes(prop.index.toString())}  mye={mye} ocl={()=>{
                const id = prop.index.toString()
                updatePerms(id, perms.includes(id))
            }} noPadding />
            <Mgin right={10}/>
            {permies[prop.index]}
        </label>
    }

    function Opts(prop:{index:number,user:adminUserEle}) {
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
                    setCUser(prop.user)
                    setShowStage(2)
                }} alignStart special />
                <Line />
                <MyCell text="Edit" ocl={()=>{
                    
                }} alignStart special/>
                <Line />
                <MyCell text="Deactivate" ocl={()=>{
                    
                }} alignStart special />
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

    function gimmeWidth(long?:boolean){
        return dimen.dsk?long?'450px':'300px':'100%'
    }

}

