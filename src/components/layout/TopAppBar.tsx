import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useAlertActions } from "../../hooks/useAlertRedux";

type Props = {
  onDrawerToggle: () => void;
  title: string;
  drawerWidth: number;
  desktopOpen: boolean;
  isMobile: boolean;
};

const TopAppBar: React.FC<Props> = ({
  onDrawerToggle,
  title,
  drawerWidth,
  desktopOpen,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { showError } = useAlertActions();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      showError("Error logging out");
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
        },
        ml: { md: desktopOpen ? `${drawerWidth}px` : 0 },
        backgroundColor: "white",
        color: "text.primary",
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar>
        {(isMobile || !desktopOpen) && (
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="account menu"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAvatarClick}
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
