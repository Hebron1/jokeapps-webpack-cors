import React from 'react';

const Navbar = () => {
  
  return (
      <nav className="navbar navbar-light bg-light p-3">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" disabled />
            <button className="btn btn-outline-success" type="submit" disabled>Search</button>
          </form>
        </div>
      </nav>
  );
};

export default Navbar;
