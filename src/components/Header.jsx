import CoverImage from '../images/cover-image.png';
import ProfileImage from '../images/my-profile-image.jpg';
import { FaTwitter, FaFacebookSquare, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="main-cover" style={{ backgroundImage: `url(${CoverImage})` }}>
      <div className="overlay"></div>
      <div className="container">
        <div className="display-table">
          <div className="display-table-contents">
            <div className="profile-thumb" style={{ backgroundImage: `url(${ProfileImage})` }}></div>
            <h1 className="title-text">Yuto <span className="text-secondary">M</span>iura</h1>
            <h3 className="title-text">Web Engneer</h3>
            <ul className="social-icons">
              <li className="icon-link">
                <a href="https://twitter.com/yutto0209">
                  <FaTwitter color="white" size="2rem" />
                </a>
              </li>
              <li className="icon-link">
                <a href="https://www.facebook.com/Eugene0209vision">
                  <FaFacebookSquare color="white" size="2rem" />
                </a>
              </li>
              <li className="icon-link">
                <a href="https://www.linkedin.com/in/yuto-miura-a2088417b/">
                  <FaLinkedin color="white" size="2rem" />
                </a>
              </li>
              <li className="icon-link">
                <a href="https://github.com/0209Eugene">
                  <FaGithub color="white" size="2rem" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </header>
  );
};