import React from 'react';
import './Toolbar.scss';
import Socials from '../Socials/Socials';

function Toolbar() {
  return (
    <div className="Toolbar">
      <div className="page-wrap">
        <img className="logo" src="http://pngimg.com/uploads/dog/dog_PNG50322.png" id="logo"/>

        <nav class="main-nav">
         <ul>
           <li>
              <a>
                Option 1
              </a>
           </li>
           
           <li>
              <a>
                Option 2
              </a>
           </li>
          </ul>
          
        <Socials />
        </nav>


      </div>
    </div>
  );
}

export default Toolbar;
