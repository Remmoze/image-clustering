import "./styles/index.css";
import { useCanvas } from "./useCanvas";
import { getImageData, getImageEdges, getImageFromImageData, imageDataToPoints, createClusters } from "./utils";

const { canvas, context } = useCanvas();
const fileSelector = document.querySelector("#imageSelect") as HTMLInputElement;

let image: HTMLImageElement;

function draw() {
    context.fillStyle = "#222";
    context.fillRect(0, 0, canvas.width, canvas.height);

    image && context.drawImage(image, 0, 0);

    requestAnimationFrame(draw);
}
draw();

fileSelector.addEventListener("change", startProcess);

async function startProcess() {
    image = await getImage();
    const binaryData = getImageData(image);
    const edges = getImageEdges(binaryData);
    image = await getImageFromImageData(edges);

    const clusters = createClusters(edges);

    console.log("clusters", clusters);
}

async function getImage(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (!fileSelector.files || fileSelector.files.length <= 0) {
            console.error("bad file");
            return reject();
        }

        const file = fileSelector.files[0];
        const image = new Image();
        image.src = window.URL.createObjectURL(file);
        image.onload = () => resolve(image);
    });
}
