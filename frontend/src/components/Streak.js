import React, { useEffect } from 'react';
import { RiCopperCoinLine } from "react-icons/ri";
import './streak.css';

function Streak({ show }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        document.getElementById('streak').classList.remove('show');
      }, 1000); 

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div id="streak" className={`streak ${show ? 'show'  : ''}`}>
      <RiCopperCoinLine style={{backgroundColor:"transparent",color:"yellow",fontSize:"7vh"}}/>
    </div>
  );
}

export default Streak;
