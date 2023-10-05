import { indexToPosition, positionToIndex } from "./transformation";

export function getImageEdges(imageData: ImageData): ImageData {
    const edgeImageData = new ImageData(imageData.width, imageData.height);

    const data = imageData.data;
    for (let cur = 0; cur < data.length; cur += 4) {
        if (data[cur + 3] === 0) {
            continue;
        }

        let hasEmpty = false;
        out: for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const { x: curX, y: curY } = indexToPosition(cur, imageData.width);
                const x = curX + dx;
                const y = curY + dy;
                const pos = positionToIndex(x, y, imageData.width, imageData.height);
                if (pos === null) {
                    hasEmpty = true;
                    break out;
                }
                if (data[pos + 3] === 0) {
                    hasEmpty = true;
                    break out;
                }
            }
        }
        if (hasEmpty) {
            for (let i = 0; i < 3; i++) {
                edgeImageData.data[cur + i] = data[cur + i];
            }
            edgeImageData.data[cur + 3] = 255;
        }
    }

    return edgeImageData;
}
