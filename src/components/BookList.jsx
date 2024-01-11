import { useState } from 'react'
import SingleBook from './SingleBook'
import { Col, Form, Row } from 'react-bootstrap'

const Booklist = (props) => {

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQuery = (searchQueryValue) => {
    setSearchQuery(searchQueryValue)
  }

  return (
    <>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Search a book</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {props.books
          .filter((b) =>
            b.title.toLowerCase().includes(searchQuery)
          )
          .map((b) => (
            <Col xs={12} md={4} key={b.asin} data-testid="libro">
              <SingleBook book={b}  getSingleAsin={props.getSingleAsin} />
            </Col>
          ))}
      </Row>
    </>
  )
}


export default Booklist
