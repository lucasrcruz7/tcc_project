import SIMPE from '../../Img/SIMPE.png'

function Header() {
   return (
      <div className='w-full'>
         <header>
            <img className='img' src={SIMPE} alt="" />
         </header>
      </div>
   );
}

export default Header;