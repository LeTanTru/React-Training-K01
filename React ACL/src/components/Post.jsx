import { Loading, PostCard } from '@/components';
import { toastOption } from '@/constants';
import { useFetch } from '@/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Post = () => {
  const { data, loading, error } = useFetch('/posts');

  useEffect(() => {
    if (error) {
      toast.error('Error while fetching data from server', toastOption);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
export default Post;
