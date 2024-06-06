"use client";

import { useSession } from "@clerk/clerk-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
  const { isLoading, isAuthenticated } = useConvexAuth();

  return <main className="">Welcome to ThumbnailRater</main>;
}
