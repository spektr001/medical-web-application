import * as React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import crossIcon from "../../../assets/images/cross.png";
import heartIcon from "../../../assets/images/heart.png";

export const HeaderBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginBottom: 15,
        }}
      >
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img width="50px" src={crossIcon} alt="redcross" />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              WebPocketDoc
            </Typography>
            <IconButton
              onClick={handleClick}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img width="40px" src={heartIcon} alt="heart" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user.email}
        <Link to="/dashboard">
          <MenuItem>Проаналізувати дані</MenuItem>
        </Link>
        <Link to="/dashboard/monitors">
          <MenuItem>Архів</MenuItem>
        </Link>
        <MenuItem onClick={logout}>Вийти</MenuItem>
      </Menu>
    </>
  );
};
