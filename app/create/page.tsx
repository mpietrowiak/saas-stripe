"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UploadFileResponse } from "@xixixao/uploadstuff";
import { UploadButton, UploadDropzone } from "@xixixao/uploadstuff/react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import Image from "next/image";
import UploadThumbnailPreview from "../upload-thumbnail-preview";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

export default function CreatePage() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<string | null>(null);
  const createThubmnail = useMutation(api.thumbnails.createThumbnail);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  //   const saveStorageId = useMutation(api.files.saveStorageId);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");

  //   const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
  //     await saveStorageId({ storageId: (uploaded[0].response as any).storageId });
  //   };

  return (
    <div className="my-16">
      <h1 className="text-4xl font-bold mb-8">Create a Thumbnail Test</h1>

      <p className="text-lg max-w-md mb-8">
        Create your test so that other people can vote on their favorite
        thumbnail and help you redesign or pickt he best options.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;

          if (!title || !imageA || !imageB) {
            setErrors("please fill in all fields on the page");
            toast({
              title: "Form Errors",
              description: "Please fill in all fields on the page",
              variant: "destructive",
            });
            return;
          }

          await createThubmnail({
            aImage: imageA,
            bImage: imageB,
            title: "Test Thumbnail",
          });
        }}
      >
        <Label htmlFor="title" className="mb-4 block">
          Your Test Title
        </Label>
        <Input id="title" type="text" className="mb-8" required />

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Test Image A</h2>

            <div className=" w-80 border opacity-75">
              <UploadDropzone
                className={() =>
                  clsx(" p-8 w-full", { "border border-red-500": errors })
                }
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                }}
                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                  console.log("uploaded", uploaded);
                  setImageA((uploaded[0].response as any).storageId);
                }}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
            </div>

            {imageA && <UploadThumbnailPreview storageId={imageA} />}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Test Image B</h2>

            <div className="w-80 border opacity-75">
              <UploadDropzone
                className={() =>
                  clsx(" p-8 w-full", { "border border-red-500": errors })
                }
                uploadUrl={generateUploadUrl}
                fileTypes={{
                  "image/*": [".png", ".gif", ".jpeg", ".jpg"],
                }}
                onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                  console.log("uploaded", uploaded);
                  setImageB((uploaded[0].response as any).storageId);
                }}
                onUploadError={(error: unknown) => {
                  // Do something with the error.
                  alert(`ERROR! ${error}`);
                }}
              />
            </div>

            {imageB && <UploadThumbnailPreview storageId={imageB} />}
          </div>
          <Button>Create Thumbnail test</Button>
        </div>
      </form>
    </div>
  );
}
