import {Route, Router, Switch} from 'react-router-dom';
import Body from '../views/Body';
import Register from '../views/users/Register';
import Login from '../views/users/Login';
import Logout from '../views/users/Logout';
import Profile from '../views/users/Profile';
import GetUser from '../views/users/GetUser';
import Forum from '../views/Forum';
import EditProfile from '../views/users/EditProfile';
import Admin from '../views/admin/Body';
import Users from '../views/admin/Users';
import Cats from '../views/admin/Cats';
import UsersList from '../views/UsersList';
import Forums from '../views/admin/Forums';
import ErrorPage from '../views/ErrorPage';
import AuthRolesRoute from '../AuthRolesRoute';
import AuthRoute from '../AuthRoute';
import AllRoles from '../views/AllRoles';
import MonitorRoles from '../views/MonitorRoles';
import AdminRoles from '../views/AdminRoles';

function Routers(){
    return(
        <Switch>
            
                <Route path={`/`} exact component={Body} />
                <Route path={`/register`} exact component={Register} />
                <Route path={`/login`} exact component={Login} />
                <Route path={`/logout`} exact component={Logout} />
                <Route path={`/users`} exact component={UsersList} />
                <AuthRolesRoute roles={["user", "monitor", "admin"]} path={`/page1`} exact component={AllRoles} />
                <AuthRolesRoute roles={["monitor", "admin"]} path={`/page2`} exact component={MonitorRoles} />
                <AuthRolesRoute roles={["admin"]} path={`/page3`} exact component={AdminRoles} />
                <AuthRoute path={`/profile/edit`} exact component={EditProfile} />
                <AuthRoute path={`/profile`} exact component={Profile} />
                <Route path={`/get_user/:id`} exact component={GetUser} />
                <Route path={`/forum/:id`} exact component={Forum} />
                <AuthRolesRoute roles={["admin"]} path={`/admin`} exact component={Admin} />
                <AuthRolesRoute roles={["admin"]} path={`/admin/users`} exact component={Users} />
                <AuthRolesRoute roles={["admin"]} path={`/admin/cats`} exact component={Cats} />
                <AuthRolesRoute roles={["admin"]} path={`/admin/forums`} exact component={Forums} />
                <Route>
                    <ErrorPage errorMessage="Error 404 : Page Not Found" />
                </Route>
            
        </Switch>
    );
}

export default Routers;
