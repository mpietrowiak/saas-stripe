import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { useState } from "react";

export default function ThumbnailPreview({ storageId }: { storageId: string }) {
  const url = useQuery(api.thumbnails.getThumbnailUrl, { storageId });
  return url && <Image src={url} alt={url} width={200} height={200} />;
}
