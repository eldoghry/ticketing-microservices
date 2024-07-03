import axios from "axios"
import buildClient from "../api/build-client"

const LandingPage = ({ currentUser }) => {
    console.log('Client Landing Page')
    return <>
        <h1>Landing Page!</h1>
        {currentUser && <p> welcome {currentUser?.email}</p>}
    </>
}

LandingPage.getInitialProps = async (context) => {
    console.log('Landing Page')
    const { data } = await buildClient(context).get('/api/users/current')
    return { currentUser: data.user }

}

export default LandingPage