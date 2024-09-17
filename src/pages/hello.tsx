import React from 'react'
import { useSession } from "next-auth/react";


export default function Hello() {

const {data:sessionData} = useSession()

  return (
    
    sessionData !== null ? 
    <div>{sessionData ? sessionData.user?.email : "Fetching User..."}</div>
    : <div>Not logged in</div>


  )
}

