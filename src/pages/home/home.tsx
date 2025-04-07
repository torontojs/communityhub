// Import { useEffect } from 'react'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const home = () => // Const url= import.meta.env['APP_API_BASE_URL']
// Const checkAuth = async () => {
//   Try {
//     //
//     Const response = await fetch(`${url}/auth/auth-check`, {
//         Method: 'GET',
//         Headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     If(!response.ok){
//         Window.location.href = `${url}/sign-in`;
//     }

//   } catch(e){
//     If( e instanceof Error){

//     } else {
//         Throw new Error("Unexpected error checking authentication st")
//     }
//   }
// }
//     // useEffect()

//   UseEffect(() => {
//     CheckAuth()
//   })
(
	<>
		<Header>Welcome</Header>
		<div>You are authenticated</div>
		<Footer />
	</>
);

export default home;
