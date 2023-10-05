import { useCanvas } from "../useCanvas";
import { loadImage } from "./load-image";

export async function getImageFromImageData(data: ImageData): Promise<HTMLImageElement> {
    const { canvas, context } = useCanvas(true);
    canvas.width = data.width;
    canvas.height = data.height;
    context.putImageData(data, 0, 0);

    return loadImage(canvas.toDataURL());
}
