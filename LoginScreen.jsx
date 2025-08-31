import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, Backspace } from 'lucide-react'

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleNumberClick = (number) => {
    if (password.length < 10) {
      setPassword(prev => prev + number)
      setError(false)
    }
  }

  const handleBackspace = () => {
    setPassword(prev => prev.slice(0, -1))
    setError(false)
  }

  const handleLogin = () => {
    const success = onLogin(password)
    if (!success) {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['⌫', 0, '#']
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-white/20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${1 + Math.random() * 2}rem`
            }}
          />
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Ingresa la contraseña
          </h1>
          <p className="text-white/80 text-sm">
            Pista: día especial
          </p>
        </div>

        {/* Password display */}
        <div className="mb-8">
          <div className={`bg-white/20 rounded-xl p-4 text-center border-2 transition-colors ${
            error ? 'border-red-400 bg-red-400/20' : 'border-white/30'
          }`}>
            <div className="text-white text-2xl font-mono tracking-widest min-h-[2rem] flex items-center justify-center">
              {password ? '•'.repeat(password.length) : ''}
            </div>
          </div>
          {error && (
            <p className="text-red-200 text-sm text-center mt-2 animate-pulse">
              Contraseña incorrecta. Inténtalo de nuevo.
            </p>
          )}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {numbers.flat().map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                if (item === '⌫') {
                  handleBackspace()
                } else if (item === '#') {
                  // Do nothing for # key
                } else {
                  handleNumberClick(item.toString())
                }
              }}
              className={`h-16 text-xl font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 ${
                item === '⌫' 
                  ? 'bg-red-500/80 hover:bg-red-500 text-white border-red-400/50' 
                  : item === '#'
                  ? 'bg-gray-500/50 hover:bg-gray-500/70 text-white/50 cursor-not-allowed'
                  : 'bg-pink-500/80 hover:bg-pink-500 text-white border-pink-400/50'
              } border backdrop-blur-sm shadow-lg`}
              disabled={item === '#'}
            >
              {item === '⌫' ? <Backspace size={24} /> : item}
            </Button>
          ))}
        </div>

        {/* Enter button */}
        <Button
          onClick={handleLogin}
          disabled={password.length === 0}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          Entrar
        </Button>

        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            Hecho con ❤️ por Jefer para Angie
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen

