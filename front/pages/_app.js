import 'bootstrap/dist/css/bootstrap.css'
import Header from '../component/header'



function MyApp({ Component, pageProps }) {
    return <>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
    </>

}
export default MyApp