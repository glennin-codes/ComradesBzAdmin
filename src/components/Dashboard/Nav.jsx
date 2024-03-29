import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../others/useAuthContext';
import { ListItemButton } from '@mui/material';

// custom styled component for showing font awesome icons
const Icon = styled('i')(({ theme }) => ({
    color: 'inherit', fontSize: '20px'
}));

// custom styled component for NavLink
const LinkWrap = styled(NavLink)(() => ({
    color: 'inherit',
    textDecoration: 'none', '&.active>div': { background: '#ff00000f' }
}))

const DashboardNav = ({ url }) => {
    const { user, logOut } = useAuthContext(); // get user info and log out function
    return (
        <List>
            <LinkWrap exact to={`${url}`} activeClassName='active'>
                <ListItemButton>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
            </LinkWrap>

            <LinkWrap to={`${url}/orders`} activeClassName='active'>
                <ListItemButton>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>

                    <ListItemText>{user?.role === 'admin' ? 'All Orders' : 'My Orders'}</ListItemText>
                </ListItemButton>
            </LinkWrap>

            {/* show review navigation only for public users */}
            {user?.role !== 'admin' &&
                <LinkWrap to={`${url}/review/add`} activeClassName='active'>
                    <ListItemButton>
                        <ListItemIcon><RateReviewIcon /></ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </ListItemButton>
                </LinkWrap>
            }

            {/* only for admin navigations */}
            {user?.role === 'admin' && <>
                <LinkWrap to={`${url}/make_admin`} activeClassName='active'>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon className="fas fa-user-shield" />
                        </ListItemIcon>
                        <ListItemText>Make Admin</ListItemText>
                    </ListItemButton>
                </LinkWrap>
                <LinkWrap to={`${url}/add_car`} activeClassName='active'>
                    <ListItemButton>
                        <ListItemIcon><ElectricCarIcon /></ListItemIcon>
                        <ListItemText>Add Car</ListItemText>
                    </ListItemButton>
                </LinkWrap>
                <LinkWrap to={`${url}/manage_cars`} activeClassName='active'>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon className="fas fa-tools" />
                        </ListItemIcon>
                        <ListItemText>Manage Cars</ListItemText>
                    </ListItemButton>
                </LinkWrap>
                <LinkWrap to={`${url}/all_messages`} activeClassName='active'>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon className="far fa-envelope" />
                        </ListItemIcon>
                        <ListItemText>All Messages</ListItemText>
                    </ListItemButton>
                </LinkWrap>
            </>
            }

            {/* log out button */}
            <ListItemButton onClick={logOut}>
                <ListItemIcon>
                    <Icon style={{ margin: '0 4px' }} className="fas fa-sign-out-alt" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItemButton>
        </List>
    );
};

export default DashboardNav;