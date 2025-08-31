import { useState, useEffect } from 'react'
import { Heart, Gift, Cake, Star } from 'lucide-react'

const BirthdayPage = () => {
  const [timeLeft, setTimeLeft] = useState({})
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          >
            {i % 4 === 0 && <Heart className="text-pink-200" size={20 + Math.random() * 20} />}
            {i % 4 === 1 && <Star className="text-yellow-200" size={15 + Math.random() * 15} />}
            {i % 4 === 2 && <Gift className="text-purple-200" size={18 + Math.random() * 18} />}
            {i % 4 === 3 && <Cake className="text-orange-200" size={16 + Math.random() * 16} />}
          </div>
        ))}
      </div>

      {/* Fireworks effect for birthday */}
      {isBirthday && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-bounce">
            {isBirthday ? '🎉 ¡FELIZ CUMPLEAÑOS! 🎉' : '🎂 Cuenta Regresiva 🎂'}
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-2">
            Angie ✨
          </h2>
          <p className="text-xl text-white/80">
            {isBirthday ? 'Hoy es tu día especial' : 'Para tu día especial'}
          </p>
        </div>

        {/* Countdown Timer */}
        {!isBirthday && (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 shadow-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Tiempo restante:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/20 rounded-2xl p-4 mb-2">
                    <div className="text-4xl md:text-5xl font-bold text-white">
                      {value || 0}
                    </div>
                  </div>
                  <div className="text-white/80 font-semibold capitalize">
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
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 shadow-2xl border border-white/20 text-center">
            <div className="text-6xl mb-4">🎉🎂🎈</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              ¡Hoy es tu día especial!
            </h3>
            <p className="text-xl text-white/90">
              Que este nuevo año de vida esté lleno de alegría, amor y todos tus sueños hechos realidad.
            </p>
          </div>
        )}

        {/* Personal Message Preview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Un mensaje especial para ti...
          </h3>
          <div className="text-center">
            <p className="text-lg text-white/90 mb-4">
              Desde que comenzó este momento especial, has sido lo más preciado en mi vida.
            </p>
            <p className="text-white/80 italic">
              - Con cariño, Jefer ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirthdayPage

