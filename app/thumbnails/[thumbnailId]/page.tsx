"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function ThumbnailPage() {
  const params = useParams<{ thumbnailId: Id<"thumbnails"> }>();
  const thumbnnail = useQuery(api.thumbnails.getThumbnail, {
    thumbnailId: params.thumbnailId,
  });
  return (
    <div className="mt-16">
      <h1>{params.thumbnailId}</h1>

      <h2>{thumbnnail?.title}</h2>
    </div>
  );
}
