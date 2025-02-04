import { useLocalStorage } from '@/hooks';
import Markdown from 'markdown-to-jsx';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const { getItem } = useLocalStorage('user');

  const handleClick = () => {
    const user = getItem();
    const role = user?.role;
    if (role === 'Admin') navigate(`/admin/post/${post.id}`);
    else if (role === 'Editor') navigate(`/editor/post/${post.id}`);
    else navigate(`/post/${post.id}`);
  };

  return (
    <div
      onClick={() => handleClick()}
      className='cursor-pointer rounded border border-gray-200 bg-gray-400/90 p-4 transition-all duration-200 ease-linear hover:-translate-y-[5px]'
    >
      <h2 className='mb-2 text-xl font-bold text-[#00257F]'>{post.title}</h2>
      <div className='flex justify-between'>
        <span className='mb-5 inline-block text-sm font-bold text-[#00257F]'>
          {post.date}
        </span>
        <span className='mb-5 inline-block text-sm font-bold text-[#00257F]'>
          {post.author}
        </span>
      </div>
      <div
        className='text-justify'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
          wordBreak: 'break-word',
          overflow: 'hidden'
        }}
      >
        <Markdown className='leading-5'>{post.content}</Markdown>
      </div>
    </div>
  );
};

export default PostCard;
