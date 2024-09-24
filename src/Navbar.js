import React from "react";
function Navbar() {
  let logo =
    "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940";

  return (
    <div className="nav">
      <img className="nav_logo" src={logo} alt="" />
    </div>
  );
}

export default Navbar;
