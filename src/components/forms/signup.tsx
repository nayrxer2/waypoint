export default function signupForm() { 
  return (
    <div className="bg-orange-600 flex flex-col 
                    items-center space-y-8 p-4">
      <form className="flex flex-col items-center 
                      justify-center space-y-8">
        <input 
          className="border border-gray-300 rounded-md py-2 px-4 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email" 
          placeholder="Email" />
        <input 
          className="border border-gray-300 rounded-md py-2 px-4
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password" 
          placeholder="Password" />
        <input 
          className="border border-gray-300 rounded-md py-2 px-4 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password" 
          placeholder="Confirm Password" />
      </form>
      <button className="bg-yellow-600 text-white py-2 px-4 
                        rounded-md hover:bg-green-700">
        Submit
      </button>
    </div>
  )
}