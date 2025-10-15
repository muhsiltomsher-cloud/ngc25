'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const sampleImages = [
  "/images/projects/almullah.png",
  "/images/projects/jamavar.png",
  "/images/projects/palm-jumeirah.png",
    "/images/projects/almullah.png",
  "/images/projects/jamavar.png",
  "/images/projects/palm-jumeirah.png",
    "/images/projects/almullah.png",
  "/images/projects/jamavar.png",
  "/images/projects/palm-jumeirah.png",

];

// Repeat images to increase the total
const slides = [...sampleImages, ...sampleImages, ...sampleImages];

const hoverText = "See on Instagram";

const InstagramFeedSection = () => (
  <section className='bg-[#fefff1] pt-4 pb-20' >
    <h2 style={{
      fontSize: "2rem",
      textAlign: "center",
      marginBottom: "24px"
    }}>
      <a
        href="https://www.instagram.com/ngc_uae/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#222", textDecoration: "none" }}
      >
        Follow us on Instagram
      </a>
    </h2>
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={5}
      spaceBetween={10}
      loop
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      style={{ width: "100%", padding: "10px 0" }}
      breakpoints={{
        320: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      }}
    >
      {slides.map((src, idx) => (
        <SwiperSlide key={idx}>
          <a
            href="https://www.instagram.com/your_username/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: "100%",
              maxWidth: "420px",
              aspectRatio: "1 / 1", // Ensures square shape in modern browsers
              height: "420px", // Fallback for older browsers
              position: "relative",
              display: "block"
            }}
          >
            <img
              src={src}
              alt={`Instagram sample ${idx + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
              }}
            />
            {/* Hover overlay */}
            <div
              style={{
                position: "absolute",
                left: 0, top: 0, right: 0, bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(0,0,0,0.34)",
                color: "#fff",
                fontSize: "1rem",
                opacity: 0,
                borderRadius: "12px",
                transition: "opacity 0.25s",
                pointerEvents: "none"
              }}
              className="ig-hover"
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: 15,
                  marginBottom: 8
                }}
              >
                photo_camera
              </span>
              <span>{hoverText}</span>
            </div>
            <style>
              {`
                a:hover .ig-hover {
                  opacity: 1 !important;
                  pointer-events: auto;
                }
              `}
            </style>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default InstagramFeedSection;
