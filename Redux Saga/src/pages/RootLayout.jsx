import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='mx-auto w-[1200px] p-5'>
      <Outlet />
    </div>
  );
};
export default RootLayout;
