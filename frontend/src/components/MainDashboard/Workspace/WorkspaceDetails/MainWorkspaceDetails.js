import React, { useState, useRef } from "react";
import { Grid, Paper } from "@mui/material";
import AddIcon from "../../../../static/addIcon.png";
import TaskModal from "./TaskModal";
import SnackBarErrorHandling from "../../../snackBarErrorHandling";

const MainWorkspaceDetails = (props) => {
  let cardList = props.chosenWorkspaceDetails;
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [chosenCard, setChosenCard] = useState([]);
  const statusList = ["to do", "in progress", "in review", "completed"];
  const apiUrl = "http://127.0.0.1:3000";
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const snackbarRef = useRef(null);

  const handleShowSnackbar = (message, severity) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
    setMessage("");
    setSeverity("");
  };

  const areStatusesEqual = (status1, status2) => {
    return (
      status1.trim().toLocaleLowerCase() === status2.trim().toLocaleLowerCase()
    );
  };

  const renderCircles = (status, taskId) => {
    const circleColors = {
      "to do": "#CA5369",
      "in progress": "#4977BC",
      "in review": "#DFBF4F",
      completed: "#159D72",
    };

    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {statusList.map((s) => (
          <div
            key={s}
            style={{
              width: 15,
              height: 15,
              marginRight: 5,
              borderRadius: "50%",
              border: `2px solid ${circleColors[s]}`,
              boxSizing: "border-box",
              backgroundColor: areStatusesEqual(s, status)
                ? circleColors[s]
                : "transparent",
              cursor: "pointer",
            }}
            onClick={(e) => handleUpdateCardStatus(e, s, taskId)}
          />
        ))}
      </div>
    );
  };

  const handleViewTask = (task) => {
    console.log("task", task);
    handleGetCardDetails(task._id);
  };

  const handleCloseAddTask = () => {
    setIsAddTaskOpen(false);
  };
  const handleGetCardDetails = (id) => {
    console.log("triggered");
    const url = new URL(`${apiUrl}/v1/card/${id}`);

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
        console.log("data from backend", messageData);
        console.log("URL", url);
        console.log("card dets", messageData.data[0]);
        setChosenCard(messageData.data[0]);
        setIsAddTaskOpen(true);
      })
      .catch((error) => {
        handleShowSnackbar(
          "An error occurred while processing your request.",
          "error"
        );
        console.error("Error:", error);
      });
  };

  const handleAddCard = () => {
    const url = `${apiUrl}/v1/card/${cardList[0]._id}`;
    const payload = {
      title: `Card ${cardList[0].card_data.length + 1}`,
      description: "",
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
        props.handleGetChosenWorkSpaceDetails(cardList[0]._id);
      })
      .catch((error) => {
        handleShowSnackbar(
          "An error occurred while processing your request.",
          "error"
        );
        console.error("Error:", error);
      });
  };

  const handleUpdateCardStatus = (e, newStatus, taskId) => {
    e.stopPropagation();
    const url = `${apiUrl}/v1/card/${taskId}`;
    const payload = {
      status: newStatus,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(payload),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((messageData) => {
        props.handleGetChosenWorkSpaceDetails(cardList[0]._id);
      })
      .catch((error) => {
        handleShowSnackbar(
          "An error occurred while processing your request.",
          "error"
        );
        console.error("Error:", error);
      });
  };

  return (
    <>
      {chosenCard.length === 0 ? (
        ""
      ) : (
        <TaskModal
          isAddTaskOpen={isAddTaskOpen}
          chosenCard={chosenCard}
          status={statusList}
          handleViewTask={handleViewTask}
          handleCloseAddTask={handleCloseAddTask}
          renderCircles={renderCircles}
        />
      )}
      <SnackBarErrorHandling
        handleCloseSnackbar={handleCloseSnackbar}
        open={open}
        message={message}
        snackbarRef={snackbarRef}
        severity={severity}
      />
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        {statusList.map((i) => {
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
                {cardList[0].card_data
                  .filter((task) => task.status === i)
                  .map((task) => (
                    <Paper
                      key={task._id}
                      style={{
                        backgroundColor: "#4B5563",
                        color: "white",
                        width: 250,
                        height: 80,
                        borderRadius: 15,
                        paddingTop: 10,
                        marginTop: 30,
                      }}
                      onClick={() => handleViewTask(task)}
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
                            {task.title}
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
                            {renderCircles(task.status, task._id)}
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
                    onClick={() => handleAddCard()}
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
    </>
  );
};

export default MainWorkspaceDetails;
