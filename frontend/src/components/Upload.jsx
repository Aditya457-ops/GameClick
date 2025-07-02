import { useState } from 'react';
import '../style/upload.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import { getFeed } from '../reduxSetup/Slices/feedSlice'
import { getUserPost } from '../reduxSetup/Slices/userPostSlice'
import { getLikePost } from '../reduxSetup/Slices/likePostSlice'

const Upload = () => {

    const [capt, setCapt] = useState('');
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');

    const {token} = useSelector((state) => state.login)
    const dispatch = useDispatch();


    async function handleClick(e) {
        e.preventDefault();
        if (!image) {
            setMsg("Please select an image.");
            return;
        }
        
        setMsg('Uploading ....');

        const formData = new FormData();
        formData.append('caption', capt);
        formData.append('image', image);
        formData.append('title',title);
        
        try {
            const response = await axios.post(`http://localhost:4000/path/post/uploadpost`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
            })

            setMsg("Uploaded sucessfully")
            setCapt('');
            setTitle('');
            setImage(null);
        } catch (error) {
            console.error(error);
            setMsg("Upload failed");
        }

        dispatch(getFeed());
        dispatch(getLikePost());
        dispatch(getUserPost());
        
    }
    return (
        <div className="upload-container">
            <form className="upload-form">
                <input
                type="text"
                className="upload-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                type="text"
                className="upload-input"
                placeholder="Caption"
                value={capt}
                onChange={(e) => setCapt(e.target.value)}
                />
                <input
                type="file"
                className="upload-file"
                required
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" className="upload-button" onClick={handleClick}>
                <FiUpload size={18} style={{ marginRight: '6px' }} /> Upload
                </button>
            </form>
            {msg && <p className="upload-message">{msg}</p>}
        </div>

    )
}

export default Upload