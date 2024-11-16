import styles from './AddPost.module.css';
import SubmitButton from '../../Form/Buttons/SubmitButton';
import Textarea from '../../Form/Textarea/Textarea';
import { useState } from 'react';

function AddPost({ avatarURL, handleAddPost }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddPost(inputValue);
    setInputValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.addPost}>
        <div>
          <img className={styles.avatar} src={avatarURL} alt="avatar" />
        </div>
        <form className={styles.postForm} onSubmit={handleSubmit}>
          <Textarea
            style={{ height: '6em' }}
            className={styles.postTextarea}
            name="content"
            placeholder="Write a post..."
            isControlled={true}
            setInputValue={setInputValue}
            inputValue={inputValue}
          ></Textarea>
          <SubmitButton
            type="submit"
            name="Post"
            style={{ borderRadius: '10px' }}
          />
        </form>
      </div>
    </div>
  );
}
export default AddPost;
