import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className='absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 mb-24 text-7xl font-extrabold tracking-tight text-white lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl'>
            Page not found currently
          </p>
          <p className='mb-4 text-lg font-light text-gray-300'>
            Sorry, we can&apos;t find such page.
          </p>

          <Link
            to='/'
            className='mb-2 rounded-full bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:ring-1 focus:ring-purple-300 focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
          >
            Back To Home
          </Link>
        </div>
      </div>
    </section>
  );
};
export default NotFoundPage;
