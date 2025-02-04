import { toastOption } from '@/constants';
import { useFetch, useLocalStorage } from '@/hooks';
import { FilePenLine, LogOut, User } from 'lucide-react';
import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { getItem: getStoredUser, setItem: setStoredUser } =
    useLocalStorage('user');
  const storedUser = getStoredUser();

  const { getItem: getCurrentTab, setItem: setCurrentTab } =
    useLocalStorage('currentTab');

  const navigate = useNavigate();
  const location = useLocation();

  const { data, error } = useFetch(
    storedUser?.id ? `/users/${storedUser.id}` : null
  );

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch user data. Please try again.', toastOption);
    }
  }, [error]);

  if (!storedUser?.id || location.pathname === '/login') return null;

  const handleClick = (value) => {
    setCurrentTab(value);
  };

  const handleLogout = () => {
    setStoredUser({});
    setCurrentTab('');
    navigate('/login');
    toast.success('Logout successfully !', toastOption);
  };

  const navLinks = [
    storedUser?.role === 'Admin' && {
      label: 'User',
      key: 'user',
      icon: <User stroke='white' />,
      path: '/admin/user'
    },
    {
      label: 'Post',
      key: 'post',
      icon: <FilePenLine stroke='white' />,
      path:
        storedUser?.role === 'Admin'
          ? '/admin/post'
          : storedUser?.role === 'Editor'
            ? '/editor/post'
            : '/posts'
    }
  ].filter(Boolean);

  return (
    <div className='flex items-center justify-between px-4 py-2'>
      <div className='flex gap-4'>
        {navLinks.map((link) => (
          <NavLink
            onClick={() => handleClick(link.key)}
            to={link.path}
            key={link.key}
            className={`flex items-center rounded-lg px-4 py-2 text-sm transition-all duration-200 ease-linear hover:bg-cyan-700 hover:text-black ${
              getCurrentTab() === link.key ? 'bg-cyan-400/50' : ''
            }`}
          >
            {link.icon}
            <span className='ml-2 text-white'>{link.label}</span>
          </NavLink>
        ))}
        <span className='px-4 py-2 text-sm text-white transition-all duration-200 ease-linear'>
          Role: {data?.role}
        </span>
      </div>
      <button
        className='flex items-center gap-2 rounded-lg border-none bg-transparent px-4 py-2 transition-all duration-200 ease-linear outline-none hover:bg-cyan-700 hover:text-black'
        onClick={handleLogout}
      >
        <LogOut stroke='white' />
        <span className='text-white'>Logout</span>
      </button>
    </div>
  );
};

export default Navbar;
