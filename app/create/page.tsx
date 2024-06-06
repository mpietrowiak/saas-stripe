"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UploadFileResponse } from "@xixixao/uploadstuff";
import { UploadDropzone } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { FormEvent, useState } from "react";
import UploadThumbnailPreview from "../upload-thumbnail-preview";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [errors, setErrors] = useState({
    title: "",
    imageA: "",
    imageB: "",
  });
  const createThubmnail = useMutation(api.thumbnails.createThumbnail);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [title, setTitle] = useState("");
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({
      title: !title ? "Please fill in the title" : "",
      imageA: !imageA ? "Please upload an image for A" : "",
      imageB: !imageB ? "Please upload an image for B" : "",
    });
    if (!title || !imageA || !imageB) {
      toast({
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    const thumbnailId = await createThubmnail({
      aImage: imageA,
      bImage: imageB,
      title: title,
    });
    router.push(`/thumbnails/${thumbnailId}`);
  };

  return (
    <div className="my-16">
      <h1 className="text-4xl font-bold mb-8">Create a Thumbnail Test</h1>

      <p className="text-lg max-w-md mb-8">
        Create your test so that other people can vote on their favorite
        thumbnail and help you redesign or pick the best options.
      </p>

      <form onSubmit={handleSubmit}>
        <Label htmlFor="title" className="mb-4 block">
          Your Test Title
        </Label>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          id="title"
          type="text"
          className="mb-8"
          required
        />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Test Image A</h2>

            <div className="w-80 border opacity-75">
              <UploadDropzone
                className={() =>
                  clsx("p-8 w-full", {
                    "border border-red-500": errors?.imageA,
                  })
                }
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                }}
                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                  console.log("uploaded", uploaded);
                  setImageA((uploaded[0].response as any).storageId);
                  setErrors((errors) => ({
                    ...errors,
                    imageA: "",
                  }));
                }}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
            </div>

            {errors?.imageA && (
              <div className={"text-red-500"}>{errors?.imageA}</div>
            )}

            {imageA && <UploadThumbnailPreview storageId={imageA} />}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Test Image B</h2>

            <div className="w-80 border opacity-75">
              <UploadDropzone
                className={() =>
                  clsx(" p-8 w-full", {
                    "border border-red-500": errors?.imageB,
                  })
                }
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                }}
                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                  console.log("uploaded", uploaded);
                  setImageB((uploaded[0].response as any).storageId);
                  setErrors((errors) => ({
                    ...errors,
                    imageB: "",
                  }));
                }}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
            </div>

            {errors?.imageB && (
              <div className={"text-red-500"}>{errors?.imageB}</div>
            )}

            {imageB && <UploadThumbnailPreview storageId={imageB} />}
          </div>
          <Button className="min-w-0 w-auto">Create Thumbnail test</Button>
        </div>
      </form>
    </div>
  );
}
