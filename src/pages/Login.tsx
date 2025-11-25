import SIMPE from '../Img/SIMPE.png'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../types/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login as LoginType } from '../types/Login'
import { AuthAdminService } from '../services/admin/authAdminService';
import { AuthAlunoService } from '../services/aluno/authAlunoService';
import { AuthProfessorService } from '../services/professor/authProfessorService';
import { useToastMessage } from '../hooks/toastMessage';


const Login = () => {

   const authAdminService = new AuthAdminService()
   const authAlunoService = new AuthAlunoService()
   const authProfessorService = new AuthProfessorService()

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },

   } = useForm({
      resolver: zodResolver(LoginSchema)
   })
 
   const mode = watch('mode')

   const navigate = useNavigate()
   
   const toast = useToastMessage()

   const onSubmit = (data: LoginType) => {
      if (data.mode === 'admin') {
         authAdminService.login(data).then((data) => {
            localStorage.setItem('token', data.token)
            navigate('/MainAdmin')
            toast.success('Login realizado com sucesso!')
         }).catch((error) => toast.error(error.message))
      }

      if (data.mode === 'aluno') {
         authAlunoService.login(data).then((data) => {
            localStorage.setItem('token', data.token)
            navigate('/MainAluno')
            toast.success('Login realizado com sucesso!')
         }).catch((error) => toast.error(error.message))
      }

      if (data.mode === 'professor') {
         authProfessorService.login(data).then((data) => {
            localStorage.setItem('token', data.token)
            navigate('/MainProfessor')
            toast.success('Login realizado com sucesso!')
         }).catch((error) => toast.error(error.message))
      }

   }

   return (
      <div className="bg-green-600 flex items-center justify-center min-h-screen">
         <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
            {/* Logo */}
            <img className="h-[150px] w-[150px] mx-auto mb-4" src={SIMPE} alt="" />

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

               <div className="flex items-center justify-between space-x-2">
                  <div className="w-full text-left">
                     <label className="text-sm font-medium">Entrar como:</label>
                     <select
                        {...register("mode")}
                        className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm bg-gray-100 text-gray-500"
                     >
                        <option value='aluno'>ALUNO</option>
                        <option value='admin'>ADMINISTRADOR</option>
                        <option value='professor'>PROFESSOR</option>
                     </select>
                  </div>

               </div>

               {mode === 'aluno' ? <div className="text-left">
                  <label className="text-sm font-medium">RM:</label>
                  <input
                     {...register("rm")}
                     type="number"
                     className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
               </div> : <div className="text-left">
                  <label className="text-sm font-medium">Email</label>
                  <input
                     {...register("email")}
                     className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />
               </div>}

               <div className="text-left">
                  <label className="text-sm font-medium">Senha:</label>
                  <input
                     {...register("senha")}
                     type="password"
                     className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
                  />

                  {errors.senha &&
                     <p className="text-red-600 text-xs font-semibold mt-1">
                        {errors.senha.message}
                     </p>}
               </div>

               <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition-all"
               >
                  Entrar
               </button>
            </form>
         </div>
      </div>
   );
};

export default Login;
