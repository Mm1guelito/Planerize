import React, { useState } from "react";
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
  AvatarGroup,
  Paper,
} from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import CardIcon from "../../../../static/cardIcon.png";
import AddIcon from "../../../../static/addIcon.png";
import DescIcon from "../../../../static/descIicon.png";
import DeleteActModal from "./DeleteActModal";
import NewTaskMemberModal from "./NewTaskMemberModal";

const theme = createTheme({
  palette: {
    customColorLess: {
      main: "#FB923C",
    },
    customColorMore: {
      main: "#159D72",
    },
  },
});

const TaskModal = (props) => {
  const [isTaskTextFieldVis, setTaskTextFieldVis] = useState(false);
  const [isActTextFieldVis, setActTextFieldVis] = useState(false);
  const [taskToAdd, setTaskToAdd] = useState("");
  const [activityToAdd, setActivityToAdd] = useState("");
  const [isDeleteActOpen, setDeleteActOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isTaskModalOpen, setTaskModalOpen] = useState(true);
  const [memberToAdd, setMemberToAdd] = useState("");
  const [isAddMemberOpen, setAddMemberOpen] = useState(false);

  const [listOfMembers, setListOfMembers] = useState(["ME", "MV", "KL"]);
  const [listOfTasks, setListOfTasks] = useState([
    {
      taskName: "Task - 001",
      date: "July 21, 2023",
      id: 1,
      status: "Done",
    },
    {
      taskName: "Task - 002",
      date: "July 21, 2023",
      id: 2,
      status: "inProgress",
    },
  ]);
  const [listOfActs, setListOfActs] = useState([
    {
      actDets:
        "Normal Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tristique sapien. Duis aliquet venenatis nibh, at vehicula lacus sodales vel. Pellentesque elit lectus, consequat vitae mattis et, varius ac ipsum. Aliquam semper congue quam, quis fermentum augue tempor at. Phasellus aliquet viverra lorem at pretium. Nam at ornare orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "July 21, 2023",
      id: 1,
      editor: "Migs Evangelista",
    },
    {
      actDets:
        "Normal Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel tristique sapien. Duis aliquet venenatis nibh, at vehicula lacus sodales vel. Pellentesque elit lectus, consequat vitae mattis et, varius ac ipsum. Aliquam semper congue quam, quis fermentum augue tempor at. Phasellus aliquet viverra lorem at pretium. Nam at ornare orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "July 21, 2023",
      id: 2,
      editor: "Migs Evangelista",
    },
  ]);

  const renderCircles = (status) => {
    const circleColors = {
      "To do": "#CA5369",
      "In progress": "#4977BC",
      "In Review": "#DFBF4F",
      Completed: "#159D72",
    };

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {props.status.map((s) => (
          <div
            key={s}
            style={{
              width: 20,
              height: 20,
              marginRight: 5,
              borderRadius: "50%",
              border: `2px solid ${circleColors[s]}`,
              boxSizing: "border-box",
              backgroundColor: areStatusesEqual(s, status)
                ? circleColors[s]
                : "transparent",
            }}
          />
        ))}
      </div>
    );
  };

  const areStatusesEqual = (status1, status2) => {
    return status1 === status2;
  };

  const handleStatusChange = (taskId) => {
    setListOfTasks((prevState) => {
      const updatedTasks = prevState.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: task.status === "Done" ? "inProgress" : "Done",
          };
        }
        return task;
      });

      return updatedTasks;
    });
  };

  const handleAddOrAddTask = (text) => {
    if (text === "Add Task" || text === "Cancel") {
      setTaskTextFieldVis(!isTaskTextFieldVis);
    } else {
      const currentDate = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = currentDate.toLocaleString(undefined, options);

      const task = {
        taskName: taskToAdd,
        date: formattedDate,
        id: listOfTasks.length + 1,
        status: "inProgress",
      };

      setListOfTasks((prevState) => [...prevState, task]);
      setTaskToAdd("");
      setTaskTextFieldVis(false);
    }
  };

  const handleSaveCancelAct = (text) => {
    if (text === "Cancel") {
      setActTextFieldVis(false);
      setActivityToAdd("");
    } else {
      const currentDate = new Date();
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = currentDate.toLocaleString(undefined, options);

      const act = {
        actDets: activityToAdd,
        date: formattedDate,
        id: listOfActs.length + 1,
        editor: "Migs Evangelista",
      };

      setListOfActs((prevState) => [...prevState, act]);
      setActTextFieldVis(false);
      setActivityToAdd("");
    }
  };

  const handleToggleDeleteActModal = (item) => {
    setDeleteActOpen(!isDeleteActOpen);
    setItemToDelete(item);
    setTaskModalOpen(false);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      setListOfActs((prevState) =>
        prevState.filter((act) => act.id !== itemToDelete.id)
      );
      setTaskModalOpen(true);
    }
    setDeleteActOpen(false);
    setItemToDelete(null);
  };

  const getProgressPercentage = () => {
    const totalTasks = listOfTasks.length;
    const completedTasks = listOfTasks.filter(
      (task) => task.status === "Done" || task.status === "Completed"
    ).length;

    if (totalTasks === 0) {
      return 0;
    }

    return Math.round((completedTasks / totalTasks) * 100);
  };

  const handleToggleAddMemberModal = () => {
    setAddMemberOpen(!isAddMemberOpen);
    setTaskModalOpen(!isTaskModalOpen);
  };

  const handleChangeMemberValue = (value) => {
    setMemberToAdd(value);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <NewTaskMemberModal
          buttonText={"Add"}
          memberToAdd={memberToAdd}
          isAddMemberOpen={isAddMemberOpen}
          handleChangeMemberValue={handleChangeMemberValue}
          handleToggleAddMemberModal={handleToggleAddMemberModal}
        />
        <DeleteActModal
          isDeleteActOpen={isDeleteActOpen}
          handleToggleDeleteActModal={handleToggleDeleteActModal}
          handleDelete={handleDelete}
          itemToDelete={itemToDelete}
        />
        {isTaskModalOpen && (
          <Dialog
            open={props.isAddTaskOpen}
            onClose={props.handleAddTask}
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
                      <Grid item>{props.chosenCard.name}</Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: 15,
                      }}
                    >
                      {renderCircles(props.chosenCard.status)}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <div
                      style={{
                        position: "relative",
                        width: 20,
                        height: 20,
                        marginRight: 10,
                        borderRadius: "50%",
                        border: `2px solid #CA5369`,
                        boxSizing: "border-box",
                        backgroundColor: "#CA5369",
                        float: "right",
                        cursor: "pointer",
                      }}
                      onClick={props.handleAddTask}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 8,
                          height: 8,
                          lineHeight: "8px",
                          textAlign: "center",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "10px",
                        }}
                      >
                        X
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </DialogTitle>
              <Scrollbars style={{ width: 520, height: 700 }}>
                <DialogContent style={{ color: "#FFFFFF" }}>
                  <div style={{ marginLeft: 20, marginTop: 15 }}>
                    <Grid container spacing={2} style={{ cursor: "pointer" }}>
                      <Grid item>
                        <img
                          src={AddIcon}
                          alt="Add Member"
                          onClick={() => handleToggleAddMemberModal()}
                        />
                      </Grid>
                      <Grid item>Add Member</Grid>
                    </Grid>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                    >
                      <AvatarGroup max={4}>
                        {listOfMembers.map((i) => (
                          <Avatar alt={i} style={{ fontSize: 10 }}>
                            {i}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>
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
                      getProgressPercentage()
                    )}%`}</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={getProgressPercentage()}
                      color={
                        getProgressPercentage() > 50
                          ? "customColorMore"
                          : "customColorLess"
                      }
                      style={{ marginBottom: 10, width: 450 }}
                    />
                    <div>
                      {listOfTasks.map((i) => (
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
                                  onClick={() => handleStatusChange(i.id)}
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
                      ))}
                    </div>
                    <TextField
                      value={taskToAdd}
                      InputProps={{
                        style: {
                          backgroundColor: "#FFFFFF",
                          width: 450,
                          display: isTaskTextFieldVis === false ? "none" : "",
                        },
                      }}
                      placeholder="Add task"
                      size="small"
                      onChange={(e) => setTaskToAdd(e.target.value)}
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
                        handleAddOrAddTask(
                          isTaskTextFieldVis ? "Add" : "Add Task"
                        )
                      }
                    >
                      {isTaskTextFieldVis === true ? "Add" : "Add Task"}
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        textTransform: "none",
                        height: 25,
                        width: 80,
                        marginTop: 15,
                        display: isTaskTextFieldVis === false ? "none" : "",
                      }}
                      onClick={() => handleAddOrAddTask("Cancel")}
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
                  <div style={{ marginTop: 20, marginLeft: 20 }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar style={{ fontSize: 10 }}>ME</Avatar>
                      </Grid>
                      <Grid item>
                        <TextField
                          InputProps={{
                            style: {
                              backgroundColor: "#FFFFFF",
                              width: 395,
                            },
                          }}
                          value={activityToAdd}
                          placeholder="Write a comment..."
                          size="small"
                          onChange={(e) => setActivityToAdd(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      style={{
                        backgroundColor: "#4977BC",
                        color: "white",
                        textTransform: "none",
                        height: 25,
                        width: 80,
                        marginTop: 15,
                        marginLeft: 56,
                        display: activityToAdd === "" ? "none" : "",
                      }}
                      onClick={() => handleSaveCancelAct("Save")}
                    >
                      Save
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        textTransform: "none",
                        height: 25,
                        width: 80,
                        marginTop: 15,
                        display: activityToAdd === "" ? "none" : "",
                      }}
                      onClick={() => handleSaveCancelAct("Cancel")}
                    >
                      Cancel
                    </Button>
                    {listOfActs.map((i) => (
                      <React.Fragment key={i.id}>
                        <div style={{ marginTop: 30 }}>
                          <Grid container spacing={0}>
                            <Grid item xs={6}>
                              <Grid container spacing={2}>
                                <Grid item>
                                  <Avatar
                                    style={{
                                      backgroundColor: "#159D72",
                                      fontSize: 10,
                                    }}
                                  >
                                    ME
                                  </Avatar>
                                </Grid>
                                <Grid item>
                                  <div style={{ paddingTop: 8 }}>
                                    {i.editor}
                                  </div>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6}>
                              <div style={{ paddingTop: 8, float: "right" }}>
                                {i.date}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                        <div style={{ marginLeft: 55, marginTop: 10 }}>
                          <Paper
                            style={{
                              maxHeight: 300,
                              padding: 20,
                              maxWidth: 395,
                              borderRadius: 20,
                            }}
                          >
                            {i.actDets}
                          </Paper>
                          <div
                            style={{
                              backgroundColor: "transparent",
                              color: "white",
                              marginTop: 15,
                              marginBottom: 20,
                              float: "right",
                              cursor: "pointer",
                              marginRight: 10,
                            }}
                            onClick={() => handleToggleDeleteActModal(i)}
                          >
                            Delete
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </DialogContent>
              </Scrollbars>
            </div>
          </Dialog>
        )}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default TaskModal;
