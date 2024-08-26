import { useState, useEffect } from "react";
import axios from 'axios';

export function Comments({ exerciseId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
// null shows regular view initially
  useEffect(() => {  // runs when component mounts or when exerciseId changes
    axios.get('http://localhost:3000/comments.json', {
      params: { //adds query parameters to the request URL
        exercise_id: exerciseId
      }
    })
    .then(response => {
      setComments(response.data); //r.d comments retrieved from the server
      console.log(response.data);
    })
    .catch(error => console.error('Error fetching comments:', error));
  }, [exerciseId]);
}

const handleAddComment = () => {
  axios.post('http://localhost:3000/comments.json', {
    comment: {
      exercise_id: exerciseId,
      body: newComment
    }
  })
  .then(response => {
    setComments([...comments, response.data]);
    setNewComment("");
    console.log('Comment added:', response.data);
  })
    .catch(error => console.error('Error adding comment:', error));
};
// ...comments takes all existing comments and puts them into a new array and response.data (new comment) is added to the end of this new array

const handleEditComment = (id, body) => {
  setEditingCommentId(id); // upadates state for current comment being edited
  setEditedComment(body); // updates state with the comments actual text...allows component to pre-fill input field with the comment's existing text, so the user can modiy it
};
                        // unique identifier of comment to update
const handleUpdateComment = (id) => {           //targets specific comment
  axios.patch(`http://localhost:3000/comments/${id}.json`, {
    comment: { // second argument, payload for request, contains data you want to update on the server
      body: editedComment // variable contatining new comment text
    }
  })   //if request succesful, response from server passed to this callback fx
  .then(response => {
    setComments(comments.map(comment => comment.id === id? response.data : comment));
    setEditingCommentId(null);
    console.log('Comment updated:', response.data);
  })
  .catch(error => console.error('Error updating comment:', error));
};

// updates the state of comments using the setComments function. It maps over the existing comments array. For each comment, it checks if the comment’s id matches the id of the comment that was updated. If it matches, it replaces that comment with the updated data from the server (response.data). If it doesn't match, it keeps the existing comment unchanged.

const handleDeleteComment = (id) => {
  axios.delete(`http://localhost:3000/comments/${id}.json`)
  .then(() => {
    setComments(comments.filter(comment => comment.id !== id));
    console.log('Comment deleted');
  })
  .catch(error => console.error('Error deleting comment:', error));
};