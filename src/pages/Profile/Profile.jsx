import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import AddPost from '../../components/PostCard/AddPost/AddPost';
import Loader from '../../components/Loader/Loader';
import requestWithNativeFetch from '../../utils/fetchApi';

import { ModalContext } from './ModalContext';


function Profile() {
  // const [deletePostRes, setDeletePostRes] = useState({});

  const [forceRenderPosts, setForceRenderPosts] = useState(0);

  const [addPostFetch, setAddPostFetch] = useState();

  const [token, , user, isLoading, setIsLoading] = useOutletContext();

  const [followerProfile, setFollowerProfile] = useState();
  const [profileUser, setProfileUser] = useState({});

  const { followerid } = useParams();

  // const [showModal, setShowModal] = useState(false);
  // const [commentId, setCommentId] = useState();

  const isFollowerProfile = followerid !== 'profile';

  useEffect(() => {
    setProfileUser(isFollowerProfile ? followerProfile : user);
  }, [followerProfile, isFollowerProfile, user]);

  useEffect(() => {
    if (token && isFollowerProfile) {
      const fetchDataForProfile = async () => {
        try {
          const url = `${
            import.meta.env.VITE_BACKEND_URL
          }/users/${followerid}/profile`;
          const headers = {
            Authorization: token,
          };
          const userData = await getRequestWithNativeFetch(url, headers);
          setFollowerProfile(userData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchDataForProfile();
    }
    return () => {
      setFollowerProfile([]);
    };
  }, [token, isFollowerProfile, followerid]);

  // useEffect(() => {
  //   if (profileUser?.user_id) {
  //     setIsLoading(true);
  //     const fetchDataForPosts = async () => {
  //       try {
  //         const url = `${import.meta.env.VITE_BACKEND_URL}/posts/user/${
  //           profileUser.user_id
  //         }`;
  //         const headers = {
  //           Authorization: token,
  //         };
  //         const postsData = await getRequestWithNativeFetch(url, headers);

  //         setProfilePosts(postsData);
  //       } catch (err) {
  //         console.log(err);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchDataForPosts();
  //   }
  //   return () => {
  //     setProfilePosts([]);
  //   };
  // }, [setIsLoading, token, profileUser, forceRenderPosts, deletePostRes]);

  // const handleDeletePost = (e, postId) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const fetchDataForDeletePost = async () => {
  //     try {
  //       const url = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`;
  //       const headers = { Authorization: token };
  //       const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
  //       setDeletePostRes(deleteData);

  //       if (deleteData.success) {
  //         setDeletePostRes(deleteData);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchDataForDeletePost();
  // };


  // const handleDelete = (commentId) => {
  //   // e.preventDefault();
  //   // const commentId = e.currentTarget.value;
  //   const fetchDataForDelete = async () => {
  //     try {
  //       const url = `${
  //         import.meta.env.VITE_BACKEND_URL
  //       }/posts/comments/${commentId}`;
  //       const headers = { Authorization: token };
  //       const deleteData = await requestWithNativeFetch(url, 'DELETE', headers);
  //       setDeleteCommentRes(deleteData);

  //       if (deleteData.success) {
  //         setDeleteCommentRes(deleteData);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setShowModal(false);
  //     }
  //   };
  //   fetchDataForDelete();
  // };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.profile}>
            <UserCard profileUser={profileUser} />
            <div className={styles.posts}>
              {!isFollowerProfile && (
                <AddPost
                  avatarURL={user.avatar_url}
                  setForceRenderPosts={setForceRenderPosts}
                  addPostFetch={addPostFetch}
                  setAddPostFetch={setAddPostFetch}
                />
              )}
                <PostCard
                  forceRenderPosts={forceRenderPosts}
                  fetchUrl={`${import.meta.env.VITE_BACKEND_URL}/posts/user/${
            profileUser.user_id
          }`}
                  profileUser={profileUser}
                />
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Profile;
