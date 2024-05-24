import axios from 'axios';
import Cookies from 'js-cookie';

export const savePost = async (postId, userId) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/save/save-post',
            { post_id: postId, user_id: userId },
            {
                headers: {
                    'Authorization': `Bearer${Cookies.get('userToken')}`
                }
            }
        );
        return response.data.success;
    } catch (error) {
        console.error('Error saving post:', error);
        throw error;
    }
};

export const unsavePost = async (postId) => {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/save/unsave-post/${postId}`,
            {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('userToken')}`
                }
            }
        );
        return response.data.success;
    } catch (error) {
        console.error('Error unsaving post:', error);
        throw error;
    }
};
