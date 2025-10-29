import HeaderSlider from '@/components/HeaderSlider'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="relative min-h-screen overflow-hidden">
        {/* HeaderSlider ultra sophistiqué */}
        <HeaderSlider />
        
        {/* Effets de particules flottantes */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Overlay de grain ultra subtil */}
        <div className="absolute inset-0 opacity-[0.008] pointer-events-none z-10">
          <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
        </div>

        {/* Vignette ultra subtile */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="w-full h-full bg-gradient-radial from-transparent via-transparent to-black/20" />
        </div>
      </div>
    </Layout>
  )
} 