import React from 'react'
import axios from '../api/axios'
import useAuth from './useAuth'
const userRefresherToken = () => {
    const {setAuth} = useAuth()
    const refresh = async ()=>{
        const response = await axios.get(`/refresh`,{
            withCredentials:true
        })
        setAuth(prev=>{
            console.log(JSON.stringify("HI"+prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken:response.data.accessToken}
        })
        return response.data.accessToken
    }
  return refresh;
}

export default userRefresherToken