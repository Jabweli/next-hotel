"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container px-4 mx-auto flex flex-col gap-5 items-center justify-center pt-28">
      <h2 className="font-bold text-3xl text-red-800 mb-5">
        Something went wrong!
      </h2>
      <p className="text-red-600">
        {error.message || "An unexpected error occurred."}
      </p>

      <button
        onClick={() => reset()}
        className="bg-tertiary-dark text-white font-bold px-10 py-4 rounded-full"
      >
        Try Again
      </button>
    </div>
  );
}
