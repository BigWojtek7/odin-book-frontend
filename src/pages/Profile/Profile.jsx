import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import useProfileData from '../../hooks/useProfileData';
import AddPost from '../../components/PostCard/AddPost/AddPost';
import useAuth from '../../contexts/Auth/useAuth';
import usePosts from '../../hooks/usePosts';

function Profile() {
  const [forceRenderPosts, setForceRenderPosts] = useState(0);

  const { followerid } = useParams();

  const { profileUser, isFollowerProfile } = useProfileData(followerid);



  const { posts, setPosts } = usePosts(
    `${import.meta.env.VITE_BACKEND_URL}/posts/user/${profileUser?.user_id}`,
    Boolean(profileUser?.user_id)
  );


  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.post_id !== deletedPostId)
    );
  };

  // useEffect(() => {
  //   setProfileUser(isFollowerProfile ? followerProfile : user);
  // }, [followerProfile, isFollowerProfile, user]);

  // useEffect(() => {
  //   if (token && isFollowerProfile) {
  //     const fetchDataForProfile = async () => {
  //       try {
  //         const url = `${
  //           import.meta.env.VITE_BACKEND_URL
  //         }/users/${followerid}/profile`;
  //         const headers = {
  //           Authorization: token,
  //         };
  //         const userData = await getRequestWithNativeFetch(url, headers);
  //         setFollowerProfile(userData);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchDataForProfile();
  //   }
  //   return () => {
  //     setFollowerProfile([]);
  //   };
  // }, [token, isFollowerProfile, followerid]);

  return (
    <>
      <div className={styles.profile}>
        <UserCard profileUser={profileUser} />
        <div className={styles.posts}>
          {!isFollowerProfile && (
            <AddPost
              avatarURL={profileUser?.avatar_url}
              setForceRenderPosts={setForceRenderPosts}
            />
          )}
          <PostCard posts={posts} onDelete={handleDeletePost} />
        </div>
      </div>
    </>
  );
}
export default Profile;
