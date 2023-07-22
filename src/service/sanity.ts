import { createClient } from "@sanity/client";
import sanityImage from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "bwpbrlr1",
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

export const imageBuilder = sanityImage(client)
