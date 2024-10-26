import axios from "axios";

const baseurl = import.meta.env.VITE_BASEURL
const apiKey = import.meta.env.VITE_API

export function remove(url){
    try{
        axios.post(`${baseurl}/delete_url`,{"uuid":url.slice(-10)},{
            "headers":{
                "x-api-key":apiKey
            }
        })
        .then((response)=>{
            if(response.status!==200){
                console.log(response)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }catch(error){
        console.log(error)
    }
}

export function add(url,setter,loading){
    try{
        axios.post(`${baseurl}/add_url`,{
            "url":url
        },{
            "headers":{
                "x-api-key":apiKey
            }
        })
        .then((response)=>{
            loading(false)
            if(response.status===201){
                setter(`${baseurl}${response.data.uuid}`)
            }
        })
        .catch((error)=>{
            alert(error.response.data.message)
            loading(false)
            setter('')
        })
    }catch(error){
        console.log(error)
    }
}