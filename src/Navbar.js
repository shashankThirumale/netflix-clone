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

  let logo =
    "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940";
  let avatar = "https://commons.wikimedia.org/wiki/File:Netflix-avatar.png"

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src={logo} alt="Netflix Logo" />
      <img className="nav_avatar" src={avatar} alt="Avatar" />
    </div>
  );
}

export default Navbar;
