'use client'

import AOS from "aos";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Script from 'next/script';

export default function MainLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      <Header />

      <main className="main">
        {children}
      </main>

      {/* <!-- Preloader --> */}
      {/* <div id="preloader"></div> */}

      {/* <!-- Scroll Top --> */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

      {/* <!-- Vendor JS Files --> */}
      {/* <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script> */}
      {/* <script src="/assets/vendor/php-email-form/validate.js"></script> */}
      {/* <script src="/assets/vendor/aos/aos.js"></script> */}
      {/* <script src="/assets/vendor/glightbox/js/glightbox.min.js"></script> */}
      {/* <script src="/assets/vendor/purecounter/purecounter_vanilla.js"></script> */}
      {/* <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script> */}
      {/* <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script> */}
      {/* <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script> */}

      {/* <!-- Main JS File --> */}
      {/* <script src="/assets/js/main.js"></script> */}

      {/* 비동기 로드 방식: afterInteractive 전략으로 스크립트 로드 */}
      <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" />

      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}