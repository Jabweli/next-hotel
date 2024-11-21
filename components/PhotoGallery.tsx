"use client";
import { urlBuilder } from "@/lib/apis";
import { ImageType } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

type GalleryProps = {
  gallery: ImageType[];
};

export default function PhotoGallery({ gallery }: GalleryProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePrevious = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const maxVisiblePhotos = 5;
  const totalPhotos = gallery.length;
  const displayPhotos = gallery.slice(1, maxVisiblePhotos - 1);
  const remainingPhotos = totalPhotos - maxVisiblePhotos;

  return (
    <div className="flex flex-row flex-wrap gap-3 bg-graydd dark:bg-[#090909]dd rounded-2xl p-4dd">
      {/* main image */}
      <div className="h-[350px] flex-1 relative rounded-2xl overflow-hidden cursor-pointer">
        <div className="w-full h-full hidden lg:flex">
          <Image
            src={
              urlBuilder(gallery[0].image)?.url() ||
              "https://placehold.co/800x600"
            }
            alt="room"
            className="rounded-xl img-scale-animation w-full h-full object-cover"
            priority
            width={gallery[0].width}
            height={gallery[0].height}
            onClick={() => openModal(0)}
          />
        </div>

        <div className="w-full h-full lg:hidden flex">
          <Image
            src={
              urlBuilder(gallery[currentPhotoIndex].image)?.url() ||
              "https://placehold.co/800x600"
            }
            alt="room"
            className="rounded-xl img-scale-animation w-full h-full object-cover"
            priority
            width={gallery[0].width}
            height={gallery[0].height}
            onClick={() => openModal(currentPhotoIndex)}
          />
        </div>
      </div>

      {/* slider nav buttons */}
      <div className="w-full lg:hidden flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="circle-icon" onClick={handlePrevious}>
            <FaArrowLeft fontSize={14} />
          </div>

          <div className="circle-icon" onClick={handleNext}>
            <FaArrowRight fontSize={14} />
          </div>
        </div>

        <div>
          <span>
            {currentPhotoIndex + 1} / {gallery.length}
          </span>
        </div>
      </div>

      {/* other gallery photos */}
      <div className="w-full hidden lg:flex-1 lg:flex flex-wrap gap-[12px]">
        {displayPhotos?.length > 0 &&
          displayPhotos.map((image, index) => (
            <div
              key={image._key}
              className="relative w-[48%] h-[170px] rounded-2xl overflow-hidden"
            >
              <Image
                src={
                  urlBuilder(image.image)?.url() ||
                  "https://placehold.co/600x400"
                }
                alt="room"
                width={image.width}
                height={image.height}
                className="rounded-xl img-scale-animation w-full h-full object-cover cursor-pointer"
                priority
                onClick={() => openModal(index + 1)}
              />
            </div>
          ))}

        {remainingPhotos > 0 && (
          <div
            className="cursor-pointer relative w-[48%] h-[170px] rounded-2xl overflow-hidden"
            onClick={() => openModal(maxVisiblePhotos)}
          >
            <Image
              src={urlBuilder(gallery[maxVisiblePhotos - 1].image)?.url()!}
              alt={gallery[maxVisiblePhotos - 1].altText}
              width={gallery[maxVisiblePhotos - 1].width}
              height={gallery[maxVisiblePhotos - 1].height}
              className="rounded-xl img-scale-animation w-full h-full object-cover cursor-pointer"
              priority
            />
            <div className="absolute cursor-pointer text-white inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] text-2xl font-semibold">
              + {remainingPhotos}
            </div>
          </div>
        )}
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-[55]">
          <div className="h-[75vh] w-[320px] md:w-[700px] relative">
            <Image
              src={
                urlBuilder(gallery[currentPhotoIndex].image)?.url() ||
                "https://placehold.co/600x400"
              }
              alt={`Room Photo ${currentPhotoIndex + 1}`}
              width={gallery[currentPhotoIndex].width}
              height={gallery[currentPhotoIndex].height}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-4">
                <div className="circle-icon" onClick={handlePrevious}>
                  <FaArrowLeft fontSize={14} />
                </div>

                <div className="circle-icon" onClick={handleNext}>
                  <FaArrowRight fontSize={14} />
                </div>
              </div>
              <span className="text-white text-sm">
                {currentPhotoIndex + 1} / {gallery.length}
              </span>
            </div>
            <button
              className="absolute -top-10 -right-6 circle-icon"
              onClick={closeModal}
            >
              <MdCancel className="font-medium text-2xl text-tertiary-dark" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
