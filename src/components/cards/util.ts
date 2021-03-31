export const getImagesName = () => {
  let list = [];

  for (let counter = 0; counter < 9; counter++) {
    list.push(`${counter+1}`)
  }
  return list;
}

export const doubleArray = (array: string[]) => {
  return [...array, ...array]
}

//https://bost.ocks.org/mike/shuffle/

export const fisherYatesShuffleArray = (array: string[]) => {
  let arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

export const arrayToCardObject = (imagesList: string[]) => {
  return imagesList.map((imageName: string, key: number) => ({
    key,
    name: imageName,
    open: false,
    matched: false,
  }))
}