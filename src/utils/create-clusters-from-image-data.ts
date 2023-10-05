import { indexToPosition } from "./transformation";

export function createClusters(imageData: ImageData) {
    let clusterId = 1;

    for (let cur = 0; cur < imageData.data.length; cur += 4) {
        if (imageData.data[cur + 3] === 255) {
            const { x, y } = indexToPosition(cur, imageData.width);
        }
    }
}
