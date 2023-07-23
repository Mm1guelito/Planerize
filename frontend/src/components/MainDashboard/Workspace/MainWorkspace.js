import React, { Component } from "react";
import {
  Grid,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Workspace from "../../../static/workspaceIcon.png";
import AddIcon from "../../../static/addIcon.png";
import MemberIcon from "../../../static/membersIcon.png";
import NewMemberModal from "./NewMemberModal";
class MainWorkspace extends Component {
  state = {
    members: [
      {
        id: 1,
        avatarUrl: "avatar_url_1",
        name: "Migs Evangelista",
        email: "@migsevangelista",
        boards: 2,
      },
      {
        id: 2,
        avatarUrl: "avatar_url_2",
        name: "Marjoe Velasco",
        email: "@marjoevelasco1",
        boards: 1,
      },
      {
        id: 3,
        avatarUrl: "avatar_url_3",
        name: "Kervin Lara",
        email: "@kervs83",
        boards: 1,
      },
    ],
    memberToAdd: "",
    isAddMemberOpen: false,
  };

  handleToggleAddMemberModal() {
    this.setState({ isAddMemberOpen: !this.state.isAddMemberOpen });
  }

  handleChangeMemberValue = (value) => {
    this.setState({ memberToAdd: value });
  };

  render() {
    let numberOfPapers = 9 - this.props.mockWorkspaceData.length;
    return (
      <React.Fragment>
        <NewMemberModal
          memberToAdd={this.state.memberToAdd}
          isAddMemberOpen={this.state.isAddMemberOpen}
          handleChangeMemberValue={this.handleChangeMemberValue}
          handleToggleAddMemberModal={this.handleToggleAddMemberModal.bind(
            this
          )}
        />
        <Grid container spacing={2}>
          <Grid item>
            <img src={Workspace} alt="Add Workspace" />
          </Grid>
          <Grid item>
            <div style={{ color: "white", fontWeight: "bold" }}>Workspace</div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: 10, marginBottom: 20 }}>
          {this.props.mockWorkspaceData.map((i) => {
            return (
              <Grid item xs={4} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  style={{
                    backgroundColor: "#202324",
                    color: "white",
                    width: 300,
                    height: 100,
                    position: "relative",
                    borderRadius: 15,
                    cursor: "pointer",
                  }}
                  onClick={this.props.handleChooseWorkspace}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 15,
                      left: 15,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {i}
                  </div>
                </Paper>
              </Grid>
            );
          })}
          {[...Array(numberOfPapers)].map((_, index) => (
            <Grid
              item
              key={index}
              xs={4}
              style={{ textAlign: "-webkit-center" }}
            >
              <Paper
                style={{
                  backgroundColor: "#353D41",
                  color: "white",
                  width: 300,
                  height: 100,
                  borderRadius: 15,
                  border: "1px dashed gray",
                }}
              />
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            borderTop: "1px solid #4977BC",
            marginBottom: 20,
          }}
        />
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item>
                <div>
                  <img
                    src={MemberIcon}
                    alt="Member Icon"
                    onClick={() => this.handleToggleAddMemberModal()}
                  />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    color: "white",
                    fontWeight: "bolder",
                  }}
                >
                  Workspace Members
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div style={{ float: "right" }}>
              <Grid container spacing={2}>
                <Grid item>
                  <div
                    style={{
                      color: "white",
                      fontWeight: "bolder",
                    }}
                  >
                    Add member
                  </div>
                </Grid>
                <Grid item>
                  <div>
                    <img
                      src={AddIcon}
                      alt="Add Workspace"
                      onClick={() => this.handleToggleAddMemberModal()}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            marginTop: 20,
            marginLeft: 30,
            marginRight: 20,
            maxHeight: 230,
          }}
        >
          {this.state.members.map((member, index) => (
            <List key={index} style={{ marginBottom: 10 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Avatar" src={member.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      variant="body2"
                      style={{ display: "block", color: "white" }}
                    >
                      {member.name}
                    </Typography>
                  }
                  secondary={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          style={{ display: "block", color: "white" }}
                        >
                          {member.email}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          on {member.boards} board
                        </Typography>
                      </div>
                    </div>
                  }
                />
              </ListItem>
            </List>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MainWorkspace;
