import { Post } from '@/components';
import { ROLE_PERMISSIONS } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { hasPermission } from '@/utils';

const PostPage = () => {
  const { getItem } = useLocalStorage('user');
  const role = getItem()?.role;
  const permissions = ROLE_PERMISSIONS[role];
  return (
    <div className='mt-5 mb-5'>
      {hasPermission(permissions, 'create') && (
        <button className='mb-5 ml-auto block rounded-lg bg-blue-500 px-4 py-4 text-white'>
          Create post
        </button>
      )}
      <Post />
    </div>
  );
};
export default PostPage;
