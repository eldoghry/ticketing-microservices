import axios from "axios"

const LandingPage = ({ currentUser }) => {
    console.log('Client Landing Page')
    return <>
        <h1>Landing Page!</h1>
        {currentUser && <p> welcome {currentUser?.email}</p>}
    </>
}

LandingPage.getInitialProps = async (context) => {
    console.log('Landing Page')
    console.log(Object.keys(context))

    if (typeof window === 'undefined') {
        console.log('Running from server')
        const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current', {
            headers: {
                Host: 'ticketing-app.dev',
                ...context.req.headers
            }
        })
        console.log(data)
        return { currentUser: data.user }
    } else {

        console.log('Running from client')
        const { data } = await axios.get('https://ticketing-app.dev/api/users/current')
        console.log(data)
        return { currentUser: data.user }

    }
}

export default LandingPage