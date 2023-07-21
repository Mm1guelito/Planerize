import React, { Component } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Avatar,
  Slide,
} from "@mui/material";

import DashboardIcon from "../../static/DashboardIcon.png";
import DashboardLogo from "../../static/dashboardLogo.png";
import AddIcon from "../../static/addIcon.png";
import Workspace from "../../static/workspaceIcon.png";
import AddWorkspaceModal from "./AddWorkspaceModal";
import AvatarModal from "./AvatarModal";
import MainWorkspace from "./Workspace/MainWorkspace";

import "./MainDashboard.css";
import MainWorkspaceDetails from "./Workspace/WorkspaceDetails/MainWorkspaceDetails";

const drawerWidth = 270;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class MainDashboard extends Component {
  state = {
    isDialogOpen: false,
    isAddWorkspaceOpen: false,
    mockWorkspaceData: ["Workspace-001", "Workspace-002", "Workspace-003"],
    workspaceToAdd: "",
    currentWorkspaceUI: false,
  };

  handleAvatarClick = () => {
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose() {
    this.setState({ isDialogOpen: false });
  }

  handleToggleAddWorkspaceModal() {
    this.setState({ isAddWorkspaceOpen: !this.state.isAddWorkspaceOpen });
  }

  handleAddWorkspace() {
    console.log("triggerd");
    const { workspaceToAdd, mockWorkspaceData } = this.state;
    if (workspaceToAdd.trim() !== "") {
      this.setState({
        mockWorkspaceData: [...mockWorkspaceData, workspaceToAdd],
        workspaceToAdd: "",
        isAddWorkspaceOpen: false,
      });
    }
  }

  handleChangeWorkspaceValue = (value) => {
    console.log(value);
    this.setState({ workspaceToAdd: value }, () => {
      console.log("updated value", this.state.workspaceToAdd);
    });
  };

  handleChooseWorkspace = () => {
    this.setState({ currentWorkspaceUI: true });
  };
  handleBackToDashboard = () => {
    this.setState({ currentWorkspaceUI: false });
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
        <AvatarModal
          handleDialogClose={this.handleDialogClose.bind(this)}
          isDialogOpen={isDialogOpen}
          Transition={Transition}
        />
        <CssBaseline />
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
            <img
              src={DashboardIcon}
              alt="Dashboard Icon"
              style={{ cursor: "pointer" }}
              onClick={this.handleBackToDashboard}
            />
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
                        src={Workspace}
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
        <div
          id="main-content-container"
          style={{
            marginLeft: drawerWidth,
            backgroundColor: "#353D41",
            padding: "50px 100px 50px 100px",
          }}
        >
          <Toolbar />
          <div>
            {this.state.currentWorkspaceUI === false ? (
              <MainWorkspace
                mockWorkspaceData={this.state.mockWorkspaceData}
                handleChooseWorkspace={this.handleChooseWorkspace.bind(this)}
              />
            ) : (
              <MainWorkspaceDetails />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainDashboard;
