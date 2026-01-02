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

export async function getProducts() {
  return await client.fetch(`*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    price,
    "category": category->title,
    "imageUrl": variants[0].images[0]
  }`);
}

export async function getProduct(slug: string) {
  return await client.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    price,
    "category": category->title,
    variants
  }`, { slug });
}

export async function getCategories() {
  return await client.fetch(`*[_type == "category"]{
    _id,
    title,
    "slug": slug.current
  }`);
}

export async function getHomepage() {
  return await client.fetch(`*[_type == "homepage"][0]{
    hero,
    "newArrivals": newArrivals[]->{
      _id,
      name,
      "slug": slug.current,
      price,
      "category": category->title,
      "imageUrl": variants[0].images[0]
    },
    sections
  }`);
}
