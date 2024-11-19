import SubmitButton from '../../Form/Buttons/SubmitButton';
import styles from './AddComment.module.css';
import TextareaWithRef from '../../Form/Textarea/TextareaWithRef';
import { useReducer } from 'react';
import useAuth from '../../../contexts/Auth/useAuth';
import formReducer from '../../../reducers/formReducer';
import {
  initialCommentFormState,
  commentFormRules,
} from '../../../reducers/initialCommentFormState';

function AddComment({ textareaRef, handleAddComment }) {
  const { user } = useAuth();

  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, commentFormRules),
    initialCommentFormState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });
    if (formState.isValid) {
      handleAddComment(formState.content);
      dispatch({
        type: 'reset_input_value',
        initialState: initialCommentFormState,
      });
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.addComment}>
      <div>
        <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
      </div>
      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <TextareaWithRef
          name="content"
          placeholder="Write a comment..."
          ref={textareaRef}
          value={formState.content}
          onChange={handleInputChange}
          error={formState.errors.content}
        ></TextareaWithRef>
        <SubmitButton type="submit" style={{ borderRadius: '10px', maxHeight: '2.7em' }}>
          Post
        </SubmitButton>
      </form>
    </div>
  );
}
export default AddComment;
