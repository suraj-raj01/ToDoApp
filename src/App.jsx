import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteRec, taskComplete, taskUncomplete, editSaveData } from "./todoSlice";
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { Container } from "react-bootstrap";

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const [task, setMytask] = useState("");
  const [edBtn, setEdbtn] = useState(true);
  const [edId, setEdID] = useState("");
  const mywork = useSelector((state) => state.todo.task);
  const dispatch = useDispatch();

  const delTask = (id) => {
    dispatch(deleteRec(id));
    toast("Delete Successfull!!");
  }
  const taskComp = (id) => {
    dispatch(taskComplete(id))
  }
  const taskUncomp = (id) => {
    dispatch(taskUncomplete(id))
  }
  const dataEdit = (id,data) => {
    setMytask(data);
    setEdbtn(false);
    setEdID(id);
  }
  const editSave = () => {
    dispatch(editSaveData({ id: edId, data: task }))
    setEdbtn(true)
    setMytask(" ")
    toast("Data Saved!!!");
  }


  let sno = 0;
  const ans = mywork.map((key) => {
    sno++;
    return (
      <>
        <tr style={{ textAlign: 'center' }}>
          <td>{sno} </td>
          <td>
            {key.status ? <span style={{ color: "red", textDecoration: "line-through" }}> {key.data}</span> : key.data}
          </td>

          <td> <img src="https://cdn-icons-png.freepik.com/512/1345/1345874.png" height='25px' width='25px' onClick={() => { delTask(key.id) }} /></td>

          <td>

            {key.status ? (

              <img src="https://i.pinimg.com/originals/d0/17/47/d01747c4285afa4e7a6e8656c9cd60cb.png" width='25' height='25' onClick={() => { taskUncomp(key.id) }} />

            ) : (
              <img src="https://www.nicepng.com/png/full/28-288509_check-clipart-yes-complete-clipart.png" width='25' height='25' onClick={() => { taskComp(key.id) }} />
            )}

          </td>
          <td>
            <img src="https://cdn-icons-png.flaticon.com/512/32/32355.png" height='25' width='25' onClick={() => { dataEdit(key.id, key.data) }} />
          </td>
        </tr>
      </>
    )
  })

  return (
    <>
      <Container>
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" style={{ fontWeight: 'bold', fontSize: '25px' }}>TODOAPP</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '300px' }}
                navbarScroll
              ></Nav>

              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Add Your Task"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => { setMytask(e.target.value) }}
                />
                {/* <Button variant="outline-success">Search</Button> */}
                {
                  edBtn ? (
                    <Button onClick={() => { dispatch(addTask({ id:Date.now(), data:task, status: false })) }} >Add Task</Button>
                  )
                    :
                    <Button onClick={editSave} variant="info">Edit Save</Button>
                }
              </Form>
              <div id="icons">
                {/* <img onClick={()=>{mode}} src="https://static-00.iconduck.com/assets.00/dark-theme-icon-512x512-185rlszm.png" alt="mode" height='20px' width='20px'/> */}
                <a href="https://www.linkedin.com/in/suraj-kumar-1965b0296/" target="_blank"><img src="https://blakeoliver.com.au/wp-content/uploads/2023/06/vecteezy_linkedin-logo-png-linkedin-icon-transparent-png_18930585_835.png" height='35px' width='35px' />
                </a>
                <a href="https://github.com/suraj-raj01/ToDoApp" target="_blank"><img src="https://pngimg.com/d/github_PNG65.png" height='35px' width='90px' />
                </a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <div style={
          {
            borderRadius: '10px',
            margin: 'auto',
            height: '75vh',
            width: '98%',
            border: '1px solid',
            overflowY: 'scroll',
          }
        }>
          <Table striped bordered hover variant="sm">
            <thead>
              <tr style={{ textAlign: 'center' }} id="head">
                <th>S No.</th>
                <th>Your Tasks</th>
                <th>Delete Records</th>
                <th>Complete/Incompelete</th>
                <th>Edit Data</th>
              </tr>
              {ans}
            </thead>
          </Table>
        </div>
        <div style={
          {
            height: '10vh',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }>
          Made by @surajkumar <br />
          everything is reserved by ©todoapp.com
        </div>
      </Container>
      <ToastContainer />
    </>
  )
}
export default App;