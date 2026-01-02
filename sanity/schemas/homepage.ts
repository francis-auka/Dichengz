export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                {
                    name: 'images',
                    title: 'Hero Images (Cloudinary URLs)',
                    type: 'array',
                    of: [{ type: 'url' }]
                },
                { name: 'ctaText', title: 'CTA Text', type: 'string' },
                { name: 'ctaLink', title: 'CTA Link', type: 'string' }
            ]
        },
        {
            name: 'newArrivals',
            title: 'New Arrivals',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }]
        },
        {
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'splitSection',
                    fields: [
                        { name: 'heading', title: 'Heading', type: 'string' },
                        { name: 'image', title: 'Image (Cloudinary URL)', type: 'url' },
                        { name: 'content', title: 'Content', type: 'text' }
                    ]
                },
                {
                    type: 'object',
                    name: 'bannerCard',
                    fields: [
                        { name: 'heading', title: 'Heading', type: 'string' },
                        { name: 'image', title: 'Image (Cloudinary URL)', type: 'url' }
                    ]
                },
                {
                    type: 'object',
                    name: 'categoryGrid',
                    fields: [
                        { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }
                    ]
                }
            ]
        }
    ]
}
