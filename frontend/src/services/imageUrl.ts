import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from './sanity';

// Create image URL builder instance
const builder = imageUrlBuilder(client);

// Helper function to generate optimized image URLs
export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}

// Helper to generate URL with specific dimensions
export function urlForWidth(source: SanityImageSource, width: number) {
    return builder.image(source).width(width).auto('format').quality(80);
}

// Helper to generate URL with width and height
export function urlForDimensions(source: SanityImageSource, width: number, height: number) {
    return builder.image(source).width(width).height(height).auto('format').quality(80);
}
