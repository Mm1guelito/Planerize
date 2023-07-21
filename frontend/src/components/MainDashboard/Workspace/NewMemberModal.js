import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

class NewMemberModal extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.isAddMemberOpen}
          onClose={this.props.handleToggleAddMemberModal}
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
                value={this.props.memberToAdd}
                onChange={(e) =>
                  this.props.handleChangeMemberValue(e.target.value)
                }
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
                onClick={this.props.handleToggleAddMemberModal}
              >
                Share
              </Button>
            </DialogContent>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default NewMemberModal;
