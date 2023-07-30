import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const NewMemberModal = (props) => {
  const [memberToAdd, setMemberToAdd] = React.useState("");

  const handleChangeMemberValue = (value) => {
    setMemberToAdd(value);
  };

  return (
    <>
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
          <DialogTitle style={{ color: "#FFFFFF" }}>
            Share workspace
          </DialogTitle>
          <DialogContent>
            <TextField
              InputProps={{
                style: {
                  backgroundColor: "#FFFFFF",
                  width: 400,
                },
              }}
              placeholder="Email Address"
              size="small"
              value={memberToAdd}
              onChange={(e) => handleChangeMemberValue(e.target.value)}
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
              Share
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default NewMemberModal;
