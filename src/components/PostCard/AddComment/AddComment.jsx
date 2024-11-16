import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import Textarea from '../../Form/Textarea/Textarea';
import { useState } from 'react';
import useAuth from '../../../contexts/Auth/useAuth';

function AddComment({ textareaRef, handleAddComment }) {
  const { user } = useAuth();
  const [addCommentFetch, setAddCommentFetch] = useState();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles.addComment}>
      <div>
        <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
      </div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <Textarea
          name="content"
          placeholder="Write a comment..."
          ref={textareaRef}
          isControlled={true}
          inputValue={inputValue}
          setInputValue={setInputValue}
        ></Textarea>
        <SubmitButton
          type="submit"
          name="Post"
          style={{ borderRadius: '10px' }}
        />
      </form>
      {addCommentFetch &&
        addCommentFetch.msg.map((err, index) => <p key={index}>{err.msg}</p>)}
    </div>
  );
}
export default AddComment;
