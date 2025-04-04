import React from "react";

function Navbar() {
  return (
    <>
      <nav className="container mx-auto p-4 mt-5">
        <div>
          <img
            src="/Linkify.png"
            alt="Linkify"
            className="w-[8rem] sm:w-[10rem] object-cover mt-1"
          />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
