import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { db } from "~/server/db/index"
import { users } from '~/server/db/schema';
import useSWR from 'swr';
import router from 'next/router';


const user_table_fetcher = async () => await db.select().from(users)
// Todo create an api endpoint for the above db thing
const fetcher = () => fetch("/api/users").then((res) => res.json())
export async function getServerSideProps() {
  // Fetch data from external API
  const data = await user_table_fetcher()

  // Pass data to the page via props
  return { props: { data } }
}



function ClientData() {


  // Client code can't access the db
  const { data, error, isLoading } = useSWR('/api/users', fetcher)
  if (error) return <div>Error...</div>
  if (isLoading) return <div>Loading...</div>

  return data?.map((d: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  }) => <div>d.name</div>)

}


export default function Hello(props: {
  data: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  }[]
}) {
  const { data: serverside_data } = props

  const { data: sessionData } = useSession()
  const [top, setTop] = useState(true)

  const [selectedImage,setSelectedImage] = useState(0)
  const checkChange = (cb:any) => {
    console.log(cb)
  }

    // @ts-ignore
    // document.startViewTransition
    //   //@ts-ignore
    //   ? document.startViewTransition(() => setSelectedImage(i))
    //   : setTop(t => !t)

  return (
    <>
       <img onClick={() => {
              // @ts-ignore
        if (document.startViewTransition) {
          //@ts-ignore
          document.startViewTransition()
        }

          router.push("/")
        }}  style={{viewTransitionName:"hero"}} src="https://dsrpvwvfgjiil.cloudfront.net/iv_logo_black.png"  />

        {ClientData()}
      </>
      )
    }

// TODO figure out client side trpc
// build a sample view transition for a car page 