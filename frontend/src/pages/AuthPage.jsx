import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { login, register } from "../api/api.js";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = isLogin
        ? await login({ email, password })
        : await register({ name, email, password });

      authLogin(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-[-0.05em]">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          {isLogin ? "Log in to your Splitnice account" : "Start splitting expenses with friends"}
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <label className="block">
              <span className="text-sm font-semibold">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-ink/15 bg-cream p-4 outline-none focus:border-brand"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm font-semibold">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-cream p-4 outline-none focus:border-brand"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-cream p-4 outline-none focus:border-brand"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p className="text-sm font-semibold text-negative">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            {loading ? "Loading..." : isLogin ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/50">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-semibold text-brand hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;