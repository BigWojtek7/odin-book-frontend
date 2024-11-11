import { useOutletContext, useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UserCard from '../../components/UserCard/UserCard';
import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import getRequestWithNativeFetch from '../../utils/fetchApiGet';
import AddPost from '../../components/PostCard/AddPost/AddPost';
import useAuth from '../../contexts/Auth/useAuth';


function Profile() {
  const [forceRenderPosts, setForceRenderPosts] = useState(0);


  const {token, user} = useAuth();

  const [followerProfile, setFollowerProfile] = useState();
  const [profileUser, setProfileUser] = useState({});

  const { followerid } = useParams();

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

  return (
    <>
      <div className={styles.profile}>
        <UserCard profileUser={profileUser} />
        <div className={styles.posts}>
          {!isFollowerProfile && (
            <AddPost
              avatarURL={user?.avatar_url}
              setForceRenderPosts={setForceRenderPosts}
            />
          )}
          <PostCard
            forceRenderPosts={forceRenderPosts}
            fetchUrl={`${import.meta.env.VITE_BACKEND_URL}/posts/user/${
              profileUser?.user_id
            }`}
            profileUser={profileUser}
          />
        </div>
      </div>
    </>
  );
}
export default Profile;
