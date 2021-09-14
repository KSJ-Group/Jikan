import type { NextPage } from 'next';
import Background from './Background';
import Navbar from './Navbar';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Background />
      { children }
    </div>
  );
};

export default Layout;