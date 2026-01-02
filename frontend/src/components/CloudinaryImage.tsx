import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as qAuto } from '@cloudinary/url-gen/qualifiers/quality';
import cld from '../services/cloudinary';

interface CloudinaryImageProps {
    publicId: string;
    width?: number;
    height?: number;
    alt: string;
    className?: string;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({ publicId, width, height, alt, className }) => {
    // Extract public ID if a full URL is passed
    let cleanPublicId = publicId;
    if (publicId.includes('cloudinary.com')) {
        const matches = publicId.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
        if (matches && matches[1]) {
            cleanPublicId = matches[1];
        }
    }

    const myImage = cld.image(cleanPublicId);

    myImage
        .delivery(format(auto()))
        .delivery(quality(qAuto()));

    if (width && height) {
        myImage.resize(fill().width(width).height(height).gravity(autoGravity()));
    }

    return (
        <AdvancedImage cldImg={myImage} alt={alt} className={className} />
    );
};

export default CloudinaryImage;
