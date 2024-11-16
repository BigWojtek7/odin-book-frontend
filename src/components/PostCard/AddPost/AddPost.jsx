import styles from './AddPost.module.css';
import SubmitButton from '../../Form/Buttons/SubmitButton';
import Textarea from '../../Form/Textarea/Textarea';
import { useOutletContext } from 'react-router-dom';
// import { useState } from 'react';
import requestWithNativeFetch from '../../../utils/requestWithNativeFetch.js';
import { useEffect, useState } from 'react';
import useAuth from '../../../contexts/Auth/useAuth.js';
import useNotification from '../../../contexts/Notification/useNotification.js';
import useLoader from '../../../contexts/Loader/useLoader.js';

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
