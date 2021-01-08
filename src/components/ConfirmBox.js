import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {}, [props.action, props.addToast]);

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    },
  }));

  const handleBack = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.action();
    props.addToast();
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBack}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc chắn muốn thực hiện {props.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="primary">
            Quay lại
          </Button>
          <Button onClick={handleSave} color="secondary">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default AlertDialogSlide;
