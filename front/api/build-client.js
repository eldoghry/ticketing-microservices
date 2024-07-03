import axios from "axios"

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        console.log('Running from server')
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })
    } else {
        console.log('Running from client')
        return axios.create({
            baseURL: 'https://ticketing-app.dev'
        })
    }
}


export default buildClient