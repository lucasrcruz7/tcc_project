import React from "react";

export default function PresencaManual() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Registro de Presença Manual
        </h1>

        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Aluno</th>
              <th className="text-center py-2">Presente</th>
              <th className="text-center py-2">Falta</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-2">Ana Silva</td>
              <td className="text-center">
                <input type="radio" name="ana" className="h-5 w-5 text-green-600" />
              </td>
              <td className="text-center">
                <input type="radio" name="ana" className="h-5 w-5 text-red-600" />
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-2">Bruno Oliveira</td>
              <td className="text-center">
                <input type="radio" name="bruno" className="h-5 w-5 text-green-600" />
              </td>
              <td className="text-center">
                <input type="radio" name="bruno" className="h-5 w-5 text-red-600" />
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-2">Carlos Souza</td>
              <td className="text-center">
                <input type="radio" name="carlos" className="h-5 w-5 text-green-600" />
              </td>
              <td className="text-center">
                <input type="radio" name="carlos" className="h-5 w-5 text-red-600" />
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50 transition">
              <td className="py-2">Daniela Costa</td>
              <td className="text-center">
                <input type="radio" name="daniela" className="h-5 w-5 text-green-600" />
              </td>
              <td className="text-center">
                <input type="radio" name="daniela" className="h-5 w-5 text-red-600" />
              </td>
            </tr>
          </tbody>
        </table>

        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
          Registrar
        </button>
      </div>
    </div>
  );
}
