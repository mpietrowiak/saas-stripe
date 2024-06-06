"use client";

export default function SideBySideThumbnails({
  imageA,
  imageB,
}: {
  imageA: React.ReactNode;
  imageB: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Test Image A</h2>
        {imageA}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Test Image B</h2>
        {imageB}
      </div>
    </div>
  );
}
