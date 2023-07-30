import React from "react";
import {
  Dialog,
  DialogContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AvatarModal(props) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Dialog
        open={props.isDialogOpen}
        onClose={props.handleDialogClose}
        TransitionComponent={props.Transition}
        PaperProps={{
          style: {
            position: "absolute",
            color: "white",
            top: 0,
            right: 0,
            margin: "1rem",
            maxWidth: "300px",
            backgroundColor: "#202324",
            border: "1px solid #4977BC",
            borderRadius: 10,
          },
        }}
      >
        <div>
          <DialogContent>
            <div>Account</div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Avatar">ME</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ display: "block", color: "white", fontSize: 16 }}
                  >
                    Migs Evangelista
                  </Typography>
                }
                secondary={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid #DFBF4F",
                    }}
                  >
                    <div>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{
                          display: "block",
                          color: "white",
                          marginBottom: 5,
                          fontSize: 12,
                        }}
                      >
                        @migsevangelista
                      </Typography>
                    </div>
                  </div>
                }
              />
            </ListItem>
            <div
              style={{ marginLeft: 70, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Logout
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default AvatarModal;
