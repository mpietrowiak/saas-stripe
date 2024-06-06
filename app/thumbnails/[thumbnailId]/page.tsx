"use client";

import SideBySideThumbnails from "@/components/side-by-side-thumbnails";
import ThumbnailPreview from "@/components/thumbnail-preview";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function ThumbnailPage() {
  const params = useParams<{ thumbnailId: Id<"thumbnails"> }>();
  const thumbnail = useQuery(api.thumbnails.getThumbnail, {
    thumbnailId: params.thumbnailId,
  });
  return (
    <div className="mt-16">
      <h2 className="mb-8 text-4xl">{thumbnail?.title}</h2>

      <SideBySideThumbnails
        imageA={
          thumbnail?.aImage && <ThumbnailPreview storageId={thumbnail.aImage} />
        }
        imageB={
          thumbnail?.bImage && <ThumbnailPreview storageId={thumbnail.bImage} />
        }
      />
    </div>
  );
}
