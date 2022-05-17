import './App.css';
import AddBook from './Components/AddBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import BookList from './Components/BookList';
import { useState } from 'react'

function App() {
  const [bookId, setBookId] = useState('')
  const handleBookId = (id) => {
    setBookId(id)
    console.log(bookId);
  }
  return (
    <>
      <Navbar bg='dark' variant='dark' className='header'>
        <Container >
          <Navbar.Brand href='#home'>
            Library Firebase CRUD
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ width: '600px' }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container style={{ width: '600px' }}>
        <Row>
          <Col>
            <BookList getBookId={handleBookId} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
