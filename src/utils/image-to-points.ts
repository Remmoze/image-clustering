import { useCanvas } from "../useCanvas";

export function imageToPoints(image: HTMLImageElement) {
    const { canvas, context } = useCanvas(true);
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: "srgb" });

    const pixelData = new Uint8Array(canvas.width * canvas.height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const a = imageData.data[i + 3];
        pixelData[Math.floor(i / 4)] = a === 0 ? 0 : 1;
    }

    console.log(pixelData);
}
