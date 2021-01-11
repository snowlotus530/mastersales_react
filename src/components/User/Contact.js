import React, { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { UserConsumer } from "../../userContext";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Title from "./Title";
import ConfirmDialog from "../ConfirmBox";
import { useToasts } from "react-toast-notifications";
import useForm from "../../useForm";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
    justifyContent: "center",
    alignSelf: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(6),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  seeMore: {
    margin: theme.spacing(3),
  },
}));

export default function Contact(props) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const { addToast } = useToasts();
  const rows = props.value.contacts;
  const valueUser = props.value;

  const childRef = useRef();

  const initialFieldValues = {
    question: "",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("question" in fieldValues)
      temp.question = fieldValues.question ? "" : "Hãy nhập câu hỏi";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let questionRes = await valueUser.postContact(values.question);
      if (questionRes !== null) {
        valueUser.setContactsOfUser();
        setIsEdit(false);
        addToast("Đặt câu hỏi khách hàng thành công", {
          appearance: "success",
        });
        //   //props.history.push("/");
      } else {
        addToast("Có lỗi, cùng thử lại nhé", {
          appearance: "warning",
        });
      }
    }
  };

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item xs={12}>
        {/* <UserConsumer>
          {(valueUser) => {
            
            return ( */}
        <Paper className={classes.paper}>
          {isEdit === false ? (
            <React.Fragment>
              <Grid
                container
                direction="row"
                alignItems="center"
                style={{ marginBottom: 10 }}
              >
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => valueUser.setContactsOfUser()}
                  >
                    <span>
                      <i className="fas fa-sync">{` Refresh`}</i>
                    </span>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button onClick={() => alert("this is")}>Sửa</Button>
                </Grid>
              </Grid>
              <Title>Bảng tư vấn</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">STT</TableCell>
                    <TableCell align="center">Câu hỏi</TableCell>
                    <TableCell align="center">Trả lời</TableCell>
                    <TableCell align="center">Thời gian hỏi</TableCell>
                    <TableCell align="center">Thời gian trả lời</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows.map((row, index) =>
                      row.isDeleted == false ? (
                        <TableRow key={row.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.cauHoi}</TableCell>
                          <TableCell align="center">{row.traLoi}</TableCell>
                          <TableCell align="center">
                            {moment(row.ngayDat).format("DD/MM/YYYY, h:mm:ss")}
                          </TableCell>
                          <TableCell align="center">
                            {row.nguoiTraLoi !== null
                              ? moment(row.ngayTraLoi).format(
                                  "DD/MM/YYYY, h:mm:ss"
                                )
                              : "Chưa trả lời"}
                          </TableCell>
                          <TableCell>
                            <Link
                              color="secondary"
                              href="#"
                              onClick={() => {
                                childRef.current.handleClickOpen();
                              }}
                            >
                              <span>
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </Link>
                            <ConfirmDialog
                              ref={childRef}
                              action={() => valueUser.deleteContact(row.id)}
                              title={"Hủy câu hỏi"}
                              addToast={() => {
                                addToast(`Hủy câu hỏi thành công`, {
                                  appearance: "success",
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                </TableBody>
              </Table>
              <div className={classes.seeMore}>
                {/* <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                >
                  Phí phụ thu:{" "}
                  {Number(props.total - totalWithoutTax).toLocaleString()}đ
                </Typography> */}
              </div>
              <Button onClick={() => setIsEdit(true)}>Liên hệ</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Liên hệ
              </Typography>
              <Grid container spacing={1}>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        //margin="normal"
                        required
                        style={{ width: 500 }}
                        id="question"
                        label="Nội dung"
                        name="question"
                        autoComplete="off"
                        autoFocus
                        rows={3}
                        multiline
                        value={values.question}
                        onChange={handleInputChange}
                        {...(errors.question && {
                          error: true,
                          helperText: errors.question,
                        })}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={() => setIsEdit(false)}
                        fullWidth
                        // variant="contained"
                        // color="primary"
                        className={classes.submit}
                      >
                        Trở lại
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        // variant="contained"
                        // color="primary"
                        className={classes.submit}
                      >
                        Gửi
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </React.Fragment>
          )}
        </Paper>
        {/* }}
        </UserConsumer> */}
      </Grid>
    </Grid>
  );
}
