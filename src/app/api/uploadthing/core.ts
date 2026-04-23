import {
  createUploadthing,
  type FileRouter as UTFileRouter,
} from "uploadthing/next";
import { requireAuth } from "@/actions/auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await requireAuth();
      if (!session) throw new Error("Devi essere loggato!");

      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload per utente: ", metadata.userId);
      console.log("Url del file caricato: ", file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies UTFileRouter;

export type OurFileRouter = typeof ourFileRouter;
