import { useCanvas } from "../useCanvas";

export function getImageData(image: HTMLImageElement): ImageData {
    const { canvas, context } = useCanvas(true);
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: "srgb" });
}
