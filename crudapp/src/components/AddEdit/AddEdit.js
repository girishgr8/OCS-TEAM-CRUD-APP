import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { axiosInstance } from "../../config";
import { Card, Container } from "@mui/material";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const defaultValues = {
  name: "",
  email: "",
  gender: "",
  status: "",
};

const AddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState(defaultValues);
  const { name, email, gender, status } = formValues;
  const [confirm, setConfirm] = React.useState(false);

  const handleClickOpen = () => {
    setConfirm(true);
  };

  const handleConfirmYes = () => {
    setTimeout(() => navigate("/"), 500);
    setConfirm(false);
  };

  const handleConfirmClose = () => {
    setConfirm(false);
  };

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/api/getUser/${id}`)
        .then((res) => {
          setFormValues({ ...res.data[0] });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axiosInstance
        .put(`/api/updateUser/${id}`, formValues)
        .then((res) => {
          if (res.status === 200) {
            toast.success(`User '${formValues.name}' updated successfully`);
          }
          setTimeout(() => navigate("/"), 500);
        })
        .catch((err) => console.log(err));
    } else {
      const { name, email, gender, status } = formValues;
      if (!name || !email || !gender || !status) {
        toast.warn("Please specify all the required fields");
      } else {
        axiosInstance.post("/api/addUser", formValues).then((res) => {
          if (res.status === 200) {
            toast.success(`User '${formValues.name}' added successfully`);
          }
          setTimeout(() => navigate("/"), 500);
        });
      }
    }
    console.log(formValues);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#D2F4FB",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              CRUD APP for OCS TEAM
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Container style={{ marginTop: "2%" }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <h2>{!id ? "Add User" : "Edit User"}</h2>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              margin={1}
              spacing={3}
            >
              <Grid item>
                <TextField
                  style={{ minWidth: "400px" }}
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  required
                  value={name || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item>
                <TextField
                  style={{ minWidth: "400px" }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="text"
                  required
                  value={email || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item>
                <FormControl required style={{ flexDirection: "row" }}>
                  <FormLabel style={{ marginTop: "6px", marginRight: "10px" }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    name="gender"
                    value={gender || ""}
                    onChange={handleInputChange}
                    row
                  >
                    <FormControlLabel
                      key="male"
                      value="male"
                      control={<Radio size="small" />}
                      label="Male"
                    />
                    <FormControlLabel
                      key="female"
                      value="female"
                      control={<Radio size="small" />}
                      label="Female"
                    />
                    <FormControlLabel
                      key="other"
                      value="other"
                      control={<Radio size="small" />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl required style={{ flexDirection: "row" }}>
                  <FormLabel style={{ marginTop: "10px", marginRight: "10px" }}>
                    Status
                  </FormLabel>
                  <Select
                    required
                    name="status"
                    value={status}
                    onChange={handleInputChange}
                  >
                    <MenuItem key="active" value="active">
                      Active
                    </MenuItem>
                    <MenuItem key="inactive" value="inactive">
                      Inactive
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                marginTop={2}
                marginBottom={2}
                style={{
                  justifyItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  style={{
                    marginTop: "2%",
                    minWidth: "90px",
                    marginRight: "20px",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {id ? "Update" : "Add"}
                </Button>
                <Button
                  style={{ marginTop: "2%", minWidth: "80px" }}
                  variant="contained"
                  color="warning"
                  onClick={handleClickOpen}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
        <Dialog
          open={confirm}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            fontSize={18}
            fontWeight={"bold"}
            color={"red"}
          >
            {`Are you sure?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {id
                ? `Your edited changes for user ${name} will be not updated !`
                : `New user ${name} will not be added !`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>No</Button>
            <Button onClick={handleConfirmYes} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};
export default AddEdit;
