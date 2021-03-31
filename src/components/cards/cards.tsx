import { useState, useEffect, useCallback } from 'react';
import flow from 'lodash/flow';

import Card from 'components/card/card';
import {
  getImagesName,
  doubleArray,
  fisherYatesShuffleArray,
  arrayToCardObject,
} from './util';
import './styles.css';

interface KeyName {
  key: number;
  name: string;
}

interface Image extends KeyName {
  open: boolean;
  matched: boolean;
}

const Cards: React.FC = () => {
  const [imagesList, setImagesList] = useState<Image[]>();

  const setMatched = (toMatch: KeyName) => {
    setImagesList((prevList) => {
      return (
        prevList &&
        prevList.map((image) => {
          if (toMatch.name === image.name) {
            return {
              ...image,
              matched: true,
            };
          } else return image;
        })
      );
    });
  };

  const closeUnmatchedOpened = (toCloseList: KeyName[]) => {
    const keyList = toCloseList.map((item) => item.key);

    const closeTimeout = setTimeout(() => {
      setImagesList((prevList) => {
        return (
          prevList &&
          prevList.map((image, key) => {
            if (keyList.includes(key)) {
              return {
                ...image,
                open: false,
              };
            } else return image;
          })
        );
      });
      clearTimeout(closeTimeout);
    }, 1000);
  };

  const matchChecker = useCallback((openedAndUnmatched) => {
    const matched = openedAndUnmatched[0].name === openedAndUnmatched[1].name;
    if (matched) {
      setMatched(openedAndUnmatched[0]);
    } else {
      closeUnmatchedOpened(openedAndUnmatched);
    }
  }, []);

  const flipCard = (index: number) => {
    setImagesList((prevList) => {
      if (!prevList) return [];
      const listCopy = [...prevList];
      const toChangeObject = prevList[index];
      listCopy[index] = {
        ...listCopy[index],
        open: !toChangeObject.open,
      };

      return listCopy;
    });
  };

  useEffect(() => {
    const openedAndUnmatched: KeyName[] = [];
    imagesList?.every((image, key) => {
      if (!image.matched && image.open) {
        openedAndUnmatched.push({ key, name: image.name });
        return true;
      } else if (openedAndUnmatched.length === 2) {
        return false;
      }
      return true;
    });

    if (openedAndUnmatched.length === 2) {
      matchChecker(openedAndUnmatched);
    }
  }, [imagesList, matchChecker]);

  useEffect(() => {
    const cardList = flow([
      getImagesName,
      doubleArray,
      fisherYatesShuffleArray,
      arrayToCardObject,
    ])();
    setImagesList(cardList);
  }, []);

  return (
    <div className="cards-component">
      {imagesList &&
        imagesList.map((item, index) => {
          return (
            <Card
              key={item.key}
              imageName={item.name}
              open={item.matched || item.open}
              clickHandler={() => flipCard(index)}
            />
          );
        })}
    </div>
  );
};

export default Cards;
