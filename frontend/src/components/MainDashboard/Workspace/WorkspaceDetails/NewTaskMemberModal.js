import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const NewTaskMemberModal = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.isAddMemberOpen}
        onClose={props.handleToggleAddMemberModal}
        fullWidth={true}
        PaperProps={{
          style: {
            margin: "1rem",
            backgroundColor: "#202324",
            border: "1px solid #4977BC",
            borderRadius: 10,
          },
        }}
      >
        <div style={{ margin: 20 }}>
          <DialogTitle style={{ color: "#FFFFFF" }}>Members</DialogTitle>
          <DialogContent>
            <TextField
              InputProps={{
                style: {
                  backgroundColor: "#FFFFFF",
                  width: 400,
                },
              }}
              placeholder="Search Members"
              size="small"
              value={props.memberToAdd}
              onChange={(e) => props.handleChangeMemberValue(e.target.value)}
            />
            <Button
              style={{
                marginLeft: 10,
                backgroundColor: "#58C1A8",
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
                height: 40,
                width: 90,
              }}
              onClick={props.handleToggleAddMemberModal}
            >
              Add
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default NewTaskMemberModal;
