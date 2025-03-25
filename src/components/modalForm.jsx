export function ModalForm({darkMode, editUser, newUser,handleInputChange, handleCloseModal, handleSaveUser, error}){
	return (
		<div className={`${darkMode ? "bg-gray-900 text-gray-50" : "bg-gray-100 "} fixed inset-0 justify-center items-center flex flex-col`}>
          <div className={`${darkMode ? "bg-gray-800 " : "bg-gray-50 "}p-5 rounded-xl shadow-lg w-96`}>
            <h2 className="text-lg font-semibold text-center">{editUser ? "Actualizar" : "Crear"} Usuario</h2>

            <div className="mt-4 space-y-3">
              <input 
                type="text" 
                name="name"
                placeholder="Nombre" 
                value={newUser.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text" 
                name="username"
                placeholder="Username" 
                value={newUser.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                name="email"
                placeholder="Correo" 
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Teléfono" 
                value={newUser.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mt-4 flex justify-between">
              <button 
                onClick={() => handleCloseModal()}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancelar
              </button>              
              <button 
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {editUser ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </div>
          {error && (
          <p className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-lg mb-2 mt-5 text-xs">
            {error}
          </p>
        )}      
        </div>
	)
}