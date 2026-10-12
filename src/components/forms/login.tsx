export default function loginForm() { 
  return (
    <div className="bg-orange-300 flex flex-col 
                    items-center space-y-8 p-4">
      <form className="flex flex-col items-center 
                      justify-center space-y-8">
        <input className="border border-gray-300 rounded-md py-2 px-4 
                        focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="email" 
          placeholder="Email" />
        <input className="border border-gray-300 rounded-md py-2 px-4 
                        focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="password" 
          placeholder="Password" />
      </form>
      <button className="bg-purple-500 text-white py-2 
                        px-4 rounded-md hover:bg-green-700">
        Login
      </button>
    </div>
  )
}