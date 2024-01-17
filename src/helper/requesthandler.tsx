import axios, { AxiosResponse } from "axios"



export const endpoint = 'http://127.0.0.1:8000/api'//https://api.adsicoop.com.ng/api

export function getACT(){
    return localStorage.getItem('adsi_act') ?? ''
  }

export class makeRequest{

    static post(path:string,data:any,finise:(task:resHandler)=>void,isAuth?:boolean){
        axios.post(`${endpoint}/${path}`, data, {headers:{
            "Content-Type":'application/json',
            Authorization:`Bearer ${getACT()}`
        }}).then(response => {
            finise(new resHandler(response,isAuth))
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Response:', error.response);
            finise(new resHandler(error.response))
        });
    }

    static get(path:string,params:any,finise:(task:resHandler)=>void){
        axios.get(`${endpoint}/${path}`,{params:params, headers:{
            "Content-Type":'application/json',
            Authorization:`Bearer ${getACT()}`
        }})
        .then(response => {
            finise(new resHandler(response))
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Response:', error.response);
            finise(new resHandler(error.response))
        });
    }

}

export class resHandler{
    response?: AxiosResponse<any, any>
    constructor(response?: AxiosResponse<any, any>,isAuth?:boolean){
        this.response = response
        if(isAuth && this.isSuccessful()){
            localStorage.setItem('adsi_act',response!.data.token)
        }
    }
    getData(customPld?:string){
        return this.response!.data[customPld??'pld']
    }
    exists(){
        return this.response?.data.pld != undefined && this.response?.data.pld != null
    }
    isSuccessful(){
        return this.response && this.response.status == 200 && (this.response.data.status as boolean)
    }
    isLoggedOut(){
        return (this.response?.status ?? 0) == 401
    }
    getErrorMsg(){
        if(!this.response){
            return 'An error occurred'
        }
        if(this.response.status == 200){
            return this.response.data.message
        }else{
            console.error(this.response.data)
            return this.response.data.message ?? `Request Failed (${this.response.status})`
        }
    }
  }

  export function saveMemId(memid:string){
    localStorage.setItem('mid',memid)
  }

  export function getMemId(){
    return localStorage.getItem('mid') ?? ''
  }