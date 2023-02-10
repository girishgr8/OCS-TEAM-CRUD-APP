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
      axiosInstance.post("/api/addUser", formValues).then((res) => {
        if (res.status === 200) {
          toast.success(`User '${formValues.name}' added successfully`);
        }
        setTimeout(() => navigate("/"), 500);
      });
    }
    console.log(formValues);
  };

  return (
    <div>
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                <FormControl style={{ flexDirection: "row" }}>
                  <FormLabel style={{ marginTop: "10px", marginRight: "10px" }}>
                    Status
                  </FormLabel>
                  <Select
                    name="status"
                    required
                    value={status || "active"}
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
              <Button
                style={{ marginTop: "2%" }}
                variant="contained"
                color="primary"
                type="submit"
              >
                {id ? "Update" : "Add"}
              </Button>
            </Grid>
          </form>
        </Card>
      </Container>
    </div>
  );
};
export default AddEdit;
