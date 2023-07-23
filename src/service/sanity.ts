import { createClient } from "@sanity/client";
import sanityImage from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "bwpbrlr1",
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const imageBuilder = sanityImage(client);

export function urlFor(source: SanityImageSource) {
  return imageBuilder.image(source).width(800).url();
}

export const assetsUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2023-07-23/assets/images/${process.env.SANITY_DATASET}`