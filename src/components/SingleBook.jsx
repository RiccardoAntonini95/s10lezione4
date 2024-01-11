import { useState } from 'react'
import { Card } from 'react-bootstrap'

const SingleBook = (props) => {
  const [selected, setSelected] = useState(false)

  return (
    <>
      <Card
        onClick={() => {props.getSingleAsin(`${props.book.asin}`); setSelected(!selected)}}
        style={{ border: selected ? '3px solid red' : 'none' }}
        data-testid="img-card"
      >
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>
            {props.book.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}


export default SingleBook
