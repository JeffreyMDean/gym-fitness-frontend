import { useState, useEffect } from "react";
import axios from 'axios';
                           // helps filter comments for a specific exercise
export function Comments({ exerciseId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState('');
// null shows regular view initially
  useEffect(() => {  // runs when component mounts or when exerciseId changes
    axios.get('http://localhost:3000/comments.json', {
      params: { //adds query parameter to filter comments by exercise_id
        exercise_id: exerciseId
      }
    })     //if its successfull...servers response to GET request
    .then(response => {
      setComments(response.data); //r.d comments retrieved from the server...then stored in comments state
      console.log(response.data);
    })
    .catch(error => console.error('Error fetching comments:', error));
  }, [exerciseId]); // ensures comments are fetched whenever a different exercise is selected

  //fx to a add a new comment
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

// fx to start editing a comment
const handleEditComment = (id, body) => {
  setEditingCommentId(id); // updates state for current comment being edited
  setEditedComment(body); // updates state with the comments actual text...allows component to pre-fill input field with the comment's existing text, so the user can modify it....updates the text being edited
};
              // unique identifier of comment to update...ex. Comment 1
const handleUpdateComment = (id) => {           //targets specific comment
  axios.patch(`http://localhost:3000/comments/${id}.json`, {
    comment: { // second argument, payload for request, contains data you want to update on the server
      body: editedComment // variable containing new comment text
    }
  })   //if request succesful, response from server passed to this callback fx
  .then(response => {
    setComments(comments.map(comment => comment.id === id? response.data : comment));  // setComments function updates the state. It maps over the current comments array and replaces the comment that matches the id with the updated comment received from the server
    setEditingCommentId(null);
    console.log('Comment updated:', response.data);
  })
  .catch(error => console.error('Error updating comment:', error));
};

// updates the state of comments using the setComments function. It maps over the existing comments array. For each comment, it checks if the comment’s id matches the id of the comment that was updated. If it matches, it replaces that comment with the updated data from the server (response.data). If it doesn't match, it keeps the existing comment unchanged.
// id: the parameter passed to the fx, representing the ID of the comment to update
// comment.id The ID of each individual comment being processed in the map

                           //unique identifier for specific comment in the state
const handleDeleteComment = (id) => {          //which comment on server to update
  axios.delete(`http://localhost:3000/comments/${id}.json`)
  .then(() => {
    setComments(comments.filter(comment => comment.id !== id));
    // checks whether the id of the current comment is not equal to the id we want to delete...filter function returns true if the condition (comment.id !== id) is satisfied, meaning that this comment should be included in the array
    console.log('Comment deleted');
  })
  .catch(error => console.error('Error deleting comment:', error));
};
                             //argument, obj passed by browser when change event occurs. contains details about event such as target element that triggered the event.
const handleChangeNewComment = (event) => {
  setNewComment(event.target.value);
};                  
// event is the event object passed to the fx when the input field's value changes
// event.target refers to the input field that triggered the event
// event.target.value - retrieves current value of that input field

const handleChangeEditedComment = (event) => {
  setEditedComment(event.target.value);
};                  // new value
              //React re-renders the <textarea> to show the new value.
return (
  <div>
    <h3>Comments</h3>
    <div>            
      {comments.map(comment => (
        <div key={comment.id}>  
          {editingCommentId === comment.id ? ( //editingCommentID piece of state that tracks which comment is currently being edited whereas comment.id is the unique identifier for each comment object in the comments array (each comment in the comments array has an id property that uniquely identtifes it)
            <div>  
              <textarea
                value={editedComment}
                onChange={handleChangeEditedComment} //onChange event handler triggered whenever <textarea changes. The handler (above) receives event object containing the new value typed by the user
              />
              <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>{comment.body}</p>
              <button onClick={() => handleEditComment(comment.id, comment.body)}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
    <textarea // user types into the <textarea> which triggers the onChange event
      value={newComment}
      onChange={handleChangeNewComment}
      placeholder="Enter new comment"
    />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
}

// after useer types into the <textarea>.....the browser creates an event object contatining information about the event and is automatically passed to the event handler function (behind the scenes)
// The event handler function (e.g. handleChangeNewComment) is called with the event object as its argument
// editingCommentId is the state that holds the ID of the comment currently being edited and in this case starts off as null whereas comment.id is the ID of the individual comment being rendered in the map function
