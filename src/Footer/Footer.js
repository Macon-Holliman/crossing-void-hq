import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="footer-row">
          <div className="footer-box w2 left">
          <img src="http://pngimg.com/uploads/dog/dog_PNG50322.png" width="50" height="50" alt="" class="left"/>
          </div>
          <div className="w2 left">&nbsp;&nbsp;</div>
          <div className="w2 footer-box left">
            <ul className="list">
              <li className="list-item">
                <a href="" class="list-link">Contact</a>
              </li>
              <li className="list-item">
                <a href="" class="list-link">Info</a>
              </li>
            </ul>
          </div>
          <div className="w2 footer-box left">
            <ul className="list">
              <li className="list-item">
                <a href="" class="list-link">About</a>
              </li>
              <li className="list-item">
                <a href="" class="list-link">More</a>
              </li>
            </ul>
          </div>
          <div className="w2 footer-box left">
            <ul className="list">
              <li className="list-item">
                <a href="" class="list-link">FAQ</a>
              </li>
              <li className="list-item">
                <a href="" class="list-link">Lolifest 2020</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-end">
        © 2019 Macon Holliman
      </div>
    </div>
  );
}

export default Footer;
