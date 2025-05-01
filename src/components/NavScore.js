import React from 'react';
import { Link } from 'react-router-dom';

const NavScore = ({scores, setScore, emScore}) => {

  return (
      <nav className="navbar navbar-light bg-light p-3">
        <div className="container-fluid d-flex justify-content-center">
          <nav aria-label="..." className='p-2'>
          <a className="navbar-brand p-5 pb-2">Score⭐</a>
            <ul className="pagination pagination-sm pt-2">
                {scores.map((scr, index) => (
                <li value={scr} className={`page-item ${emScore === scr ? 'active' : ''}`} aria-current="page" key={index}>
                <button className="page-link " onClick={() => setScore(scr)}>{scr}</button>
                </li>
                ))
                }
            </ul>
          <Link to={'/dashboard'}><button className='btn btn-success text-white d-flex justify-content-end'>Back</button></Link>
          </nav>
        </div>
      </nav>
  );
};

export default NavScore;
