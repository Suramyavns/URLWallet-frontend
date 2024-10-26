import axios from "axios";

const baseurl = import.meta.env.VITE_BASEURL
const apiKey = import.meta.env.VITE_API

export function add(url,setter){
    try{
        axios.post(`${baseurl}/add_url`,{
            "url":url
        },{
            "headers":{
                "x-api-key":apiKey
            }
        })
        .then((response)=>{
            if(response.status===201){
                setter(`${baseurl}${response.data.uuid}`)
            }
        })
        .catch((error)=>{
            alert(error.response.data.message)
        })
    }catch(error){
        console.log(error)
    }
}