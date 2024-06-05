"use client";

import styles from "./page.module.css";
import { SignInButton } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import { useSession } from "@clerk/clerk-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { isSignedIn } = useSession();
  const createThubmnail = useMutation(api.thumbnails.createThumbnail);
  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <main className="">
      {isAuthenticated && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // const form = e.target as HTMLFormElement;
            // const formData = new FormData(form);
            // const title = formData.get("title") as string;
            // await createThubmnail({
            //   title,
            // });
            // form.reset();
          }}
        >
          <label>Title</label>
          <input name="title" className="text-white" />
          <button>Create</button>
        </form>
      )}

      {/* {thumbnails?.length || 0} */}

      {thumbnails?.map((thumbnail) => {
        return <div key={thumbnail._id}>{thumbnail.title}</div>;
      })}
    </main>
  );
}
