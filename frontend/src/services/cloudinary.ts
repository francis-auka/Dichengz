import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo';

const cld = new Cloudinary({
    cloud: {
        cloudName
    }
});

export default cld;
