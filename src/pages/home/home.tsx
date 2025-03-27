import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'


const home = () => {    
    const url= import.meta.env['APP_API_BASE_URL']
    // const checkAuth = async () => {
    //   try {
    //     // 
    //     const response = await fetch(`${url}/auth/auth-check`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })

    //     if(!response.ok){
    //         window.location.href = `${url}/sign-in`; 
    //     }

        
    //   } catch(e){
    //     if( e instanceof Error){

    //     } else {
    //         throw new Error("Unexpected error checking authentication st")
    //     }
    //   } 
    // }
    //     // useEffect()

    //   useEffect(() => {
    //     checkAuth()
    //   })
  return (
    <>
        <Header>Welcome</Header>
        <div>You are authenticated</div>
        <Footer />
    </>
  )
}

export default home