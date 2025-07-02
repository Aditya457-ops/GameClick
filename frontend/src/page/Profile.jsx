import { useDispatch, useSelector } from 'react-redux'
import ProfileHeader from '../components/ProfileHeader'
import Post from '../components/Post'
import { getUserPost } from '../reduxSetup/Slices/userPostSlice'
import { getLikePost } from '../reduxSetup/Slices/likePostSlice'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const Profile = () => {

  const dispatch = useDispatch();
  const {userId} = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getUserPost());
    dispatch(getLikePost());
  }, [dispatch]);

  const {userposts, loading, error} = useSelector((state) => state.userpost)
  const {likeposts} = useSelector((state) => state.likepost)
  const {mode} = useSelector((state) => state.userpost)

  let disPosts;

  if(mode === "user") {
    disPosts = userposts;
  } else if (mode === "like") {
    disPosts = likeposts;
  }

  console.log("posts: ",disPosts);
  const {username} = useSelector((state) => state.login)

  if(loading) {
    return (
      <div>
        <Loading/>
      </div>
    )
  } else if(error.length !== 0 || error)  {
    return (
      <p> Error: {error}</p>
    )
  } else {
    return (
      <div>
        <ProfileHeader username={username}/>
        <div className='profile-post'>
          {disPosts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            disPosts.map((info) => (
              <Post
                userId={userId}
                username={info.username}
                title={info.title}
                caption={info.caption}
                image={info.image}
                postId={info._id}
                profile={mode === "user"}
                likers={info.likes}
                key={info._id.slice(0,5)}
              />
            ))
          )}
        </div>

      </div>
    )
  }
}

export default Profile