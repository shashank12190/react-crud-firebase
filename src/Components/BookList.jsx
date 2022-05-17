import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import bookServices from "../Services/bookServices";

const BookList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    const data = await bookServices.getAllBooks();
    const finalData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBooks(finalData);
  };
  const handleDelete = async (id) => {
    await bookServices.deleteBook(id);
    getBooks();
  };
  return (
    <div>
      <Button className="sm" variant="secondary" onClick={getBooks}>
        Refresh
      </Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
              <td>
                <Button variant="secondary" onClick={() => getBookId(book.id)}>
                  Edit
                </Button>
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
