import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [timeLeft, setTimeLeft] = useState({})
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      const calculateTimeLeft = () => {
        const now = new Date()
        const currentYear = now.getFullYear()
        let birthday = new Date(currentYear, 7, 31) // August 31st (month is 0-indexed)
        
        // If birthday has passed this year, calculate for next year
        if (now > birthday) {
          birthday = new Date(currentYear + 1, 7, 31)
        }

        const difference = birthday - now

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          })
          setIsBirthday(false)
        } else {
          // Check if today is the birthday
          const today = new Date()
          const todayMonth = today.getMonth()
          const todayDate = today.getDate()
          
          if (todayMonth === 7 && todayDate === 31) {
            setIsBirthday(true)
          }
        }
      }

      calculateTimeLeft()
      const timer = setInterval(calculateTimeLeft, 1000)

      return () => clearInterval(timer)
    }
  }, [isAuthenticated])

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
    if (password === '31') {
      setIsAuthenticated(true)
    } else {
      setError(true)
      setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 relative overflow-hidden">
        {/* Animated background elements - Party themed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            >
              {i % 8 === 0 && <div className="text-orange-300 text-2xl">🎂</div>}
              {i % 8 === 1 && <div className="text-brown-300 text-xl">🍫</div>}
              {i % 8 === 2 && <div className="text-red-300 text-2xl">🎉</div>}
              {i % 8 === 3 && <div className="text-yellow-300 text-xl">🎈</div>}
              {i % 8 === 4 && <div className="text-purple-300 text-2xl">🎁</div>}
              {i % 8 === 5 && <div className="text-green-300 text-xl">🎊</div>}
              {i % 8 === 6 && <div className="text-blue-300 text-2xl">🧁</div>}
              {i % 8 === 7 && <div className="text-pink-300 text-xl">🍰</div>}
            </div>
          ))}
        </div>

        {/* Fireworks effect for birthday */}
        {isBirthday && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-firework"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              >
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce drop-shadow-lg">
              {isBirthday ? '🎉 ¡FELIZ CUMPLEAÑOS! 🎉' : '🎂 Cuenta Regresiva 🎂'}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2 drop-shadow-lg animate-pulse">
              Angie ✨
            </h2>
            <p className="text-xl text-white/90 drop-shadow-md">
              {isBirthday ? '¡Hoy es tu día especial!' : 'Para tu día especial'}
            </p>
          </div>

          {/* Countdown Timer */}
          {!isBirthday && (
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/30 pulse-glow">
              <h3 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-md">
                ⏰ Tiempo restante para tu cumpleaños:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-gradient-to-br from-pink-400/30 to-purple-500/30 rounded-2xl p-4 mb-2 border border-white/40 backdrop-blur-sm">
                      <div className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                        {value || 0}
                      </div>
                    </div>
                    <div className="text-white/90 font-semibold capitalize text-sm drop-shadow-sm">
                      {unit === 'days' ? 'Días' :
                       unit === 'hours' ? 'Horas' :
                       unit === 'minutes' ? 'Minutos' : 'Segundos'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Birthday Message */}
          {isBirthday && (
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/30 text-center pulse-glow">
              <div className="text-6xl mb-4 animate-bounce">🎉🎂🎈🎊🌟</div>
              <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                ¡Hoy es tu día especial!
              </h3>
              <p className="text-xl text-white/95 mb-4 drop-shadow-md">
                Que este nuevo año de vida esté lleno de alegría, amor, risas y todos tus sueños hechos realidad.
                Eres una persona increíble y mereces toda la felicidad del mundo.
              </p>
              <div className="text-4xl animate-pulse">🌟💫⭐✨🎆</div>
            </div>
          )}

          {/* Personal Messages */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
              <h3 className="text-xl font-bold text-white mb-4 text-center drop-shadow-md">
                💝 Para ti, en tu día especial
              </h3>
              <p className="text-white/95 mb-3 text-center leading-relaxed drop-shadow-sm">
                "Desde que llegaste a mi vida, cada día ha sido más brillante. Eres esa persona especial 
                que hace que todo tenga más sentido. En tu cumpleaños, quiero que sepas lo importante que eres para mí."
              </p>
              <p className="text-white/85 italic text-center text-sm drop-shadow-sm">
                - Con todo mi cariño, Jefer 💕
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30">
              <h3 className="text-xl font-bold text-white mb-4 text-center drop-shadow-md">
                🌟 Nuestros recuerdos
              </h3>
              <p className="text-white/95 text-sm text-center leading-relaxed drop-shadow-sm">
                Desde aquel día en CEPREU cuando pensé que sería difícil ser tu amigo, hasta convertirnos 
                en compañeros inseparables en la universidad. Cada momento compartido ha sido un regalo. 
                Gracias por ser esa persona tan especial en mi vida. 🎓✨
              </p>
            </div>
          </div>

          {/* Birthday Wishes */}
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center drop-shadow-md">
              🎈 Mis deseos para ti
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">🌈</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Que cada día te traiga nuevas razones para sonreír</p>
              </div>
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">💪</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Que tengas la fuerza para alcanzar todos tus sueños</p>
              </div>
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Que logres todo lo que te propongas este nuevo año</p>
              </div>
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">💖</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Que siempre sepas lo especial que eres</p>
              </div>
            </div>
          </div>

          {/* Shared Interests */}
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center drop-shadow-md">
              🤝 Lo que nos une
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">🍫</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Nuestro amor por el chocolate</p>
              </div>
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">📚</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Tu pasión por la lectura</p>
              </div>
              <div className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-2xl p-4 border border-white/20">
                <div className="text-2xl mb-2">💻</div>
                <p className="text-white/95 text-sm drop-shadow-sm">Mi mundo de la programación</p>
              </div>
            </div>
          </div>

          {/* Final Message */}
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/30 mb-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">
              🎁 Un regalo especial
            </h3>
            <p className="text-white/95 leading-relaxed mb-4 drop-shadow-sm">
              Esta página web es mi regalo para ti. Cada línea de código fue escrita pensando en tu sonrisa. 
              Quería crear algo único, algo que fuera solo tuyo, porque eres una persona única e irrepetible. 
              Espero que cada vez que la veas, recuerdes lo especial que eres para mí.
            </p>
            <div className="text-3xl">🎨💻🎉</div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/70 text-sm drop-shadow-sm">
              Página creada con mucho amor por Jefer para Angie 💕
            </p>
            <p className="text-white/60 text-xs mt-2 drop-shadow-sm">
              {new Date().getFullYear()} - Un regalo digital único e irrepetible
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Ingresa la contraseña
          </h1>
          <p className="text-white/80 text-sm">
            Pista: tu fecha de nacimiento (solo el día)
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="h-16 text-xl font-semibold rounded-2xl bg-pink-500/80 hover:bg-pink-500 text-white border border-pink-400/50 backdrop-blur-sm shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="h-16 text-xl font-semibold rounded-2xl bg-red-500/80 hover:bg-red-500 text-white border border-red-400/50 backdrop-blur-sm shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            ⌫
          </button>
          <button
            onClick={() => handleNumberClick('0')}
            className="h-16 text-xl font-semibold rounded-2xl bg-pink-500/80 hover:bg-pink-500 text-white border border-pink-400/50 backdrop-blur-sm shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            0
          </button>
          <button
            disabled
            className="h-16 text-xl font-semibold rounded-2xl bg-gray-500/50 text-white/50 cursor-not-allowed"
          >
            #
          </button>
        </div>

        {/* Enter button */}
        <button
          onClick={handleLogin}
          disabled={password.length === 0}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          Entrar
        </button>

        <div className="text-center mt-6">
          <p className="text-white/60 text-xs">
            Hecho con ❤️ por Jefer para Angie
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

