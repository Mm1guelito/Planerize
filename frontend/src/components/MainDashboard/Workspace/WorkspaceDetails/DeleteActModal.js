import React from "react";
import { Dialog, DialogContent, Button } from "@mui/material";

const DeleteActModal = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.isDeleteActOpen}
        onClose={props.handleToggleDeleteActModal}
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
        <div style={{ margin: 20, color: "white" }}>
          <DialogContent style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              You will take this comment out of play.
            </div>
            <Button
              style={{
                marginLeft: 10,
                backgroundColor: "#CA5369",
                color: "white",
                textTransform: "none",
                height: 40,
                width: 90,
              }}
              onClick={() => props.handleDelete(props.itemToDelete)}
            >
              Delete
            </Button>
          </DialogContent>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteActModal;
