import React from 'react';
import MainLayout from '../layouts/MainLayout';

const AboutPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">About Dichengz</h1>
                <p className="mb-4">
                    Dichengz is a premier fashion brand dedicated to reimagining African fashion for the modern world.
                    We blend traditional aesthetics with contemporary designs to create unique, stylish, and culturally rich pieces.
                </p>
                <p>
                    Our mission is to showcase the beauty and versatility of African textiles and craftsmanship on a global stage.
                </p>
            </div>
        </MainLayout>
    );
};

export default AboutPage;
