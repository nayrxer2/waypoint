type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

const inputClassName =
  "border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";

  return (
    <form
      className="flex flex-col items-center justify-center space-y-8 bg-orange-300 p-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <input
        className={inputClassName}
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required
      />
      <input
        className={inputClassName}
        type="password"
        name="password"
        placeholder="Password"
        autoComplete={isSignup ? "new-password" : "current-password"}
        required
      />
      {isSignup && (
        <input
          className={inputClassName}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          required
        />
      )}
      <button
        className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-green-700"
        type="submit"
      >
        {isSignup ? "Submit" : "Login"}
      </button>
    </form>
  );
}
