import Navbar from '@/components/Navbar';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

const RootLayout = () => {
  return (
    <div className='h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-gray-800'>
      <div className='mx-auto flex h-full max-w-[1200px] flex-col'>
        <Navbar />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
          transition={Bounce}
        />
        <div className='flex-1 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default RootLayout;
