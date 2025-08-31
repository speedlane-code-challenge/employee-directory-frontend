import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { ArrowLeft as ArrowLeftIcon } from "@mui/icons-material";
import TopAppBar from "./TopAppBar";
import { dashboardRoutes } from "../../config/routes";

const DRAWER_WIDTH = 260;

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const getCurrentPageTitle = (): string => {
    const currentMenuItem = dashboardRoutes.find(
      (item) => item.path === location.pathname
    );
    return currentMenuItem ? currentMenuItem.text : "Dashboard";
  };

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Employee Directory
        </Typography>
        {desktopOpen && !isMobile && (
          <IconButton onClick={handleDrawerToggle} size="small">
            <ArrowLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {dashboardRoutes.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                minHeight: 48,
                justifyContent: desktopOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: desktopOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {desktopOpen && <ListItemText primary={item.text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerWidth = desktopOpen ? DRAWER_WIDTH : 56;

  return (
    <Box sx={{ display: "flex" }}>
      <TopAppBar
        onDrawerToggle={handleDrawerToggle}
        title={getCurrentPageTitle()}
        drawerWidth={drawerWidth}
        desktopOpen={desktopOpen}
        isMobile={isMobile}
      />

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
