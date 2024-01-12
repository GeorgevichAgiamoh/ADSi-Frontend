import { format } from "date-fns"
import { mCountry } from "monagree-locs"
import { banks_and_codes } from "../../helper/general"


export class memberBasicinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return this.data['memid']
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
        return !this.data?defVal:this.data['memid']
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
    getNin(){
        return !this.data?defVal:this.data['nin']
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
        return !this.data?defVal:mCountry.getCountryByCode(this.getState())!.getName()
    }
    getFormattedLGA(){
        return !this.data?defVal:mCountry.getCountryByCode(this.getLga())!.getName()
    }
    
}


export class memberFinancialinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return !this.data?defVal:this.data['memid']
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
        return !this.data?defVal:banks_and_codes[this.getBankCode()]
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
}

export function getCreatedTime(data:any,includeTime?:boolean){
    const ct = data['created_at'] as string
    const createdAtDate = new Date(ct);
    const formattedDate = format(createdAtDate, 'dd/MM/yy');
    const formattedTime = format(createdAtDate, 'HH:mm:ss');
    return includeTime?formattedDate+' '+formattedTime:formattedDate
}
