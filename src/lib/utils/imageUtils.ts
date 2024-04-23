export const pixelateImage = (imageUrl: string): Promise<string> => {
    const img = new Image();
    img.crossOrigin = "Anonymous";  // Needed if the image is served from a different domain
    img.src = imageUrl;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject('Canvas context is not supported.');
                return;
            }

            const { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            const pixels = 10;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(canvas, 0, 0, canvas.width / pixels, canvas.height / pixels);
            ctx.drawImage(
                canvas,
                0, 0, canvas.width / pixels, canvas.height / pixels,
                0, 0, canvas.width, canvas.height
            );

            const pixelatedImageData = canvas.toDataURL();
            resolve(pixelatedImageData);
        };

        img.onerror = () => {
            reject('Error loading image.');
        };
    });
};