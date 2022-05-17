import React, { useState, useEffect } from "react";
import { Alert, Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import bookServices from "../Services/bookServices";
const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("available");
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };
    try {
      if (id !== undefined && id !== "") {
        await bookServices.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Book Updated Successfully" });
      } else {
        await bookServices.addBook(newBook);
        setMessage({ error: false, msg: "Book added Successfully" });
      }
    } catch (error) {
      setMessage({ error: true, msg: error.message });
    }
    setTitle("");
    setAuthor("");
  };
  const editHandler = async (id) => {
    setMessage("");
    try {
      const docSnap = await bookServices.getBook(id);
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (error) {
      console.log("error");
      setMessage({ error: true, msg: error.message });
    }
  };
  useEffect(() => {
    if (id !== undefined && id !== "") {
      editHandler(id);
    }
  }, [id]);

  return (
    <div>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic Example" className="mb-3">
            <Button
              variant="success"
              disabled={flag}
              onClick={(e) => {
                setStatus("available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("notAvailable");
                setFlag(false);
              }}
            >
              Not-Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" style={{ width: "150px" }}>
              Add/Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
