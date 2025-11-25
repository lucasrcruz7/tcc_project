import { useNavigate } from 'react-router-dom'
import SIMPE from '../../Img/SIMPE.png'
import { useToastMessage } from '../../hooks/toastMessage'

function Header() {
   const navigate = useNavigate()

   const toast = useToastMessage()

   const handleLogout = () => {
      localStorage.removeItem('token')
      navigate('/')
      toast.success('Logout realizado com sucesso!')
   }
   return (
      <div className='w-full'>
         <header className='flex justify-between items-center px-5'>
            <img className='img' src={SIMPE} alt="" />
            <button 
               onClick={handleLogout}
               className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded'
            >
               Sair
            </button>
         </header>
      </div>
   );
}

export default Header;