import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ShoppingCartOutlined,
  NotificationsOutlined,
  AccountCircleOutlined,
  ExitToAppOutlined,
  WorkOutlineOutlined,
  ChatOutlined,
  MenuOutlined,
  RoomServiceOutlined
} from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
// import Search from "../forms/Search";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Search from "../forms/Search.jsx";


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    height: 64,
  },
  logo: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.common.white,
  },
  serviceIcon: {
    marginRight: theme.spacing(0.5),
  },
  chatIcon: {
    marginRight: theme.spacing(0.5),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
  },
  iconButton: {
    color: theme.palette.common.white,
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  userName: {
    color: theme.palette.common.black,
  },
  drawer: {
    width: 250,
  },
  drawerPaper: {
    width: 250,
  },
  list: {
    width: "100%",
    paddingTop: theme.spacing(2),
  },
  listItem: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const { user , cart} = useSelector((state) => ({ ...state }));

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
  signOut(auth)
    .then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      history.push("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};

  

  const mobileMenu = (
     <Drawer
    className={classes.drawer}
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor="left" // Change anchor to "left" for the drawer to appear on the left side
    open={showMenu}
    onClose={() => setShowMenu(false)}
  >
    <List className={classes.list}>
      <ListItem
        button
        component={Link}
        to="/cart"
        onClose={() => setShowMenu(false)}
        className={classes.listItem}
      >
        
        <ListItemIcon>
             <Badge badgeContent={cart.length} color="secondary" offset={[9, 0]}>
          <ShoppingCartOutlined />
        </Badge>
        </ListItemIcon>
        <ListItemText primary="Cart" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/readme"
        onClose={() => setShowMenu(false)}
        className={classes.listItem}
      >
        <ListItemIcon>
          <RoomServiceOutlined />
        </ListItemIcon>
        <ListItemText primary="Read Me" />
      </ListItem>
      {user && user.role === "subscriber" && (
        <ListItem
          button
          component={Link}
          to="/user/history"
         onClose={() => setShowMenu(false)}
          className={classes.listItem}
        >
          <ListItemIcon>
            <WorkOutlineOutlined />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      )}
      
      
    </List>
    <div className={classes.searchContainer}>
      <Search />
    </div>
  </Drawer>
  );

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          className={classes.iconButton}
          onClick={() => setShowMenu(true)}
          aria-label="menu"
          edge="start"
        >
          <MenuOutlined className={classes.menuIcon} />
        </IconButton>
        <Typography variant="h6" component={Link} to="/" className={classes.logo}>
          Book Store 
        </Typography>
        <div>
          <IconButton className={classes.iconButton} component={Link} to="/Shop">
            <WorkOutlineOutlined className={classes.serviceIcon} />
            Shop
          </IconButton>
          {user && (
            <IconButton className={classes.iconButton} onClick={handleClickMenu}>
              <AccountCircleOutlined />
            </IconButton>
          )}
          {!user && (
            <IconButton className={classes.iconButton} component={Link} to="/register">
              <AccountCircleOutlined />
            </IconButton>
          )}
          {!user && (
            <IconButton className={classes.iconButton} component={Link} to="/login">
              <ExitToAppOutlined />
            </IconButton>
          )}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
           
            {user && (
              <MenuItem onClick={handleLogout}>
                <ExitToAppOutlined />
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
      
      {mobileMenu}
    </AppBar>
  );
}

export default Header;
