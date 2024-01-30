import { format } from "date-fns"
import { mCountry, mLga, mState } from "monagree-locs"
import { formatMemId, myEles } from "../../helper/general"
import { mBanks } from "monagree-banks"


export class memberBasicinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return formatMemId(this.data['memid'])
    }
    getFirstName(){
        return this.data['fname']
    }
    getlastName(){
        return this.data['lname']
    }
    getMiddleName(){
        return this.data['mname'] ?? defVal
    }
    getEmail(){
        return this.data['eml'] ?? defVal
    }
    getPhone(){
        return this.data['phn']
    }
    isVerified(){
        return this.data['verif']=='1'
    }
    isDeleted(){
        return this.data['verif']=='2'
    }
    isPaid(){ //One time reg fee
        return this.data['pay']=='1'
    }

    //---CUSTOM
    getFullName(){
        return this.getFirstName()+' '+this.getlastName()
    }
}

export const defVal = 'NIL'

export class memberGeneralinfo{
    data:any
    basicData?:memberBasicinfo
    finData?:memberFinancialinfo
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return !this.data?defVal:formatMemId(this.data['memid'])
    }
    getGender(){
        return !this.data?defVal:this.data['sex']
    }
    getMarital(){
        return !this.data?defVal:this.data['marital']
    }
    getDob(){
        return !this.data?defVal:this.data['dob']
    }
    isLocsCustom(){
        return mCountry.getCountryByCode(this.getCountry()) == undefined
    }
    getCountry(){
        return !this.data?defVal:this.data['nationality']
    }
    getState(){
        return !this.data?defVal:this.data['state']
    }
    getLga(){
        return !this.data?defVal:this.data['lga']
    }
    getTown(){
        return !this.data?defVal:this.data['town']
    }
    getAddr(){
        return !this.data?defVal:this.data['addr']
    }
    getJob(){
        return !this.data?defVal:this.data['job']
    }
    getkin_FirstName(){
        return !this.data?defVal:this.data['kin_fname']
    }
    getkin_LastName(){
        return !this.data?defVal:this.data['kin_lname']
    }
    getkin_MiddleName(){
        return !this.data?defVal:this.data['kin_mname']
    }
    getkin_Type(){
        return !this.data?defVal:this.data['kin_type']
    }
    getkin_phone(){
        return !this.data?defVal:this.data['kin_phn']
    }
    getkin_Addr(){
        return !this.data?defVal:this.data['kin_addr']
    }
    getkin_Email(){
        return !this.data?defVal:this.data['kin_eml']
    }
    //--Custom
    setBasicData(basicData:memberBasicinfo){
        this.basicData = basicData;
    }
    setFinData(finData:memberFinancialinfo){
        this.finData = finData
    }

    isPrepared(){
        return this.basicData!=null && this.finData!=null
    }


    getFormattedDOB(){
        return  !this.data?defVal:format(new Date(parseFloat(this.getDob())), 'dd/MM/yy')
    }
    getFormattedCountry(){
        return !this.data?defVal:mCountry.getCountryByCode(this.getCountry())!.getName()
    }
    getFormattedState(){
        return !this.data?defVal:mState.getStateByCode(this.getCountry(),this.getState())!.getName()
    }
    getFormattedLGA(){
        return !this.data?defVal:mLga.getLgaByCode(this.getCountry(),this.getState(),this.getLga())!.getName()
    }
    
}


export class memberFinancialinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return !this.data?defVal:formatMemId(this.data['memid'])
    }
    getBankCode(){
        return !this.data?defVal:this.data['bnk']
    }
    getAccountNumber(){
        return !this.data?defVal:this.data['anum']
    }
    getAccountName(){
        return !this.data?defVal:this.data['aname']
    }

    //--- Custom

    getFormattedbank(){
        return !this.data?defVal:mBanks.getBankByCode(this.getBankCode())!.name
    }
}

export class highlightEle{
    data:any
    constructor(data:any){
        this.data = data
    }
    getTotalUsers(){
        return this.data['totalUsers']
    }
    getTotalMales(){
        return this.data['totalMales']
    }
    getTotalFemales(){
        return this.data['totalFemales']
    }
}


