
// Announcement
export class annEle{
    msg:string;
    date:string;
    constructor(msg:string,date:string){
        this.msg = msg;
        this.date = date;
    }
    getMessage(){
        return this.msg;
    }
    getDate(){
        return this.date;
    }
}

//Individuals
export class indivEle{
    memId:string
    fName:string
    lName:string
    mName:string
    gender:string
    dob:string
    phone:string
    email:string
    address:string
    country:string
    state:string
    city:string

    constructor(memId:string,
        fName:string,
        lName:string,
        mName:string,
        gender:string,
        dob:string,
        phone:string,
        email:string,
        address:string,
        country:string,
        state:string,
        city:string){
            this.memId = memId
            this.fName = fName
            this.lName = lName
            this.mName = mName
            this.gender = gender
            this.dob = dob
            this.phone = phone
            this.email = email
            this.address = address
            this.country = country
            this.state = state
            this.city = city
        }

    getFinancialInfo(){
        return new finInfoEle('Grey Akwani','0921616261','Sterling Bank')
    }
    
}

export class finInfoEle{
    acctName:string
    acctNum:string 
    bank:string 
    constructor(acctName:string, acctNum:string, bank:string ){
        this.acctName = acctName
        this.acctNum = acctNum
        this.bank = bank
    }
}

export class msgMeta{
    lastMsg:string 
    whosent:string
    whoreceived:string
    date:string
    constructor(lastMsg:string, whosent:string, whoreceived:string, date:string){
        this.lastMsg = lastMsg
        this.whosent = whosent
        this.whoreceived = whoreceived
        this.date = date
    } 
}