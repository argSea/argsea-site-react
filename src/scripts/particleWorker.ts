// Import any dependencies you need here
import { ImageBitmapLoader, Color, CanvasTexture } from "three";

// get message from main thread
self.onmessage = (e) => {
  console.log("worker received message", e.data);
  const { image, offsetX, offsetY, scale } = e.data;
  createParticleImage(image, offsetX, offsetY, scale);
};

function createParticleImage(image: string, offsetX: number, offsetY: number, scale: number) {
  const loader = new ImageBitmapLoader();
  loader.load(image, (imageBitmap) => {
    const texture = new CanvasTexture(imageBitmap);
    const image = texture.image;
    const aspect = image.width / image.height;
    const width = 80;
    const height = width / aspect;
    const tempCanvas = new OffscreenCanvas(width, height);
    
    const context = tempCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;

    tempCanvas.width = width;
    tempCanvas.height = height;
    context.imageSmoothingEnabled = true;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    const imgData = context.getImageData(0, 0, width, height);

    const vertices = [];
    const colors = [];
    const times = [];

    // create particles from image, adding the offset
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 3] > 0 || imgData.data[i] > 0 || imgData.data[i + 1] > 0 || imgData.data[i + 2] > 0) {
        const x = (i / 4) % width;
        const y = Math.floor(Math.floor(i / width) / 4);
        const color = new Color(imgData.data[i] / 255, imgData.data[i + 1] / 255, imgData.data[i + 2] / 255);
        const colorCopy = new Color(imgData.data[i] / 255, imgData.data[i + 1] / 255, imgData.data[i + 2] / 255);

        // randomly skip some particles to create a more sparse effect
        if (Math.random() > 0.4) {
          continue;
        }

        vertices.push(x - width / 2, -y + height / 2, Math.random() * -20 + 20);
        colors.push(color.r, color.g, color.b, 1);
        // colorsCopy.push(colorCopy.r, colorCopy.g, colorCopy.b, 1);
        times.push(Math.random() * 5);
      }
    }

    // const geometry = new BufferGeometry().setFromPoints(vertices);
    

    postMessage({ vertices: vertices, customColor: colors, time: times, offsetX, offsetY, scale });
  });
}
