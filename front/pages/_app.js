import 'bootstrap/dist/css/bootstrap.css'
import Header from '../component/header'
import buildClient from '../api/build-client'



const AppComponent = ({ Component, pageProps }) => {
    return <>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
    </>

}

AppComponent.getInitialProps = async (appContext) => {
    console.log('from appContext')
    console.log(Object.keys(appContext))

    // context on __app.js is different than any other context on getInitialProps of components 
    // appContext properties ['AppTree', 'Component', 'router', 'ctx'

    // context on any other component if run from client side: ['pathname', 'query', 'asPath', 'locale', 'locales', 'defaultLocale', 'AppTree']
    // if run from server side : [err, req,res,'pathname', 'query', 'asPath', 'locale', 'locales', 'defaultLocale', 'AppTree', defaultGetInitialProps]

    const { data } = await buildClient(appContext.ctx).get('/api/users/current')
    let pageProps = {}

    // if I need to run any getInitialProps for different component
    // If I not do that this is the only getInitialProps that will be run on the project
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
        pageProps: {
            ...pageProps,
            currentUser: data.user
        }
    }
}

export default AppComponent
