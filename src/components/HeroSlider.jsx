import React, { useEffect, useState } from "react";

const slides = [
  {
    title: "Performance Running",
    sub: "가벼운 착용감과 통기성으로 더 멀리",
    image:
      "https://images.unsplash.com/photo-1521417531039-96c46f2c0bd9?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Training Essentials",
    sub: "탄탄한 지지력으로 집중력 UP",
    image:
      "https://images.unsplash.com/photo-1599050751795-5cda89f0f4fb?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Outdoor & Trail",
    sub: "거친 길에서도 흔들림 없는 퍼포먼스",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      4000
    );
    return () => clearInterval(id);
  }, []);
  const s = slides[index];
  return (
    <div
      className="hero-slide"
      style={{ background: `url(${s.image}) center/cover no-repeat` }}
    >
      <div className="hero-media" aria-hidden="true" />
      <button
        aria-label="이전"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
        style={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          border: "none",
          borderRadius: 999,
          width: 36,
          height: 36,
          cursor: "pointer",
        }}
      >
        ‹
      </button>
      <div
        style={{
          maxWidth: 460,
          background: "rgba(255,255,255,0.85)",
          padding: 20,
          borderRadius: 12,
        }}
      >
        <div className="hero-title">{s.title}</div>
        <div className="hero-sub">{s.sub}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div className="hero-ctrl">
        {index + 1} / {slides.length}
      </div>
      <button
        aria-label="다음"
        onClick={() => setIndex((index + 1) % slides.length)}
        style={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.8)",
          border: "none",
          borderRadius: 999,
          width: 36,
          height: 36,
          cursor: "pointer",
        }}
      >
        ›
      </button>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 16,
          display: "flex",
          gap: 6,
          justifyContent: "center",
        }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: i === index ? "#111" : "#d1d5db",
              display: "inline-block",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}
