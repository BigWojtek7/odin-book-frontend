import styles from './AddPost.module.css';
import Textarea from '../../Form/Textarea/Textarea';
import { useReducer } from 'react';
import {
  initialPostFormState,
  postFormRules,
} from '../../../reducers/initialPostFormState';
import handleInputChange from '../../../utils/handleInputChange';
import Button from '../../Form/Button/Button';
import createFormReducer from '../../../utils/createFormReducer';

function AddPost({ avatarURL, handleAddPost }) {
  const postFormReducer = createFormReducer(postFormRules);
  const [formState, dispatch] = useReducer(
    postFormReducer,
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

  const handleChange = (e) => {
    handleInputChange(e, dispatch);
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
            onChange={handleChange}
            error={formState.errors.content}
          ></Textarea>
          <Button type="submit" style={{ borderRadius: '10px', height: '4em' }}>
            Post
          </Button>
        </form>
      </div>
    </div>
  );
}
export default AddPost;
