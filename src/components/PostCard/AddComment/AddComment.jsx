import styles from './AddComment.module.css';
import TextareaWithRef from '../../Form/Textarea/TextareaWithRef';
import { useReducer } from 'react';
import useAuth from '../../../contexts/Auth/useAuth';
import {
  initialCommentFormState,
  commentFormRules,
} from '../../../reducers/initialCommentFormState';
import handleInputChange from '../../../utils/formHelpers/handleInputChange';
import createFormReducer from '../../../utils/reducerHelpers/createFormReducer';
import Button from '../../Form/Button/Button';
import isFormValid from '../../../utils/formHelpers/isFormValid';

function AddComment({ textareaRef, handleAddComment }) {
  const { user } = useAuth();

  const commentFormReducer = createFormReducer(commentFormRules);

  const [formState, dispatch] = useReducer(
    commentFormReducer,
    initialCommentFormState
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid(formState, dispatch)) {
      handleAddComment(formState.content);
      dispatch({
        type: 'reset_input_value',
        initialState: initialCommentFormState,
      });
    }
  };

  const handleChange = (e) => {
    handleInputChange(e, dispatch);
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
          onChange={handleChange}
          error={formState.errors.content}
        ></TextareaWithRef>
        <Button
          type="submit"
          style={{ borderRadius: '10px', maxHeight: '2.7em' }}
        >
          Post
        </Button>
      </form>
    </div>
  );
}
export default AddComment;
