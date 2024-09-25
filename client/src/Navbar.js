import React, {useEffect, useState} from "react";
import './Navbar.css'

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let logo = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
  let avatar = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src={logo} alt="Netflix Logo" />
      <img className="nav_avatar" src={avatar} alt="Avatar" />
    </div>
  );
}

export default Navbar;
