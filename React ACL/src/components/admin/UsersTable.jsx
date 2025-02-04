import { Loading } from '@/components';
import { toastOption } from '@/constants';
import { useFetch } from '@/hooks';
import { Edit, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UsersTable = () => {
  const navigate = useNavigate();

  const { data, loading, error } = useFetch('/users');

  useEffect(() => {
    if (error) {
      toast.error('Error while fetching data !', toastOption);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Id
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Username
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Password
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Role
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {data?.map((user) => (
              <tr
                key={user.id}
                className='mt-5 mb-8 rounded-xl border border-solid border-gray-700 bg-gray-800/50 p-6 shadow-lg backdrop-blur-md'
              >
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  {user.id}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  {user.name}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  {user.username}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  {user.password}
                </td>
                <td className='px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  <span
                    className={`rounded-lg px-2 py-1 ${user.role === 'Admin' ? 'bg-green-300 text-green-900' : user.role === 'Editor' ? 'bg-yellow-100 text-yellow-800' : user.role === 'User' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className='just flex px-6 py-4 text-sm whitespace-nowrap text-gray-300'>
                  <button
                    className='mr-2 text-indigo-400 transition-all duration-200 ease-linear hover:text-indigo-300'
                    onClick={() => navigate(`/admin/user/${user.id}`)}
                  >
                    <Edit size={18} />
                  </button>
                  <button className='mr-2 text-red-400 transition-all duration-200 ease-linear hover:text-red-300'>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default UsersTable;
