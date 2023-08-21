import { Outlet, Link } from "react-router-dom";
import Logo from '../img/netnietflix.png';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '200px', flexShrink: 0 }}>
        <img className="logo" alt="netnietflix" src={Logo} style={{ width: '100%', height: 'auto' }} />
        <nav style={{ marginTop: '20px' }}>
          <ul>
            <li style={{ marginBottom: '10px' }}>
              <Link style={{ fontSize: '25px', padding: '10px' }} to="/">Home</Link>
            </li>
            <li>
              <Link style={{ fontSize: '25px', padding: '10px' }} to="/search">Search</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />
    </div>
  )
};

export default Layout;
