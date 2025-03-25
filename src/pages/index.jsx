import { useState, useEffect} from "react";
import { Button} from '@mui/material'
import { Add} from '@mui/icons-material'
import { ModalForm } from "../components/modalForm"
import { ErrorAlert } from "../components/errorAlert"
import { SuccessAlert } from "../components/successAlert"
import { ConfirmModal } from "../components/confirmModal"

const URL_BASE = "https://jsonplaceholder.typicode.com/users";

export function Index({ user, handleLogout, darkMode, toggleDarkMode}) {
  const CURRENT_USER = user.username

  const [users, setUsers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "", phone: "" })
  const [search, setSearch] = useState("")
  const [error, setError] = useState('')
  const [errorResponse, setErrorResponse] = useState('')
  const [success, setSuccess] = useState('')
  const [editUser, setEditUser] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const confirmDeleteUser = (id) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  useEffect(() => {
    fetch(URL_BASE)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => setErrorResponse("Error al obtener los usuarios:", error));
  }, []);
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteUser = async () => {
      if (!userToDelete) return;
      const userToDeleteData = users.find((u) => u.id === userToDelete);     
      
      if (userToDeleteData.isCreatedByUser != CURRENT_USER) {
        setIsDeleteModalOpen(false);
        setErrorResponse("Solo puedes eliminar usuarios que tú hayas creado.");
        setTimeout(() => setErrorResponse(false), 3000);
        return;
      }

      try {
        const response = await fetch(`${URL_BASE}/${userToDelete}`, {
          method: "DELETE",
        });
    
        if (!response.ok) {
          throw new Error("Error al eliminar el usuario");
        }
    
        setUsers(users.filter(user => user.id !== userToDelete));
        setSuccess('Usuario eliminado correctamente.');
    
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => setSuccess(false), 3000);
    
      } catch (error) {
       setErrorResponse("Error al eliminar el usuario:", error);
      } finally {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      }
    };
    
    const handleInputChange = (e) => {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const isValidPhoneNumber = (phone) => {
      const phoneRegex = /^[0-9]{10}$/; // Asegura que sean exactamente 10 dígitos numéricos
      return phoneRegex.test(phone);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setError('')
      setNewUser({ name: "", username: "", email: "", phone: "" }); // Limpiar los campos
    };

    const handleOpenCreateModal = () => {
      setEditUser(null);
      setNewUser({ name: "", username: "", email: "", phone: "" });
      setIsModalOpen(true);
    };

    const handleOpenEditModal = (user) => {
      setEditUser(user);
      setNewUser({ name: user.name, username: user.username, email: user.email, phone: user.phone });
      setIsModalOpen(true);
    };

    const handleSaveUser = async () => {
      console.log(CURRENT_USER);
      
      if (!newUser.name || !newUser.username || !newUser.email || !newUser.phone) {
        setError("Todos los campos son obligatorios");
        return;
      }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUser.email)) {
        setError("Correo electrónico no válido");
        return;
      }
    
      if (!isValidPhoneNumber(newUser.phone)) {
        setError("El número de teléfono debe contener exactamente 10 dígitos numéricos.");
        return;
      }
    
      try {
        let response;
        let updatedUser;
    
        if (editUser) {
          // Modo edición: actualizar usuario con PUT
          response = await fetch(`${URL_BASE}/${editUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
    
          if (!response.ok) setErrorResponse("Error al actualizar el usuario");
    
          updatedUser = await response.json();
    
          // Reemplazar usuario editado en la lista
          setUsers(users.map(user => (user.id === editUser.id ? updatedUser : user)));
          setSuccess('El usuario se edito correctamente.')
          setTimeout(() => setSuccess(false), 3000);
        } else {
          response = await fetch(`${URL_BASE}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
    
          if (!response.ok) setErrorResponse("Error al crear el usuario");
          
          updatedUser = await response.json();
          updatedUser.id = users.length + 1;
          updatedUser.isCreatedByUser = CURRENT_USER;
    
          setUsers([...users, updatedUser]);
          setSuccess('El usuario se creo correctamente.')
          setTimeout(() => setSuccess(false), 3000);
        }
    
        // Limpiar formulario y cerrar modal
        setIsModalOpen(false);
        setNewUser({ name: "", username: "", email: "", phone: "" });
        setEditUser(null);
        setError("");
      } catch (error) {
        setError(`Error: ${error.message}`);
      }
    };
  
  return (
    <>
      <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"} h-full pb-20 w-full`}>
        <nav className="flex px-1 md:px-10 py-5 justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="images/user_image.svg" alt="user_image" className="w-9"/>
            <div className="flex flex-col">
              <p className="text-md">{user.username}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row">
            <button onClick={()=>handleLogout()} className="sm:text-xs text-sm border py-2 px-3 rounded-xl bg-[#132436] text-gray-50 font-light">
              Cerrar sesión
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 text-white rounded-full flex items-center "
            >
              {darkMode ? <p  className="text-xs text-gray-100 flex justify-center items-center cursor-pointer"><span className="text-lg pr-2">🌞</span> Modo claro</p> : <p  className="text-xs text-gray-800 flex justify-center items-center cursor-pointer"><span className="text-lg pr-2">🌚</span> Modo oscuro</p>}
            </button>
          </div>          
        </nav>
        <main className="flex flex-col justify-center items-center p-4">
          <h1 className="mt-5 text-2xl font-sans">Listado de usuarios</h1>
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="w-1/3 mt-7 px-4 py-2 border-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#132436]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} w-full md:w-4/5 flexflex-col items-center justify-center p-10 mt-10 rounded-xl`}>
          <Button onClick={() => handleOpenCreateModal()} variant="contained" startIcon={<Add/>}>Crear usuario</Button>
          
          {isModalOpen && (
            <ModalForm 
              darkMode={darkMode}
              editUser={editUser}
              newUser={newUser}
              error={error}
              handleCloseModal={handleCloseModal}
              handleInputChange={handleInputChange}
              handleSaveUser={handleSaveUser}
            />
          )}
          <div className="w-full overflow-x-auto">
          <table className="mt-7 border-collapse w-full rounded-lg overflow-hidden shadow-lg">
            <thead className={`${darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-700"}`}>
              <tr className="">
                <th className="font-medium py-2 px-4">Nombre</th>
                <th className="py-2 px-4 font-medium">Usuario</th>
                <th className="py-2 px-4 font-medium">Correo</th>
                <th className="py-2 px-4 font-medium">Telefono</th>
                <th className="py-2 px-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? "bg-gray-800":"bg-gray-50"}`}>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className={`${darkMode ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-100 text-gray-500"}`}>
                    <td className="py-2 px-4 font-light text-sm">{user.name}</td>
                    <td className="py-2 px-4 font-light text-sm">{user.username}</td>
                    <td className="py-2 px-4 font-light text-sm">{user.email}</td>
                    <td className="py-2 px-4 font-light text-sm">{user.phone}</td>
                    <td className="py-2 px-4 font-light text-sm flex gap-2">
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition"
                    onClick={() => handleViewUser(user)}
                  >
                    Ver
                  </button>
                  {isViewModalOpen && selectedUser && (
                    <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} fixed inset-0 bg-opacity-50 flex justify-center items-center`}>
                      <div className={`${darkMode ? "bg-gray-800" : "bg-gray-50"} p-6 rounded-lg shadow-lg w-96`}>
                        <h2 className="text-lg font-bold mb-4">Información del Usuario</h2>
                        <p><strong>Nombre:</strong> {selectedUser.name}</p>
                        <p><strong>Usuario:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p> 
                        <p><strong>Telefono:</strong> {selectedUser.phone}</p>                                                
                        <p><strong>Página web:</strong> {selectedUser.website || "N/A"}</p>                                                
                        <p><strong>Compañía:</strong> {selectedUser.company?.name || "N/A"}</p>                                                
                        <p><strong>Dirección:</strong> {selectedUser.address?.street || "N/A"} {selectedUser.address?.suite || ""}</p>                                              
                        <button 
                          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                          onClick={() => setIsViewModalOpen(false)}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  )}
                  <button 
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-600 transition"
                    onClick={() => handleOpenEditModal(user)}
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                    onClick={() => confirmDeleteUser(user.id)}
                  >
                    Eliminar
                  </button> 
                  {isDeleteModalOpen && (
                    <ConfirmModal 
                      darkMode={darkMode}
                      handleDeleteUser={handleDeleteUser}
                      setIsDeleteModalOpen={setIsDeleteModalOpen}                      
                    />
                  )}                 
                </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>  
          </div>  
          <div className="mt-3">
          {success && (
            <SuccessAlert success={success}/>
          )} 
          {errorResponse && (
            <ErrorAlert errorResponse={errorResponse}/>
          )} 
          </div>       
          </div>
        </main>
      </section>      
    </>
  );
}
