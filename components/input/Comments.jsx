import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import CommentList from './CommentList';
import NewComment from './NewComment';
import NotificationContext from '../../store/notification-context';
import classes from './comments.module.css';

function Comments() {
  const router = useRouter();
  const eventId = router.query.eventId;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!');
          });
        })
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
        .catch((error) => {
          setIsFetchingComments(false);
          notificationCtx.showNotification({
            title: 'Error!',
            message: error.message || 'Something went wrong!',
            status: 'error'
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending'
    });
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success'
        });
        console.log('data', data);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList comments={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
