import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import FeedHeader from '../components/FeedHeader';
import { useEffect } from 'react';
import { getFeed } from '../reduxSetup/Slices/feedSlice';
import { getUserPost } from '../reduxSetup/Slices/userPostSlice'
import { getLikePost } from '../reduxSetup/Slices/likePostSlice'
import '../style/feed.css'

const Feed = () => {

  const {posts, loading, error} = useSelector((state) => state.feed)
  const {username} = useSelector((state) => state.login)
  const {userId} = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getUserPost());
    dispatch(getLikePost());
  }, [])


  if(loading) {
    return (
      <div>
        <p> loading... </p>
      </div>
    )
  } else if(error.length !== 0 || error)  {
    return (
      <p> Error: {error}</p>
    )
  } else {
    return (
      <div>

        <FeedHeader username={username}/>

        <div className='all-post'>
          {posts.map((info) => (
            <Post
              userId={userId}
              key = {info.uploader._id.slice(0,5)}
              postId = {info._id}
              title={info.title}
              username={info.uploader.username}
              caption={info.caption}
              image={info.image}
              likers={info.likes}
              profile={false}
            />
          ))}
        </div>

      </div>
    )
  }
}

export default Feed