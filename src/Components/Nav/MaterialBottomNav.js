import React from 'react';
import { Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import LocationCityTwoToneIcon from '@material-ui/icons/LocationCityTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';


const useStyles = makeStyles({
    root: {
        height: 75,
        width: "50%",
        marginLeft: "25%",
        position: "fixed",
        bottom: "20px",
        zIndex: 1,
        backgroundColor: "lightGrey",
        borderRadius: "50px"
    },
});

export default function SimpleBottomNavigation() {
    const loggedInUser = JSON.parse(sessionStorage.getItem("credentials"))
    const currentURL = window.location.pathname;
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        (loggedInUser === null) ?
            <></> : (currentURL === "/globalpost/new" || currentURL === "/localpost/new" || currentURL === "/mypost/new" || currentURL === "/following") ?
                <></> :
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction id="globalNavSelection" component={Link} to="/globalpost" label="Global" icon={< PublicTwoToneIcon />} />
                    <BottomNavigationAction id="localNavSelection" component={Link} to="/localpost" label="Local" icon={< LocationCityTwoToneIcon />} />
                    <BottomNavigationAction id="personalNavSelection" component={Link} to="/mypost" label="Personal" icon={<HomeTwoToneIcon />} />
                </BottomNavigation>

    );
}
