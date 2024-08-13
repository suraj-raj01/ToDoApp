import { useSelector,useDispatch } from "react-redux";
import { addTask } from "./todoSlice";
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { Container } from "react-bootstrap";

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App = () =>{
  const [task,setMytask] = useState("");
  const mywork = useSelector((state)=>state.todo.task);
  const dispatch = useDispatch();
  console.log(mywork);
  let sno=0;
  const ans = mywork.map((key)=>{
    sno++;
    return(
      <>
      <tr>
        <td>{sno}</td>
        <td>{key.work}</td>
        <td>{<button onClick={()=>{}}>delete</button>}</td>
      </tr>
      </>
    )
  })

  return(
    <>
    <Container>
    <div style={
      {
        display:'flex',
        gap:'20px',
        alignItems:'center',
        justifyContent:'center',
        height:'15vh'
      }
    }>
    <h1 style={{fontWeight:'bold'}}>ToDoApp</h1>
    <Navbar>
      
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Add your Task"
              className=" mr-sm-2"
              value={task} 
              onChange={(e)=>{setMytask(e.target.value)}}
            />
          </Col>
          <Col xs="auto">
            <Button onClick={()=>{dispatch(addTask({id:Date.now(),work:task}))}} variant="success">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
    </div>
    {/* Enter your Task <input type="text" value={task} onChange={(e)=>{setMytask(e.target.value)}}/> */}
    {/* <button onClick={()=>{dispatch(addTask({id:Date.now(),work:task}))}}>Add Task</button> */}
    
    <div style={
      {
        height:'75vh',
        width:'100%',
        border:'1px solid',
        overflowY:'scroll',
      }
    }>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Your Task</th>
          <th>Delete Record</th>
        </tr>
        {ans}
      </thead>
      </Table>
    </div>
    </Container>
    </>
  )
}
export default App;