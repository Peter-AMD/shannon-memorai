
export const loadImage = async (imageName: string, setState: (image: string) => void) => {
  const image = await import(`assets/${imageName}.jpg`);
  setState(image.default);
}