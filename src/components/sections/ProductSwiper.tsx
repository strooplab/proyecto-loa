"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

interface ProductSwiperProps {
  images: string[];
  productoName: string;
}

export default function ProductSwiper({ images, productoName }: ProductSwiperProps) {
  const imageList = Array.isArray(images) ? images : [images];
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="block lg:hidden w-full mb-4">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          effect={"fade"}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          speed={500}
          className="w-full h-150 rounded-lg overflow-hidden shadow-md"
        >
          {imageList.map((imgUrl, index) => (
            <SwiperSlide key={index} className="relative h-full w-full bg-gray-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imgUrl}`}
                alt={`${productoName} - Vista ${index + 1}`}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover object-center cursor-pointer"
                onClick={() => {
                  setSelectedImage(imgUrl);
                  setIsOpenModal(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden lg:grid grid-cols-2 gap-4 mb-2">
        {/* Imagen principal grande */}
        <div
          className="col-span-2 relative aspect-4/3 xl:aspect-9/16 
          w-full rounded-xl overflow-hidden bg-gray-100 shadow-md cursor-pointer group"
          onClick={() => {
            setSelectedImage(`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageList[0]}`);
          }}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${imageList[0]}`}
            alt={`${productoName} - Principal`}
            fill
            sizes="(max-width: 1200px) 50vw, 40vw"
            priority
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Cuadrícula de miniaturas secundarias abajo */}
        {imageList.slice(1, 3).map((img, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedImage(`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${img}`);
              setIsOpenModal(true);
            }}
            className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 shadow-sm cursor-pointer group"
          >
            <Image
              alt={`${productoName} - Vista ${index + 2}`}
              src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${img}`}
              fill
              sizes="25vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="flex items-center justify-center text-body-sm text-espresso gap-2 opacity-0 group-hover:opacity-100 bg-cream/90 px-3 py-1.5 rounded-md shadow transition-opacity">
                <span className="material-symbols-outlined">fit_screen</span>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity">Expandir</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpenModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setIsOpenModal(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              className="absolute flex items-center justify-center top-4 right-2 lg:-right-6 text-cream bg-espresso/60 hover:bg-espresso p-3 rounded-full transition-colors z-10"
              onClick={() => setIsOpenModal(false)}
            >
              <span className="material-symbols-outlined text-2xl leading-none">close</span>
            </button>
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt={`${productoName} ampliada`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
