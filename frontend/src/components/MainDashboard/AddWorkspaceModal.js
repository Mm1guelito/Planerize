import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

const AddWorkspaceModal = (props) => {
  return (
    <>
      <Dialog
        open={props.isAddWorkspaceOpen}
        onClose={props.handleToggleAddWorkspaceModal}
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
          <DialogTitle style={{ color: "#FFFFFF" }}>Add workspace</DialogTitle>
          <DialogContent>
            <TextField
              InputProps={{
                style: {
                  backgroundColor: "#FFFFFF",
                  width: 400,
                },
              }}
              placeholder="Workspace name"
              size="small"
              value={props.workspaceToAdd}
              onChange={(e) => props.handleChangeWorkspaceValue(e.target.value)}
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
              onClick={props.handleAddWorkspace}
            >
              Add
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default AddWorkspaceModal;
