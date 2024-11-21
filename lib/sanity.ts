import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: "2022-03-07",
  // useCdn: process.env.NODE_ENV === "production",
  useCdn: false,
  token: process.env.SANITY_STUDIO_TOKEN,
});
