import type { NextPage } from 'next';
import Background from './Background';
import Navbar from './Navbar';
import Search from './Search';

const Layout: NextPage = ({ children }) => {
  return (
    <div id='layout'>
      <Navbar />
      <Background />
      { children }
      <Search />
    </div>
  );
};

export default Layout;