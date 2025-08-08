import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as hootService from '../../services/hootService'
import CommentForm from '../CommentForm/CommentForm'
import { Link } from 'react-router-dom'
import styles from './HootDetails.module.css'
import Loading from '../Loading/Loading'
import Icon from '../Icon/Icon'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo'


const HootDetails = (props) => {

  const { hootId } = useParams()
  const [hoot, setHoot] = useState()
  
  useEffect(() => {
    // fetch a single hoot
    const fetchHoot = async () => {
      // call the hoot service
      const hootData = await hootService.show(hootId)
      setHoot(hootData)
    }
    fetchHoot()
  }, [hootId])

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(commentFormData, hootId)
    setHoot({...hoot, comments: [...hoot.comments, newComment]})
  }

  const handleDeleteComment = async(hootId, commentId) => {
    try {
      await hootService.deleteComment(hootId, commentId)
      setHoot({
        ...hoot,
        comments: hoot.comments.filter((comment) => comment._id !== commentId),
      });
    } catch (err) {
      console.error('Failed to delete comment:', err)
    }
  }

  if (!hoot) return <Loading />

  return (
    <main className={styles.container}>
        <section>
      <header>
        <p>{hoot.category}</p>
        <h2>{hoot.title}</h2>
        <AuthorInfo content={hoot} />
          {hoot.author._id === props.user?._id && (
            <>
            <Link to={`/hoots/${hootId}/edit`}>
            <Icon category="Edit" /></Link>
            <button onClick={() => props.handleDeleteHoot(hootId)}>
            <Icon category="Trash" /></button>
            </>
            
        )}
             
        
      </header>
      <p>{hoot.text}</p>
      </section>
      <hr/>
      <h2>Comments</h2>
      {!hoot.comments.length && <p>There are no comments.</p>}
      {hoot.comments.map((comment) => {
        const authorId = comment.author._id
        
        return (
          <article key={comment._id}>
            <header>
            <AuthorInfo content={comment} />
            
            
            {authorId === props.user?._id && (
              <>
                <Link to={`/hoots/${hootId}/comments/${comment._id}/edit`}><Icon category="Edit" /></Link>
                <button onClick={() => handleDeleteComment(hootId, comment._id)}><Icon category="Trash" /></button>
              </>
            )}
            </header>
            
            
            <p>{comment.text}</p>
            <hr/>

          </article>
          
        )
      })}
      <CommentForm handleAddComment={handleAddComment} />
      <hr/>
    </main>
  )
}

export default HootDetails