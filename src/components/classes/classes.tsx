
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