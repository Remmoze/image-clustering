export function positionToIndex(x: number, y: number, width: number, height: number): number | null {
    if (x < 0 || x >= width || y < 0 || y >= height) return null;

    return (y * width + x) * 4;
}

export function indexToPosition(index: number, width: number): { x: number; y: number } {
    return { x: (index / 4) % width, y: Math.floor(index / 4 / width) };
}
