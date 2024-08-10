import { useState, useEffect } from "react";
import axios from 'axios';

export function Comments({ exerciseId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/comments.json', {
      params: {
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


