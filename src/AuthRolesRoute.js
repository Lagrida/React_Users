import AuthenticationService from './AuthenticationService'
import { Route } from 'react-router-dom';
import ErrorPage from './views/ErrorPage';

const hasSubArray = (arr, subArr) => subArr.every(val => arr.includes(val));

function AuthRolesRoute(props){
    const roles = props.roles;
    const isConnected = AuthenticationService.isConnected();
    if(isConnected){
        const userRoles = AuthenticationService.getRoles();
        let counts = roles.length-userRoles.length;
        let hasRole = (counts >= 0) ? hasSubArray(roles, userRoles) : hasSubArray(userRoles, roles);
        if(hasRole){
            return <Route {...props} />
        }
    }
    return <ErrorPage errorMessage="403 Forbiden" />
}

export default AuthRolesRoute;
