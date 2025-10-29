import React from 'react';
import ETEC from '../../Img/logo_etec_pb.png'

function Header() {
   return (
      <div className='w-full'>
         <header>
            <img className='img' src={ETEC} alt="" />
         </header>
      </div>
   );
}

export default Header;