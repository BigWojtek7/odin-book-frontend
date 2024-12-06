import styles from './AddPost.module.css';
import SubmitButton from '../../Form/Button/SubmitButton';
import Textarea from '../../Form/Textarea/Textarea';
import { useReducer } from 'react';
import formReducer from '../../../reducers/formReducer';
import {
  initialPostFormState,
  postFormRules,
} from '../../../reducers/initialPostFormState';

function AddPost({ avatarURL, handleAddPost }) {
  const [formState, dispatch] = useReducer(
    (state, action) => formReducer(state, action, postFormRules),
    initialPostFormState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'validate_all' });
    if (formState.isValid) {
      handleAddPost(formState.content);
      dispatch({
        type: 'reset_input_value',
        initialState: initialPostFormState,
      });
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    dispatch({
      type: 'input_validate',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.addPost}>
        <div>
          <img className={styles.avatar} src={avatarURL} alt="avatar" />
        </div>
        <form className={styles.postForm} onSubmit={handleSubmit} role="form">
          <Textarea
            style={{ height: '6em' }}
            name="content"
            placeholder="Write a post..."
            value={formState.content}
            onChange={handleInputChange}
            error={formState.errors.content}
          ></Textarea>
          <SubmitButton
            type="submit"
            style={{ borderRadius: '10px', height: '4em' }}
          >
            Post
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
export default AddPost;
