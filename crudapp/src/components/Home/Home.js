import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Delete, Edit } from "@mui/icons-material";
import { Container } from "@mui/system";
import { axiosInstance } from "../../config";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const defaultRow = {
  id: "",
  name: "",
  email: "",
  gender: "",
  status: ""
};

const Home = (props) => {
  const [row, setRow] = React.useState(defaultRow);
  const [confirm, setConfirm] = React.useState(false);

  const handleClickOpen = (row) => {
    setRow(row);
    setConfirm(true);
  };

  const handleConfirmYes = () => {
    axiosInstance.delete(`/api/deleteUser/${row.id}`).then((res) => {
      if (res.status === 200) {
        toast.success(`User "${row.name}" deleted successfully !`);
        setTimeout(() => loadData(), 500);
      }
      console.log(res);
    });
    console.log(row);
    setConfirm(false);
  };

  const handleConfirmClose = () => {
    setConfirm(false);
  };

  const [data, setData] = useState([]);

  const loadData = async () => {
    const resp = await axios.get("http://localhost:4000/api/getAllUsers");
    setData(resp.data);
  };

  useEffect(() => {
    loadData();
  }, []);

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

      <Container>
        <Container style={{ marginTop: "1.5%", marginBottom: "1.5%" }}>
          <Link to={"/addEditUser"}>
            <Button variant="contained" startIcon={<PersonAddAltIcon />}>
              Add User
            </Button>
          </Link>
        </Container>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 550 }}
            size="small"
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  style={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="right">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    {/* <Link to={`/view/${row.id}`}>
                      <IconButton aria-label="view">
                        <RemoveRedEye color="primary"/>
                      </IconButton>
                    </Link> */}
                    <Link to={`/addEditUser/${row.id}`}>
                      <IconButton aria-label="editUser">
                        <Edit color="secondary" />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickOpen(row)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={confirm}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" fontSize={18} fontWeight={"bold"} color={"red"}>
            {`Are you sure?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {`User '${row.name}' will be deleted !`}
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

export default Home;
