'use client';

import Link from "next/link";
import AnimatedBackground from "../../ui/animatedBackground";

export default function IntroSection() {
  return (
    <>
      {/* Enhanced background with larger, more dynamic elements */}
      <AnimatedBackground particleCount={60} elementCount={20} elements={["♥", "♡", "♥", "♡"]} />

      <section id="intro" className="hero section dark-background">
        {/* <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" /> */}
        <div className="container d-flex flex-column align-items-center">
          <h2 data-aos="zoom-in" data-aos-easing="ease-in-sine" data-aos-duration="800"
            className="drop-shadow-md"
            style={{ color: 'oklch(.586 .253 17.585)' }}>
            LOVE ∞ STORY</h2>

          <p data-aos="zoom-in" data-aos-easing="ease-in-sine" data-aos-duration="1600"
            className="drop-shadow-sm"
            style={{ textAlign: 'center', color: 'oklch(.455 .188 13.697)' }}>
            당신의 이야기 속에서 운명적인 만남이 피어납니다.<br />지금 그 이야기를 펼쳐보세요.</p>

          <div className="d-flex mt-4" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" data-aos-delay="1800">
            <Link href={'/profile'} className="btn-get-started">시작 하기</Link>
          </div>
        </div>
      </section>
    </>
  );
}