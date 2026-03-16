"use client"

import { useEffect, useState, useCallback } from "react"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FallingHeart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
}

function FallingHearts() {
  const [hearts, setHearts] = useState<FallingHeart[]>([])

  useEffect(() => {
    const initialHearts: FallingHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 12 + Math.random() * 24,
      opacity: 0.3 + Math.random() * 0.5,
    }))
    setHearts(initialHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            className="text-primary fill-primary"
            style={{
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  )
}

function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; top: number; left: number; delay: number }[]>([])

  useEffect(() => {
    const initialSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setSparkles(initialSparkles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <Sparkles
          key={sparkle.id}
          className="absolute text-primary/40 animate-pulse"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animationDelay: `${sparkle.delay}s`,
            width: 16 + Math.random() * 16,
            height: 16 + Math.random() * 16,
          }}
        />
      ))}
    </div>
  )
}

function HeartBurst({ x, y }: { x: number; y: number }) {
  const [hearts, setHearts] = useState<{ id: number; angle: number; distance: number }[]>([])

  useEffect(() => {
    const burstHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 8,
      distance: 50 + Math.random() * 50,
    }))
    setHearts(burstHearts)
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-primary fill-primary animate-burst"
          style={{
            width: 20,
            height: 20,
            ["--angle" as string]: `${heart.angle}deg`,
            ["--distance" as string]: `${heart.distance}px`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes burst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
              )
              scale(1);
            opacity: 0;
          }
        }
        :global(.animate-burst) {
          animation: burst 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default function Valentine() {
  const [showMessage, setShowMessage] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([])
  const [typedText, setTypedText] = useState("")

  const loveMessage = "在这个世界上，遇见你是我最大的幸运。你的微笑如同阳光，温暖着我的每一天。愿与你共度余生，爱你到永远..."

  const handleHeartClick = useCallback(
    (e: React.MouseEvent) => {
      const newBurst = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setBursts((prev) => [...prev, newBurst])
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id))
      }, 1000)

      setClickCount((prev) => prev + 1)
      if (clickCount >= 2) {
        setShowMessage(true)
      }
    },
    [clickCount]
  )

  useEffect(() => {
    if (showMessage && typedText.length < loveMessage.length) {
      const timeout = setTimeout(() => {
        setTypedText(loveMessage.slice(0, typedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    } else if (typedText.length === loveMessage.length) {
      setTimeout(() => setShowFinalMessage(true), 500)
    }
  }, [showMessage, typedText, loveMessage])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <FallingHearts />
      <FloatingSparkles />

      {bursts.map((burst) => (
        <HeartBurst key={burst.id} x={burst.x} y={burst.y} />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Main Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
            <span className="inline-block animate-bounce-slow">致</span>
            <span className="inline-block animate-bounce-slow animation-delay-100">我</span>
            <span className="inline-block animate-bounce-slow animation-delay-200">最</span>
            <span className="inline-block animate-bounce-slow animation-delay-300">爱</span>
            <span className="inline-block animate-bounce-slow animation-delay-400">的</span>
            <span className="inline-block animate-bounce-slow animation-delay-500">你</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">Happy Valentine&apos;s Day</p>
        </div>

        {/* Interactive Heart */}
        <div className="relative mb-12">
          <button
            onClick={handleHeartClick}
            className="group relative focus:outline-none transform transition-transform hover:scale-110 active:scale-95"
            aria-label="点击爱心"
          >
            <Heart
              className="w-32 h-32 md:w-48 md:h-48 text-primary fill-primary animate-heartbeat drop-shadow-lg cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg md:text-2xl">
                {clickCount < 3 ? "点我" : ""}
              </span>
            </div>
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse opacity-50" />
          </button>
          {clickCount > 0 && clickCount < 3 && (
            <p className="text-center mt-4 text-muted-foreground animate-bounce">
              再点击 {3 - clickCount} 次解锁惊喜
            </p>
          )}
        </div>

        {/* Love Message */}
        {showMessage && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border">
              <p className="text-lg md:text-xl text-card-foreground leading-relaxed min-h-[120px]">
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
          </div>
        )}

        {/* Final Message */}
        {showFinalMessage && (
          <div className="mt-8 animate-fade-in-up animation-delay-500">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary fill-primary animate-heartbeat" />
                <span className="text-2xl md:text-3xl font-bold text-foreground">我爱你</span>
                <Heart className="w-6 h-6 text-primary fill-primary animate-heartbeat animation-delay-200" />
              </div>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setShowMessage(false)
                  setShowFinalMessage(false)
                  setClickCount(0)
                  setTypedText("")
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                再看一次
              </Button>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-muted-foreground">
            Made with <Heart className="inline w-4 h-4 text-primary fill-primary" /> for you
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </main>
  )
}
