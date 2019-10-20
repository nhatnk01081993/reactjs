import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactsIcon from '@material-ui/icons/Contacts';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles({
    root: {
        width: '100',
    },
});

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

function NavigationAuth() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction component={Link} to={ROUTES.LANDING} label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction component={Link} to={ROUTES.LANDING} label="About Us" value="About Us" icon={<ContactsIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
            <BottomNavigationAction component={SignOutButton} />
        </BottomNavigation>
    );
}
function NavigationNonAuth() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction component={Link} to={ROUTES.LANDING} label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction component={Link} to={ROUTES.LANDING} label="About Us" value="About Us" icon={<ContactsIcon />} />
            <BottomNavigationAction component={Link} to={ROUTES.SIGN_IN} label="SignIn/SignUp" icon={<VpnKeyIcon />} />
        </BottomNavigation>
    );
}

export default Navigation;