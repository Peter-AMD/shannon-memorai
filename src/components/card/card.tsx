import ReactCardFlip from 'react-card-flip';
import { useState, useEffect } from 'react';
import Image from 'components/image/image';

import './styles.css';

interface Props {
  imageName: string;
  open: boolean;
  clickHandler: () => void;
}

const Card: React.FC<Props> = ({ imageName, open, clickHandler }) => {
  const [flipped, setFlipped] = useState(open);

  const imageClicked = () => {
    clickHandler();
    setFlipped((prevState) => !prevState);
  };

  useEffect(() => {
    setFlipped(open);
  }, [open]);

  return (
    <div className="card-component">
      <ReactCardFlip isFlipped={flipped} infinite={true}>
        <Image name="back" clickedHandler={imageClicked} />
        <Image name={imageName} clickedHandler={imageClicked} />
      </ReactCardFlip>
    </div>
  );
};

export default Card;
