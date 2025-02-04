import { AdminPage, EditorPage, LoginPage, UserPage } from '@/pages';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserPage />}></Route>
        <Route path='/admin' element={<AdminPage />}></Route>
        <Route path='/editor' element={<EditorPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
