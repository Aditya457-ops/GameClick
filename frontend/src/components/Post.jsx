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
    {/* Image Section */}
    <div className="relative w-full flex-1 bg-[#DEDEDE]">
      <img 
        src={image} 
        alt="photo" 
        className="w-full h-full object-cover"  // makes the image auto-fit
      />
      <div className="absolute top-2 left-2">
        <p className="text-xs text-gray-600 font-mono opacity-80">#{username}</p>
      </div>
    </div>

    {/* Content Section */}
    <div className="bg-white w-full p-3 flex flex-col justify-between h-[100px]">
      <div>
        <p className="text-lg font-medium text-[#3C3C43] font-mono truncate">
          {title}
        </p>
        <p className="text-sm text-gray-600 font-mono leading-[18px] line-clamp-2">
          {caption}
        </p>
      </div>

      <div className="flex items-center justify-between mt-1">
        {likers.includes(userId) ? (
          <span
            className="material-symbols-outlined material-symbols-outlined-red cursor-pointer"
            onClick={handleLikeToggle}
          >
            favorite
          </span>
        ) : (
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={handleLikeToggle}
          >
            favorite
          </span>
        )}

        {!profile && (
          <p className="text-xs text-gray-500">
            {likers.length > 0 ? likers.length : 0} likes
          </p>
        )}

        {profile && (
          <button onClick={handleDelete} className="delete-button text-xs">
            Delete
          </button>
        )}
      </div>
    </div>
  </div>
);


export default Post;
