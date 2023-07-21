import React, { Component } from "react";
import { Grid, Paper } from "@mui/material";
import Workspace from "../../../static/workspaceIcon.png";
import AddIcon from "../../../static/addIcon.png";
class MainWorkspace extends Component {
  state = {};

  render() {
    let numberOfPapers = 9 - this.props.mockWorkspaceData.length;
    return (
      <React.Fragment>
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
                  }}
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
            <div
              style={{
                color: "white",
                float: "left",
                marginLeft: 5,
                fontWeight: "bold",
              }}
            >
              Workspace Members
            </div>
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
                      onClick={() => this.handleToggleAddWorkspaceModal()}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default MainWorkspace;
