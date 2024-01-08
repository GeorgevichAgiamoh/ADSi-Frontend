

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
        return this.data['mname']
    }
    getEmail(){
        return this.data['eml']
    }
    getPhone(){
        return this.data['phn']
    }
}


export class memberGeneralinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return this.data['memid']
    }
    getGender(){
        return this.data['sex']
    }
    getMarital(){
        return this.data['marital']
    }
    getDob(){
        return this.data['dob']
    }
    getCountry(){
        return this.data['nationality']
    }
    getState(){
        return this.data['state']
    }
    getLga(){
        return this.data['lga']
    }
    getTown(){
        return this.data['town']
    }
    getAddr(){
        return this.data['addr']
    }
    getJob(){
        return this.data['job']
    }
    getNin(){
        return this.data['nin']
    }
    getkin_FirstName(){
        return this.data['kin_fname']
    }
    getkin_LastName(){
        return this.data['kin_lname']
    }
    getkin_MiddleName(){
        return this.data['kin_mname']
    }
    getkin_Type(){
        return this.data['kin_type']
    }
    getkin_phone(){
        return this.data['kin_phn']
    }
    getkin_Addr(){
        return this.data['kin_addr']
    }
    getkin_Email(){
        return this.data['kin_eml']
    }    
}


export class memberFinancialinfo{
    data:any
    constructor(data:any){
        this.data = data
    }
    getMemberID(){
        return this.data['memid']
    }
    getBankCode(){
        return this.data['bnk']
    }
    getAccountNumber(){
        return this.data['anum']
    }
}