export class annEle{
    data:any
    constructor(data:any){
        this.data = data
    }
    getTitle(){
        return this.data['title']
    }
    getMsg(){
        return this.data['msg']
    }
    getTime(){
        return format(new Date(parseFloat(this.data['time'])),'dd/MM/yy')
    }
}


export class verifStat{
    data:any
    constructor(data:any){
        this.data = data
    }
    getTotalVerified(){
        return this.data['totalVerified']
    }
    getTotalUnverified(){
        return this.data['totalUnverified']
    }
    getTotalDeleted(){
        return this.data['totalDeleted']
    }
}

export function getCreatedTime(data:any,includeTime?:boolean){
    const ct = data['created_at'] as string
    const createdAtDate = new Date(ct);
    const formattedDate = format(createdAtDate, 'dd/MM/yy');
    const formattedTime = format(createdAtDate, 'HH:mm:ss');
    return includeTime?formattedDate+' '+formattedTime:formattedDate
}


export class payRecordEle{
    data:any
    constructor(data:any){
        console.log(data)
        this.data = data
    }
    getMemId(){
        return this.data['memid']
    }
    getRef(){
        return this.data['ref']
    }
    getName(){
        return this.data['name']
    }
    getTime(){
        return this.data['time']
    }
    //---NULLABLE
    getYear(){
        return this.data['year']
    }
    getShares(){
        return this.data['shares']
    }
    //--CUSTOM
    getAmt(){
        return (this.getRef() as string).split('-')[2]
    }
    getReceiptId(){
        return (this.getRef() as string).split('-')[4]
    }
    getPayTypeId(){
        return (this.getRef() as string).split('-')[1]
    }
    getInterval(){
        return this.getPayTypeId()=='0'?'One Time':this.getPayTypeId()=='1'?'Annual':'None'
    }
    getType(){
        return this.getPayTypeId()=='0'?'Reg Fee':this.getPayTypeId()=='1'?'Annual Fee':'Investment'
    }
    getDate(){
        return format(new Date(parseFloat(this.getTime())),'dd/MM/yy')
    }
    getColor(mye:myEles){
        return this.getPayTypeId()=='2'?mye.mycol.secondarycol:mye.mycol.primarycol
    }
}


export class adsiInfoEle{
    data:any
    constructor(data:any){
        this.data = data
    }
    getName(){
        return this.data['cname']
    }
    getRegNo(){
        return this.data['regno']
    }
    getAddr(){
        return this.data['addr']
    }
    isLocsCustom(){
        return mCountry.getCountryByCode(this.getNationality()) == undefined
    }
    getNationality(){
        return this.data['nationality']
    }
    getState(){
        return this.data['state']
    }
    getLga(){
        return this.data['lga']
    }
    getAccountName(){
        return this.data['aname']
    }
    getAccountNumber(){
        return this.data['anum']
    }
    getBankCode(){
        return this.data['bnk']
    }
    getPersonalName(){
        return this.data['pname']
    }
    getPersonalEmail(){
        return this.data['peml']
    }
    getPersonalPhone(){
        return this.data['pphn']
    }
    getPersonalAddr(){
        return this.data['paddr']
    }
    //-- CUSTOM
    getFormattedbank(){
        return mBanks.getBankByCode(this.getBankCode())!.name
    }
}



export class adminUserEle{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemId(){
        return this.data['memid'].toString()
    }
    getLastName(){
        return this.data['lname']
    }
    getOtherNames(){
        return this.data['oname']
    }
    getEmail(){
        return this.data['eml']
    }
    getRole(){
        return this.data['role']
    }
    getPerm(permId:string){
        return this.data[permId]
    }
    //-- CUSTOM
    getNames(){
        return this.getOtherNames()+' '+this.getLastName()
    }
    getFormattedRole(){
        if(this.getRole()=='1'){
            return 'Accountant'
        }
        return 'Admin'
    }
}

export class permHelp{
    name:string;
    id:string;
    val:string;
    constructor(name:string,id:string){
        this.name = name
        this.id = id
        this.val = '0'
    }
}



export class fileEle{
    data:any
    constructor(data:any){
        this.data = data
    }
    getName(){
        return this.data['file']
    }
    getFolder(){
        return this.data['folder']
    }
}


export class payStat{
    data:any
    constructor(data:any){
        this.data = data
    }
    getTotal(){
        return this.data['total']
    }
    getCount(){
        return this.data['count']
    }
}

