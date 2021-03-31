import { useState, useEffect } from 'react';
import { loadImage } from './util';

interface Props {
  name: string;
  clickedHandler: () => void;
}

const Image: React.FC<Props> = ({ name, clickedHandler }) => {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    loadImage(name, setImage);
  }, [name]);

  return (
    <>
      {image && (
        <img onClick={clickedHandler} src={image} alt={`shannon ${name}`} />
      )}
    </>
  );
};

export default Image;
