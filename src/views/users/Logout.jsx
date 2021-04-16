import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import AuthenticationService from '../../AuthenticationService';

function Logout(){
    const history = useHistory();
    useEffect(() => {
        AuthenticationService.logout();
        history.push(`/`);
    }, []);
    return(<div></div>)
}

export default Logout;
