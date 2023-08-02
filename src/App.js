import React, { useState, useEffect } from "react";
import "./App.css";
import { images } from "./images";
import backTesteImg from "./img/back-teste.png";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Content from "./Content";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("home");
  const [showSplash, setShowSplash] = useState(false);
  const [splashParagraph, setSplashParagraph] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showSplash) {
      const timer1 = setTimeout(() => {
        setSplashParagraph(2);
      }, 6000);

      const timer2 = setTimeout(() => {
        setShowSplash(false);
      }, 10000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [showSplash]);

  useEffect(() => {
    if (selectedItem !== "portfolio-linguagens") {
      setSelectedItems([]);
    }
  }, [selectedItem]);

  const handleImageClick = (item) => {
    const imageIndex = images.findIndex((image) => image.original === item);
    if (imageIndex !== -1) {
      const selectedImage = images[imageIndex];
      const backTesteImage = selectedImage.backTesteImg || backTesteImg;

      if (selectedItems.includes(item)) {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter(
            (selectedItem) =>
              selectedItem !== item && selectedItem !== backTesteImage
          )
        );
      } else {
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          item,
          backTesteImage,
        ]);
      }
    }
  };

  const handleMenuItemClick = (item) => {
    if (item === "portfolio-linguagens") {
      setShowSplash(true);
      setSplashParagraph(1);
    }
    setSelectedItem(item);
  };

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Header />
          <Content
            selectedItem={selectedItem}
            handleMenuItemClick={handleMenuItemClick}
            images={images}
            selectedItems={selectedItems}
            handleImageClick={handleImageClick}
            showSplash={showSplash}
            splashParagraph={splashParagraph}
          />
        </div>
      )}
    </div>
  );
}

export default App;
