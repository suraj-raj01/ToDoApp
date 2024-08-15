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
    toast("Task Complete!!");
  }
  const taskUncomp = (id) => {
    dispatch(taskUncomplete(id))
    toast("Task Uncomplete!!");
  }
  const dataEdit = (id, data) => {
    setMytask(data);
    setEdbtn(false);
    toast("Edit Your Task!!");
    setEdID(id);
  }
  const editSave = () => {
    dispatch(editSaveData({ id: edId, data: task }))
    setEdbtn(true)
    setMytask("")
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

          <td> <Button onClick={() => { delTask(key.id) }}>Delete</Button> </td>

          <td>

            {key.status ? (

              <Button onClick={() => { taskUncomp(key.id) }}> Uncomplete</Button>

            ) : (
              <Button onClick={() => { taskComp(key.id) }}>Complete</Button>
            )}

          </td>
          <td>
            <Button onClick={() => { dataEdit(key.id, key.data) }}> Edit Data</Button>
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
                    <Button onClick={() => { dispatch(addTask({ id: Date.now(), data: task, status: false })) }} >Add Task</Button>
                  )
                    :
                    <Button onClick={editSave} >Edit Save</Button>
                }
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* Enter your Task <input type="text" value={task} onChange={(e)=>{setMytask(e.target.value)}}/> */}
        {/* <Button onClick={()=>{dispatch(addTask({id:Date.now(),work:task}))}}>Add Task</Button> */}
        <br />
        <div style={
          {
            borderRadius:'10px',
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
                <th>Complete/Uncompelete</th>
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