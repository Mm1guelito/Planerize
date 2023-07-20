import React, { Component } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Avatar,
  Dialog,
  Slide,
} from "@mui/material";
import DashboardIcon from "../../static/DashboardIcon.png";
const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class MainDashboard extends Component {
  state = {
    isDialogOpen: false,
  };

  handleAvatarClick = () => {
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };
  render() {
    const { isDialogOpen } = this.state;
    return (
      <React.Fragment>
        <Dialog
          open={isDialogOpen}
          onClose={this.handleDialogClose}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1rem",
              maxWidth: "300px", // Customize the maximum width of the dialog
              backgroundColor: "#fff", // Customize the background color
            },
          }}
        >
          {/* Add your content for the dialog here */}
          <div>Dialog Content</div>
        </Dialog>
        <CssBaseline />
        {/* Appbar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#202324",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Toolbar>
                <img src={DashboardIcon} alt="Dashboard Icon" />
              </Toolbar>
            </Grid>
            <Grid item xs={6}>
              <Toolbar style={{ float: "right" }}>
                <Avatar onClick={this.handleAvatarClick}>ME</Avatar>
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <List>
            {/* Add your sidebar items here */}
            <ListItem button>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Item 2" />
            </ListItem>
            {/* Add more items as needed */}
          </List>
        </Drawer>

        {/* Main content */}
        <main sx={{ flexGrow: 1, p: 3, mt: 8, ml: drawerWidth }}>
          <Toolbar />
          <Typography paragraph>
            {/* Your main content goes here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </main>
      </React.Fragment>
    );
  }
}

export default MainDashboard;
