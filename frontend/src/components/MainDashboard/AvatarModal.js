import React, { Component } from "react";
import { Dialog } from "@mui/material";

class AvatarModal extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.isDialogOpen}
          onClose={this.props.handleDialogClose}
          TransitionComponent={this.props.Transition}
          PaperProps={{
            style: {
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1rem",
              maxWidth: "300px", // Customize the maximum width of the dialog
              backgroundColor: "#fff", // Customize the background color
            },
          }}
        >
          <div>Dialog Content</div>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AvatarModal;
