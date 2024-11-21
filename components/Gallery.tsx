import Image from "next/image";

export default function Gallery() {
  return (
    <div className="mx-autodd containerdd py-14 h-full px-4dd">
      <div className="flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/9.jpg"
              width={1920}
              height={1280}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/hero-2.jpeg"
              width={5843}
              height={3895}
            />
          </div>
          <div className="w-full p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/g1.jpg"
              width={700}
              height={467}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/hero-1.jpeg"
              width={5472}
              height={3678}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/hero-2.jpeg"
              width={5843}
              height={3895}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2 h-48">
            <Image
              alt="gallery"
              className="img"
              src="/hero-3.jpeg"
              width={4000}
              height={6000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
