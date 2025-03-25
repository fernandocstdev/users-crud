import React from 'react'

export function ConfirmModal({darkMode, setIsDeleteModalOpen,handleDeleteUser}) {
	return (
		<div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} fixed inset-0 flex justify-center items-center bg-opacity-50`}>
  <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4`}>
    <h2 className="text-lg font-semibold">¿Estás seguro?</h2>
    <p className="text-gray-500">Esta acción no se puede deshacer.</p>
    <div className="mt-4 flex justify-end gap-3">
      <button 
        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        onClick={() => setIsDeleteModalOpen(false)}
      >
        Cancelar
      </button>
      <button 
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        onClick={handleDeleteUser}
      >
        Sí, eliminar
      </button>
    </div>
  </div>
</div>
	)
}
