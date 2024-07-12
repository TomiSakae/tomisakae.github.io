import React from 'react';

interface ImageDownloaderProps {
    imageUrl: string;
    fileName: string;
}

const ImageDownloader: React.FC<ImageDownloaderProps> = ({ imageUrl, fileName }) => {
    const downloadImage = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Xóa link sau khi đã click download
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <button onClick={downloadImage} className="text-white font-bold">
            Download Image
        </button>
    );
};

export default ImageDownloader;
