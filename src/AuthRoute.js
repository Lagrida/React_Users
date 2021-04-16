import AuthenticationService from './AuthenticationService'
import { Route, Redirect } from 'react-router-dom';

function AuthRoute(props){
    if(AuthenticationService.isConnected()){
        return <Route {...props} />
    }else{
        return <Redirect to={`${process.env.PUBLIC_URL}/login`} />
    }
}

export default AuthRoute;
