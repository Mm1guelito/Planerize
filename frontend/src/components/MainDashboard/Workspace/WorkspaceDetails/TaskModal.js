import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  LinearProgress,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import CardIcon from "../../../../static/cardIcon.png";
import AddIcon from "../../../../static/addIcon.png";
import DescIcon from "../../../../static/descIicon.png";

const theme = createTheme({
  palette: {
    customColor: {
      main: "#FB923C", // Your desired color goes here
    },
  },
});

class TaskModal extends Component {
  state = {
    isTaskTextFieldVis: false,
    taskToAdd: "",
    listOfTasks: [
      {
        taskName: "Task - 001",
        date: "July 21, 2023",
        id: 1,
        status: "Done",
      },
      {
        taskName: "Task - 002",
        date: "July 21, 2023",
        id: 1,
        status: "inProgress",
      },
    ],
  };

  renderCircles = (status) => {
    const circleColors = {
      "To do": "#CA5369",
      "In progress": "#4977BC",
      "In Review": "#DFBF4F",
      Completed: "#159D72",
    };

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {this.props.status.map((s) => (
          <div
            key={s}
            style={{
              width: 15,
              height: 15,
              marginRight: 5,
              borderRadius: "50%",
              border: `2px solid ${circleColors[s]}`,
              boxSizing: "border-box",
              backgroundColor: this.areStatusesEqual(s, status)
                ? circleColors[s]
                : "transparent",
            }}
          />
        ))}
      </div>
    );
  };
  areStatusesEqual = (status1, status2) => {
    return status1 === status2;
  };

  handleAddOrAddTask(text) {
    if (text === "Add Task" || text === "Cancel") {
      this.setState({ isTaskTextFieldVis: !this.state.isTaskTextFieldVis });
    } else {
      const currentDate = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = currentDate.toLocaleString(undefined, options);

      const task = {
        taskName: this.state.taskToAdd,
        date: formattedDate,
        id: this.state.listOfTasks.length + 1,
        status: "inProgress",
      };

      this.setState(
        (prevState) => ({
          listOfTasks: [...prevState.listOfTasks, task],
        }),
        () => {
          console.log(this.state.listOfTasks);
        }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Dialog
            open={this.props.isAddTaskOpen}
            onClose={this.props.handleAddTask}
            fullWidth={true}
            PaperProps={{
              style: {
                margin: "1rem",
                backgroundColor: "#353D41",
                border: "1px solid #4977BC",
                borderRadius: 10,
              },
            }}
          >
            <div style={{ margin: 20 }}>
              <DialogTitle style={{ color: "#FFFFFF" }}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <img src={CardIcon} alt="Card Icon" />
                      </Grid>
                      <Grid item>{this.props.chosenCard.name}</Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {this.renderCircles(this.props.chosenCard.status)}
                    </div>
                  </Grid>
                </Grid>
              </DialogTitle>
              <DialogContent style={{ color: "#FFFFFF" }}>
                <div style={{ marginLeft: 20, marginTop: 15 }}>
                  <Grid
                    container
                    spacing={2}
                    //   onClick={() => this.handleAddCard(i)}
                    style={{ cursor: "pointer" }}
                  >
                    <Grid item>
                      <img src={AddIcon} alt="Add Workspace" />
                    </Grid>
                    <Grid item>Add Member</Grid>
                  </Grid>
                </div>
              </DialogContent>
              <DialogContent style={{ color: "#FFFFFF" }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <img src={DescIcon} alt="Desc Icon" />
                  </Grid>
                  <Grid item>Description</Grid>
                </Grid>
                <div
                  style={{ marginLeft: 20, marginTop: 15, marginBottom: 20 }}
                >
                  <TextField
                    InputProps={{
                      style: {
                        backgroundColor: "#FFFFFF",
                        width: 450,
                      },
                    }}
                    multiline
                    rows={4}
                    defaultValue="Add a more detailed description..."
                  />
                </div>
                <Grid container spacing={2}>
                  <Grid item>
                    <img src={DescIcon} alt="Desc Icon" />
                  </Grid>
                  <Grid item>To Do</Grid>
                </Grid>
                <div
                  style={{ marginLeft: 20, marginTop: 15, marginBottom: 20 }}
                >
                  <Typography variant="body2" color="white">{`${Math.round(
                    20
                  )}%`}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={20}
                    color="customColor"
                    style={{ marginBottom: 10, width: 450 }}
                  />
                  <div>
                    {this.state.listOfTasks.map((i) => {
                      return (
                        <Grid container spacing={0}>
                          <Grid item xs={6}>
                            <Grid container spacing={2}>
                              <Grid item>
                                <div
                                  key={i}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: 5,
                                    borderRadius: "50%",
                                    boxSizing: "border-box",
                                    backgroundColor:
                                      i.status === "Done"
                                        ? "#159D72"
                                        : "#CA5369",
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                <div>{i.taskName}</div>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <div>Updated last {i.date}</div>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </div>
                  <TextField
                    InputProps={{
                      style: {
                        backgroundColor: "#FFFFFF",
                        width: 450,
                        display:
                          this.state.isTaskTextFieldVis === false ? "none" : "",
                      },
                    }}
                    placeholder="Add task"
                    size="small"
                    onChange={(e) =>
                      this.setState({ taskToAdd: e.target.value })
                    }
                  />
                  <Button
                    style={{
                      backgroundColor: "#4977BC",
                      color: "white",
                      textTransform: "none",
                      height: 25,
                      width: 80,
                      marginTop: 15,
                    }}
                    onClick={() =>
                      this.handleAddOrAddTask(
                        this.state.isTaskTextFieldVis ? "Add" : "Add Task"
                      )
                    }
                  >
                    {this.state.isTaskTextFieldVis === true
                      ? "Add"
                      : "Add Task"}
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                      textTransform: "none",
                      height: 25,
                      width: 80,
                      marginTop: 15,
                      display:
                        this.state.isTaskTextFieldVis === false ? "none" : "",
                    }}
                    onClick={() => this.handleAddOrAddTask("Cancel")}
                  >
                    Cancel
                  </Button>
                </div>
                <Grid container spacing={2}>
                  <Grid item>
                    <img src={DescIcon} alt="Desc Icon" />
                  </Grid>
                  <Grid item>Activity</Grid>
                </Grid>
                <div style={{ marginTop: 20 }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar>ME</Avatar>
                    </Grid>
                    <Grid item>
                      <TextField
                        InputProps={{
                          style: {
                            backgroundColor: "#FFFFFF",
                            width: 416,
                          },
                        }}
                        placeholder="Add task"
                        size="small"
                        onChange={(e) =>
                          this.setState({ activityToAdd: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </div>
              </DialogContent>
            </div>
          </Dialog>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default TaskModal;
