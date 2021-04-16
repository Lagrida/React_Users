import React, {useEffect} from 'react';
import ShowProfile from './components/ShowProfile';
import AuthenticationService from '../../AuthenticationService';

function Profile(){
  useEffect(() => {
    document.title = 'My profile | Lagrida';
  }, []);
  let user = AuthenticationService.getUser();
  return(<ShowProfile user={user} isProfile={true} />);
}

export default Profile;
