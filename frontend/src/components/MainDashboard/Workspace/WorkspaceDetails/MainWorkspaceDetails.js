import React, { Component } from "react";
import { Grid, Paper } from "@mui/material";
import AddIcon from "../../../../static/addIcon.png";
import TaskModal from "./TaskModal";

class MainWorkspaceDetails extends Component {
  state = {
    isAddTaskOpen: false,
    chosenCard: [],
    status: ["To do", "In progress", "In Review", "Completed"],
    tasks: [
      {
        name: "Card 1",
        status: "To do",
        id: 1,
      },
      {
        name: "Card 2",
        status: "In progress",
        id: 2,
      },
      {
        name: "Card 3",
        status: "In progress",
        id: 3,
      },
      {
        name: "Card 4",
        status: "In Review",
        id: 4,
      },
      {
        name: "Card 5",
        status: "In Review",
        id: 5,
      },
      {
        name: "Card 6",
        status: "Completed",
        id: 6,
      },
      {
        name: "Card 7",
        status: "Completed",
        id: 7,
      },
    ],
  };

  areStatusesEqual = (status1, status2) => {
    return (
      status1.trim().toLocaleLowerCase() === status2.trim().toLocaleLowerCase()
    );
  };

  renderCircles = (status, taskId) => {
    const circleColors = {
      "To do": "#CA5369",
      "In progress": "#4977BC",
      "In Review": "#DFBF4F",
      Completed: "#159D72",
    };

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {this.state.status.map((s) => (
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
              cursor: "pointer",
            }}
            onClick={(e) => this.handleCircleClick(e, s, taskId)}
          />
        ))}
      </div>
    );
  };

  handleCircleClick = (e, newStatus, taskId) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    this.setState({ tasks: updatedTasks }, () => {
      console.log(this.state.tasks);
    });
    e.stopPropagation();
  };

  handleAddCard = (status) => {
    const newCard = {
      name: `Card ${this.state.tasks.length + 1}`,
      status: status,
      id: this.state.tasks.length + 1,
    };

    // Update the state to add the new card to the tasks array
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newCard],
    }));
  };

  handleAddTask(task) {
    this.setState({
      isAddTaskOpen: !this.state.isAddTaskOpen,
      chosenCard: task,
    });
  }
  render() {
    const { tasks } = this.state;

    return (
      <React.Fragment>
        <TaskModal
          isAddTaskOpen={this.state.isAddTaskOpen}
          chosenCard={this.state.chosenCard}
          status={this.state.status}
          handleAddTask={this.handleAddTask.bind(this)}
          renderCircles={this.renderCircles.bind(this)}
        />
        <Grid container spacing={2} style={{ marginBottom: 20 }}>
          {this.state.status.map((i) => {
            return (
              <Grid item xs={3} style={{ textAlign: "-webkit-center" }}>
                <Paper
                  style={{
                    backgroundColor: "#202324",
                    color: "white",
                    width: "fit-content",
                    minWidth: 300,
                    height: "fit-content",
                    minHeight: 100,
                    position: "relative",
                    borderRadius: 15,
                    padding: 20,
                    paddingBottom: 40,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {i}
                  </div>
                  {tasks
                    .filter((task) => task.status === i)
                    .map((task) => (
                      <Paper
                        key={task.id}
                        style={{
                          backgroundColor: "#4B5563",
                          color: "white",
                          width: 250,
                          height: 80,
                          borderRadius: 15,
                          paddingTop: 10,
                          marginTop: 30,
                        }}
                        onClick={() => this.handleAddTask(task)}
                      >
                        <Grid container spacing={0}>
                          <Grid item xs={6}>
                            <div
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                float: "left",
                                marginLeft: 15,
                              }}
                            >
                              {task.name}
                            </div>
                          </Grid>
                          <Grid item xs={6}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginRight: 5,
                              }}
                            >
                              {this.renderCircles(task.status, task.id)}
                            </div>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 15,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      onClick={() => this.handleAddCard(i)}
                      style={{ cursor: "pointer" }}
                    >
                      <Grid item>
                        <img src={AddIcon} alt="Add Workspace" />
                      </Grid>
                      <Grid item>Add a card</Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default MainWorkspaceDetails;
