import React, { Component } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Grid,
  Avatar,
  Dialog,
  Slide,
} from "@mui/material";

import DashboardIcon from "../../static/DashboardIcon.png";
import DashboardLogo from "../../static/dashboardLogo.png";
import AddIcon from "../../static/addIcon.png";
import Workpace from "../../static/workspaceIcon.png";
import AddWorkspaceModal from "./AddWorkspaceModal";

const drawerWidth = 270;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class MainDashboard extends Component {
  state = {
    isDialogOpen: false,
    isAddWorkspaceOpen: false,
    mockWorkspaceData: ["Workpace-001", "Workpace-002"],
    workspaceToAdd: "",
  };

  handleAvatarClick = () => {
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  handleToggleAddWorkspaceModal() {
    this.setState({ isAddWorkspaceOpen: !this.state.isAddWorkspaceOpen });
  }

  handleAddWorkspace() {
    console.log("triggerd");
    const { workspaceToAdd, mockWorkspaceData } = this.state;
    if (workspaceToAdd.trim() !== "") {
      // Check if the workspaceToAdd is not an empty string or contains only whitespaces
      this.setState({
        mockWorkspaceData: [...mockWorkspaceData, workspaceToAdd], // Add the new workspace to the array
        workspaceToAdd: "", // Clear the workspaceToAdd after adding it to the array
        isAddWorkspaceOpen: false,
      });
    }
  }

  handleChangeWorkspaceValue = (value) => {
    console.log(value);
    this.setState({ workspaceToAdd: value });
  };
  render() {
    const { isDialogOpen } = this.state;
    return (
      <React.Fragment>
        <AddWorkspaceModal
          workspaceToAdd={this.state.workspaceToAdd}
          isAddWorkspaceOpen={this.state.isAddWorkspaceOpen}
          handleChangeWorkspaceValue={this.handleChangeWorkspaceValue}
          handleAddWorkspace={this.handleAddWorkspace.bind(this)}
          handleToggleAddWorkspaceModal={this.handleToggleAddWorkspaceModal.bind(
            this
          )}
        />
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
          <div>Dialog Content</div>
        </Dialog>
        <CssBaseline />
        {/* Appbar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 0,
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
              backgroundColor: "#202324",
            },
          }}
        >
          <Toolbar>
            <img src={DashboardIcon} alt="Dashboard Icon" />
          </Toolbar>
          <div
            style={{
              borderTop: "1px solid #4977BC",
              margin: "0px 10px 0px 10px",
            }}
          />
          <div
            style={{
              margin: "5px 10px 0px 10px",
              height: 250,
            }}
          >
            <Grid container spacing={0} style={{ marginTop: 10 }}>
              <Grid item xs={1}>
                <img src={DashboardLogo} alt="Dashboard Logo" />
              </Grid>
              <Grid item xs={7}>
                <div
                  style={{
                    color: "white",
                    float: "left",
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </div>
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              borderBottom: "1px solid #4977BC",
              margin: "5px 10px 0px 10px",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div style={{ color: "white", fontWeight: "bolder" }}>
                  Your workspace
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ float: "right" }}>
                  <img
                    src={AddIcon}
                    alt="Add Workspace"
                    onClick={() => this.handleToggleAddWorkspaceModal()}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div
            style={{
              margin: "5px 10px 0px 10px",
            }}
          >
            {this.state.mockWorkspaceData.map((i) => {
              return (
                <React.Fragment>
                  <Grid container spacing={0} style={{ marginTop: 10 }}>
                    <Grid item xs={1}>
                      <img
                        src={Workpace}
                        alt="Add Workspace"
                        onClick={() => this.handleToggleAddWorkspaceModal()}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <div
                        style={{ color: "white", float: "left", marginLeft: 5 }}
                      >
                        {i}
                      </div>
                    </Grid>

                    <Grid item xs={4}>
                      <div style={{ float: "right", color: "white" }}>...</div>
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            })}
          </div>
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
