export function Login({ darkMode, toggleDarkMode, handleLogin, email, setEmail, password, setPassword, error }) {
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex items-center justify-center min-h-screen px-4`}>
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 text-white rounded-full flex items-center justify-center h-10"
      >
        {darkMode ?
          <p className="text-xs text-gray-100 flex justify-center items-center">
            <span className="text-lg pr-2">🌞</span> Modo claro
          </p>
          :
          <p className="text-xs text-gray-800 flex justify-center items-center">
            <span className="text-lg pr-2">🌚</span> Modo oscuro
          </p>
        }
      </button>
      <form onSubmit={handleLogin} className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} w-full max-w-md p-6 rounded-xl shadow-md text-center`}>
        <div className="flex flex-col justify-center items-center">
          <h2 className={`${darkMode ? 'text-gray-50' : 'text-gray-900'} text-2xl font-bold mb-2`}>Bienvenido de nuevo</h2>
          <img src="/images/login_image.svg" alt="login_image" className="w-48 sm:w-64 md:w-72 my-5" />
        </div>
        <p className="text-gray-400 text-sm mt-10 mb-3">Ingresa tus credenciales</p>

        <input
          type="text"
          placeholder="ejemplo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-lg mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className={`${darkMode ? 'bg-[#e05a29] hover:bg-[#983815]' : 'bg-[#132436] hover:bg-[#3a4959]'} w-full rounded-md py-2 transition text-[#f2ecec]`}
        >
          Ingresar
        </button>
        {error && (
          <p className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-lg mb-2 mt-5 text-xs">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}
