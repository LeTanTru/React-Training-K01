import { Loading } from '@/components';
import { ROLE_PERMISSIONS, toastOption } from '@/constants';
import { useFetch, useLocalStorage } from '@/hooks';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import { hasPermission } from '@/utils';
import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/posts/${id}`);
  const { getItem } = useLocalStorage('user');

  useEffect(() => {
    if (error) {
      toast.error('Error while fetching data from server', toastOption);
    }
  }, [error]);

  const role = getItem()?.role;

  const permission = ROLE_PERMISSIONS[role];
  // if (
  //   !hasPermission(permission, 'edit') ||
  //   !hasPermission(permission, 'delete')
  // )
  //   return <UnauthorizedPage />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='mx-auto mt-5 max-w-xl rounded-lg bg-gray-300 px-4 py-2'>
          <h1 className='text-xl font-bold'>{data?.title}</h1>
          <Markdown className='leading-5'>{data?.content}</Markdown>
          <div className='flex justify-end gap-2'>
            {hasPermission(permission, 'edit') && (
              <button className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white'>
                Update
              </button>
            )}
            {hasPermission(permission, 'delete') && (
              <button className='cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white'>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default PostDetailPage;
