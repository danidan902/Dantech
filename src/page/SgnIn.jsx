import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BaseUrl = 'https://dantech-backend.onrender.com' // Replace with your backend URL
// Replace with your own image in src/assets/
import bgImage from '../assets/dan1.png'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${BaseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      console.log('Login successful:', data)

      // Save JWT token
      localStorage.setItem('token', data.token)
      // Save user information
      localStorage.setItem('user', JSON.stringify(data.user))

      // ✅ Redirect to admin/dashboard page
      navigate('/admin')
    } catch (error) {
      console.error('Error during sign in:', error)
      alert(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Background image */}
      <img
        src={bgImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Form */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-2xl border border-[#D4AF37]/30 bg-black/60 p-8 shadow-2xl shadow-[#D4AF37]/10 backdrop-blur-md"
        >
          {/* Welcome text */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome <span className="text-[#F5D76E]">back</span>
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Sign in to your DanTech account
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#D4AF37]/60">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 py-3 pl-11 pr-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#D4AF37]/60">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 py-3 pl-11 pr-12 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-2 my-auto grid h-8 w-8 place-items-center rounded-md text-[#D4AF37]/70 transition hover:bg-[#D4AF37]/10 hover:text-[#F5D76E]"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black shadow-md shadow-[#D4AF37]/30 transition hover:bg-[#F5D76E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
