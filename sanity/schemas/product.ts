export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'price', title: 'Price', type: 'number' },
        { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
        { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
        {
            name: 'variants',
            title: 'Variants',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'size', title: 'Size', type: 'string' },
                        { name: 'color', title: 'Color', type: 'string' },
                        { name: 'images', title: 'Images (Cloudinary URLs)', type: 'array', of: [{ type: 'url' }] },
                        { name: 'isPrimary', title: 'Is Primary', type: 'boolean' }
                    ]
                }
            ]
        }
    ]
}
