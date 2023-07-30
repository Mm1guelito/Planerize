import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  Grid,
  Avatar,
  Slide,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
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

const MainDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddWorkspaceOpen, setIsAddWorkspaceOpen] = useState(false);
  const [workSpaceData, setWorkspaceData] = useState([]);
  const [members, setMembers] = useState([]);
  const [workspaceToAdd, setWorkspaceToAdd] = useState("");
  const [chosenWorkspace, setChosenWorkspace] = useState("");
  const [chosenWorkspaceDetails, setChosenWorkspaceDetails] = useState([]);
  const [currentWorkspaceUI, setCurrentWorkspaceUI] = useState(false);
  const apiUrl = "http://127.0.0.1:3000";

  useEffect(() => {
    handleGetWorkspaceList();
  }, []);

  const handleAvatarClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleToggleAddWorkspaceModal = () => {
    setIsAddWorkspaceOpen((prevValue) => !prevValue);
  };

  const handleChangeWorkspaceValue = (value) => {
    setWorkspaceToAdd(value);
  };

  const handleChooseWorkspace = (i) => {
    handleGetChosenWorkSpaceDetails(i);
  };

  const handleBackToDashboard = () => {
    setCurrentWorkspaceUI(false);
    setChosenWorkspace("");
  };

  //===============API CALLING===========================//

  const handleGetWorkspaceList = () => {
    const url = new URL(`${apiUrl}/v1/workspace`);
    const params = new URLSearchParams({
      userId: sessionStorage.getItem("userId"),
    });
    url.search = params;

    let requestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    fetch(url, requestConfig)
      .then((response) => response.json())
      .then((messageData) => {
        const resultObject = [];
        setWorkspaceData(messageData);
        console.log(workSpaceData);
        messageData.forEach((item) => {
          const { name, email } = item.member_info[0];
          const key = `${name}_${email}`;

          if (!resultObject[key]) {
            resultObject[key] = {
              name: name,
              email: email,
              boardCount: 1,
            };
          } else {
            resultObject[key].boardCount++;
          }
        });

        const resultArray = Object.values(resultObject);
        setMembers(resultArray);
      });
  };

  const handleAddWorkspace = () => {
    const url = `${apiUrl}/v1/workspace/`;

    const payload = {
      title: workspaceToAdd,
      token: sessionStorage.getItem("userId"),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(() => {
        handleGetWorkspaceList();
        setWorkspaceToAdd("");
        setIsAddWorkspaceOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGetChosenWorkSpaceDetails = (i) => {
    const url = new URL(`${apiUrl}/v1/workspace/all`);
    const params = new URLSearchParams({
      workspace_id: i._id,
    });
    url.search = params;

    let requestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    fetch(url, requestConfig)
      .then((response) => response.json())
      .then((messageData) => {
        console.log(messageData);
        setChosenWorkspace(i.title);
        setCurrentWorkspaceUI(true);
      });
  };

  return (
    <React.Fragment>
      <AddWorkspaceModal
        workspaceToAdd={workspaceToAdd}
        isAddWorkspaceOpen={isAddWorkspaceOpen}
        handleChangeWorkspaceValue={handleChangeWorkspaceValue}
        handleAddWorkspace={handleAddWorkspace}
        handleToggleAddWorkspaceModal={handleToggleAddWorkspaceModal}
      />
      <AvatarModal
        handleDialogClose={handleDialogClose}
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
            <div
              style={{
                marginLeft: 280,
                paddingTop: 15,
                fontSize: 20,
                float: "left",
              }}
            >
              {chosenWorkspace}
            </div>
          </Grid>
          <Grid item xs={6}>
            <Toolbar style={{ float: "right" }}>
              <Avatar onClick={handleAvatarClick}>ME</Avatar>
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
            onClick={handleBackToDashboard}
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
                  onClick={() => handleToggleAddWorkspaceModal()}
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
          {workSpaceData.map((i) => (
            <React.Fragment key={i}>
              <Grid
                container
                spacing={0}
                style={{ marginTop: 10, cursor: "pointer" }}
                onClick={() => handleChooseWorkspace(i)}
              >
                <Grid item xs={1}>
                  <img src={Workspace} alt="Workspace" />
                </Grid>
                <Grid
                  item
                  xs={7}
                  style={{
                    backgroundColor:
                      chosenWorkspace === i.title ? "#969696" : "transparent",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      float: "left",
                      marginLeft: 5,
                      paddingBottom: 2,
                    }}
                  >
                    {i.title}
                  </div>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    backgroundColor:
                      chosenWorkspace === i.title ? "#969696" : "transparent",
                  }}
                >
                  <div style={{ float: "right", color: "white" }}>
                    <MoreHorizIcon />
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </div>
      </Drawer>

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
          {currentWorkspaceUI === false ? (
            <MainWorkspace
              workSpaceData={workSpaceData}
              members={members}
              handleChooseWorkspace={handleChooseWorkspace}
            />
          ) : (
            <MainWorkspaceDetails />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainDashboard;
