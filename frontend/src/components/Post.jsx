import '../style/post.css'
import '../style/like.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../reduxSetup/Slices/feedSlice'
import { getUserPost } from '../reduxSetup/Slices/userPostSlice'
import { getLikePost } from '../reduxSetup/Slices/likePostSlice'

const Post = ({ username, image, title, caption, postId, profile, likers, userId }) => {

  const { token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  async function handleDelete() {
    try {
      await axios.delete(`https://gameclick.onrender.com/path/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refetch updated data
      dispatch(getFeed());
      dispatch(getLikePost());
      dispatch(getUserPost());
    } catch (error) {
      console.error(error);
    }
  }

  async function handleLikeToggle(e) {
    try {
      await axios.patch(`https://gameclick.onrender.com/path/post/like/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Refetch all the necessary posts
      dispatch(getFeed());
      dispatch(getLikePost());
      dispatch(getUserPost());

    } catch (error) {
      console.error("Error while liking:", error);
    }
  }

  return (
    <div className="w-[250px] h-[350px] rounded-xl overflow-hidden flex flex-col shadow-md m-5">
      <div className="relative w-full h-[300px] bg-[#DEDEDE]">
        <img src={image} alt="photo" className="w-full h-full object-cover" />
        <div className="absolute top-6 left-6">
          <p className="text-xs text-gray-600 font-mono opacity-80">#{username}</p>
        </div>
      </div>

      <div className="bg-white w-full h-[140px] p-6 flex flex-col gap-1">
        <p className="text-lg font-medium text-[#3C3C43] font-mono">{title}</p>
        <p className="text-sm text-gray-600 font-mono leading-[18px]">{caption}</p>

        {
          likers.includes(userId) ? <span className='material-symbols-outlined material-symbols-outlined-red' onClick={handleLikeToggle}>favorite</span> : <span className='material-symbols-outlined' onClick={handleLikeToggle}>favorite</span>
        }

        {
          profile ? "" : <p className='like-count'> {likers.length > 0 ? likers.length : 0} likes </p>
        }

        {profile && (
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
