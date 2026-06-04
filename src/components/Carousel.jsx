import { useState } from 'react'
import '../styles/carousel.css'

export default function Carousel({ items, renderCard, visibleCount = 3 }) {
  const [index, setIndex] = useState(0)
  const maxIndex = Math.max(0, items.length - visibleCount)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

  const visible = items.slice(index, index + visibleCount)

  return (
    <div className="carousel">
      <button className="carousel__arrow carousel__arrow--prev" onClick={prev} disabled={index === 0}>‹</button>
      <div className="carousel__track">
        {visible.map((item, i) => renderCard(item, i))}
      </div>
      <button className="carousel__arrow carousel__arrow--next" onClick={next} disabled={index >= maxIndex}>›</button>
    </div>
  )
}
