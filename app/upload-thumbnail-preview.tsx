import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

export default function UploadThumbnailPreview({
  storageId,
}: {
  storageId: string;
}) {
  const url = useQuery(api.thumbnails.getThumbnailUrl, { storageId });
  return url && <img src={url} alt={url} width={200} height={200} />;
}
