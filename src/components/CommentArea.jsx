import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const headerAuth = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliZjkyZGUwZGQxZDAwMTgyZDE3MzQiLCJpYXQiOjE3MDQ3MjA2ODUsImV4cCI6MTcwNTkzMDI4NX0.FMB9-4UP4aGTvZNZwyRowLKitFA64t8Q8gQ2gt6sQF0"}

const CommentArea = (props) => {
  const [comments, setComments] = useState([])
  const [start, setStart] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleComments = (commentList) => {
    setComments(commentList)
  }

/*   componentDidUpdate(prevProps, prevState){
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        start: false,
        isLoading : true,
      })
            this.getBooks();
        }
  } */

  useEffect(() => {
    if (!start){
    console.log("useEffect")
    setIsLoading(true)
    getBooks()
    }
    setStart(false)
/*     getBooks() */
  }, [props.asin])

  const getBooks = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
          props.asin,
        {
          headers: headerAuth
        }
      )
      console.log(response)
      console.log("l'asin dalla fetch è:", props.asin)
      if (response.ok) {
        let comments = await response.json()
        handleComments(comments)
        setIsLoading(false)
        setIsError(false)
      } else {
        console.log('error')
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsError(true)
    }
  }

  return (
    <div className="text-center">
      {start && <p>Clicca su un libro per vedere i commenti:</p>}
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )
}

export default CommentArea
