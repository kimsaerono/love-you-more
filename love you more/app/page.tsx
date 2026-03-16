"use client"

import { useState, useEffect, useCallback } from "react"

const HeartIcon = ({ size = 24, color = "#ff6b8a", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

const Sparkle = ({ style }: { style: React.CSSProperties }) => (
  <div style={{
    position: "absolute",
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.8)",
    animation: "sparkle 2s ease-in-out infinite",
    ...style,
  }} />
)

export default function ValentinePage() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; size: number; delay: number; duration: number; color: string }>>([])
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([])
  const [clickCount, setClickCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [burstHearts, setBurstHearts] = useState<Array<{ id: number; angle: number }>>([])

  const loveMessage = "在这个世界上，有一种幸运叫做遇见你。每一天醒来，想到你在我身边，就觉得生活充满了阳光。你的笑容是我最美的风景，你的声音是我最动听的旋律。我想牵着你的手，走过春夏秋冬，看遍人间烟火。我爱你，不止今天，而是永远。"

  useEffect(() => {
    const colors = ["#ff6b8a", "#ff8fab", "#ffb3c6", "#ffc2d1", "#ff4d6d", "#c9184a"]
    setHearts(Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    })))
    setSparkles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    })))
  }, [])

  useEffect(() => {
    if (showMessage && displayedText.length < loveMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(loveMessage.slice(0, displayedText.length + 1))
      }, 80)
      return () => clearTimeout(timeout)
    }
  }, [showMessage, displayedText, loveMessage])

  const handleHeartClick = useCallback(() => {
    setBurstHearts(Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i * 30) * (Math.PI / 180),
    })))
    setTimeout(() => setBurstHearts([]), 1000)
    setClickCount((prev) => {
      if (prev + 1 >= 3 && !showMessage) setShowMessage(true)
      return prev + 1
    })
  }, [showMessage])

  return (
    <>
      <style>{`
        @keyframes fall { 0% { transform: translateY(-100px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; } }
        @keyframes sparkle { 0%, 100% { opacity: 0; transform: scale(0); } 50% { opacity: 1; transform: scale(1); } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 10% { transform: scale(1.15); } 20% { transform: scale(1); } 30% { transform: scale(1.1); } 40% { transform: scale(1); } }
        @keyframes burst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 107, 138, 0.5)); } 50% { filter: drop-shadow(0 0 30px rgba(255, 107, 138, 0.8)); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .title-char { display: inline-block; animation: bounce 1s ease-in-out infinite; }
        .cursor { display: inline-block; width: 2px; height: 1.2em; background-color: #ff6b8a; margin-left: 2px; animation: blink 1s step-end infinite; vertical-align: middle; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1a0a10 0%, #2d1320 50%, #1a0a10 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif", padding: "20px", boxSizing: "border-box" }}>
        {hearts.map((heart) => (
          <div key={heart.id} style={{ position: "absolute", left: `${heart.left}%`, top: "-50px", animation: `fall ${heart.duration}s linear infinite`, animationDelay: `${heart.delay}s`, zIndex: 1 }}>
            <HeartIcon size={heart.size} color={heart.color} />
          </div>
        ))}

        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} style={{ left: `${sparkle.left}%`, top: `${sparkle.top}%`, animationDelay: `${sparkle.delay}s` }} />
        ))}

        <div style={{ textAlign: "center", zIndex: 10, maxWidth: "600px" }}>
          <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", color: "#ff6b8a", marginBottom: "40px", textShadow: "0 0 30px rgba(255, 107, 138, 0.8)", letterSpacing: "0.1em" }}>
            {"致我最爱的你".split("").map((char, i) => (
              <span key={i} className="title-char" style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
            ))}
          </h1>

          <div style={{ position: "relative", display: "inline-block", cursor: "pointer", marginBottom: "40px" }} onClick={handleHeartClick}>
            <div style={{ animation: "heartbeat 1.5s ease-in-out infinite, glow 2s ease-in-out infinite", padding: "20px" }}>
              <HeartIcon size={120} color="#ff6b8a" />
            </div>
            {burstHearts.map((burst) => (
              <div key={burst.id} style={{ position: "absolute", left: "50%", top: "50%", marginLeft: "-10px", marginTop: "-10px", animation: "burst 0.8s ease-out forwards", "--tx": `${Math.cos(burst.angle) * 100}px`, "--ty": `${Math.sin(burst.angle) * 100}px` } as React.CSSProperties}>
                <HeartIcon size={20} color="#ff8fab" />
              </div>
            ))}
            {clickCount < 3 && <p style={{ color: "#ffb3c6", fontSize: "14px", marginTop: "15px", opacity: 0.8 }}>点击爱心 {3 - clickCount} 次解锁惊喜</p>}
          </div>

          {showMessage && (
            <div style={{ animation: "fadeInUp 0.8s ease-out", background: "rgba(255, 107, 138, 0.1)", borderRadius: "20px", padding: "30px", border: "1px solid rgba(255, 107, 138, 0.3)" }}>
              <p style={{ color: "#ffc2d1", fontSize: "clamp(1rem, 4vw, 1.25rem)", lineHeight: 2, textAlign: "justify", margin: 0 }}>
                {displayedText}
                {displayedText.length < loveMessage.length && <span className="cursor" />}
              </p>
              {displayedText.length === loveMessage.length && (
                <div style={{ marginTop: "30px", animation: "fadeInUp 0.5s ease-out" }}>
                  <p style={{ color: "#ff6b8a", fontSize: "clamp(1.5rem, 5vw, 2rem)", fontWeight: "bold", textShadow: "0 0 20px rgba(255, 107, 138, 0.6)", margin: 0 }}>Love You More wangjing</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "15px" }}>
                    {[...Array(5)].map((_, i) => <HeartIcon key={i} size={24} color="#ff6b8a" style={{ animation: "heartbeat 1s ease-in-out infinite", animationDelay: `${i * 0.1}s` }} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: "absolute", bottom: "20px", color: "#ff8fab", fontSize: "14px", opacity: 0.6, zIndex: 10 }}>Made with bin</div>
      </div>
    </>
  )
}
