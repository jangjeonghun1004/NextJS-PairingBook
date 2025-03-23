"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  particleCount?: number
  elementCount?: number
  elements?: string[]
  colorStart?: string
  colorMiddle?: string
  colorEnd?: string
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  opacity: number
  opacityChange: number
}

interface FloatingElement {
  x: number
  y: number
  size: number
  baseSize: number
  text: string
  color: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  scale: number
  scaleDirection: number
  opacity: number
}

export default function AnimatedBackground({
  particleCount = 60,
  elementCount = 20,
  elements = ["♥", "✨", "∞", "♡"],
  colorStart = "#fff0f5",
  colorMiddle = "#ffb6c1",
  colorEnd = "#ffc0cb",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Background animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1, // Larger particles
        color: `rgba(255, 182, 193, ${Math.random() * 0.6 + 0.2})`, // More vibrant
        speedX: Math.random() * 1.2 - 0.6, // Faster movement
        speedY: Math.random() * 1.2 - 0.6,
        opacity: Math.random() * 0.8 + 0.2,
        opacityChange: Math.random() * 0.01 * (Math.random() > 0.5 ? 1 : -1),
      })
    }

    // Create floating elements
    const floatingElements: FloatingElement[] = []

    for (let i = 0; i < elementCount; i++) {
      const baseSize = Math.random() * 24 + 16 // Larger size range (16-40)
      floatingElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: baseSize,
        baseSize: baseSize,
        text: elements[Math.floor(Math.random() * elements.length)],
        color: `rgba(219, 112, 147, ${Math.random() * 0.6 + 0.4})`, // More vibrant
        speedX: (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1), // More varied speeds
        speedY: (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5, // Faster rotation
        scale: 1,
        scaleDirection: Math.random() > 0.5 ? 0.005 : -0.005, // Pulsing effect
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, colorStart)
      gradient.addColorStop(0.5, colorMiddle)
      gradient.addColorStop(1, colorEnd)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles with glow effect
      particles.forEach((particle) => {
        ctx.beginPath()

        // Add glow effect
        const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2)
        glow.addColorStop(0, `rgba(255, 182, 193, ${particle.opacity})`)
        glow.addColorStop(1, "rgba(255, 182, 193, 0)")

        ctx.fillStyle = glow
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw the particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position with more dynamic movement
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Randomly change direction occasionally
        if (Math.random() > 0.99) {
          particle.speedX = Math.random() * 1.2 - 0.6
          particle.speedY = Math.random() * 1.2 - 0.6
        }

        // Update opacity for twinkling effect
        particle.opacity += particle.opacityChange
        if (particle.opacity > 0.9 || particle.opacity < 0.2) {
          particle.opacityChange = -particle.opacityChange
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
      })

      // Draw floating elements with enhanced effects
      floatingElements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate((element.rotation * Math.PI) / 180)
        ctx.scale(element.scale, element.scale)

        // Add shadow/glow effect
        ctx.shadowColor = element.color
        ctx.shadowBlur = 15

        ctx.font = `${element.size}px Arial`
        ctx.fillStyle = element.color
        ctx.globalAlpha = element.opacity
        ctx.fillText(element.text, 0, 0)
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
        ctx.restore()

        // Update position with more dynamic movement
        element.x += element.speedX
        element.y += element.speedY
        element.rotation += element.rotationSpeed

        // Pulsing size effect
        element.scale += element.scaleDirection
        if (element.scale > 1.2 || element.scale < 0.8) {
          element.scaleDirection = -element.scaleDirection
        }

        // Occasionally change direction for more dynamic movement
        if (Math.random() > 0.995) {
          element.speedX = (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1)
          element.speedY = (Math.random() * 1.5 - 0.75) * (Math.random() > 0.7 ? 2 : 1)
          element.rotationSpeed = (Math.random() - 0.5) * 1.5
        }

        // Wrap around screen
        if (element.x < -50) element.x = canvas.width + 50
        if (element.x > canvas.width + 50) element.x = -50
        if (element.y < -50) element.y = canvas.height + 50
        if (element.y > canvas.height + 50) element.y = -50
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [particleCount, elementCount, elements, colorStart, colorMiddle, colorEnd])

  return (
    <>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" style={{zIndex: 3}} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-100/70 -z-10" />
    </>
  )
}

