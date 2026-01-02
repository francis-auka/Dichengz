export default {
    name: 'editorial',
    title: 'Editorial',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
        { name: 'featuredImage', title: 'Featured Image', type: 'url' }
    ]
}
