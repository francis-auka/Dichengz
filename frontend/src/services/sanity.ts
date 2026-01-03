import { createClient } from '@sanity/client';

// Sanity Configuration - Using environment variables (Vite-compatible)
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION;
const token = import.meta.env.VITE_SANITY_TOKEN; // Optional: for authenticated requests

// Runtime validation
if (!projectId || !dataset || !apiVersion) {
  throw new Error(
    'Missing required Sanity environment variables. Please ensure VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, and VITE_SANITY_API_VERSION are set in .env'
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to avoid CORS issues and ensure fresh data
  token, // Include token if available for authenticated requests
  perspective: 'published', // Only return published documents
});

export async function getHomepageItems() {
  return await client.fetch(`*[_type == "homepage"]{
    _id,
    name,
    price,
    category,
    "slug": slug.current,
    "imageUrl": image
  }`);
}

export async function getShopItems() {
  return await client.fetch(`*[_type == "shop"]{
    _id,
    name,
    price,
    category,
    "slug": slug.current,
    "imageUrl": image
  }`);
}

export async function getProduct(slug: string) {
  return await client.fetch(`*[_type in ["homepage", "shop"] && slug.current == $slug][0]{
    _id,
    name,
    price,
    "category": category,
    "slug": slug.current,
    "imageUrl": image,
    "description": description,
    "variants": []
  }`, { slug });
}
