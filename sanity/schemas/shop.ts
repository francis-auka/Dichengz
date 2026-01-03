export default {
    name: 'shop',
    title: 'Shop Items',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Cloudinary Image (Public ID or URL)',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Women', value: 'Women' },
                    { title: 'Men', value: 'Men' },
                    { title: 'Shoes', value: 'Shoes' },
                    { title: 'Bags', value: 'Bags' },
                    { title: 'Accessories', value: 'Accessories' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
    ],
}
