import backTesteImg from "./img/back-teste.png";
import modeloImg from "./img/modelo.gif";

function Content({ selectedItem, handleMenuItemClick, images, selectedItems, handleImageClick, showSplash, splashParagraph }) {
  const isBackTesteImage = (item) => {
    return item && item.includes("back-teste");
  };

  return (
    <div>
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <button
                className={selectedItem === "home" ? "active" : ""}
                onClick={() => handleMenuItemClick("home")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className={selectedItem === "quem-sou-eu" ? "active" : ""}
                onClick={() => handleMenuItemClick("quem-sou-eu")}
              >
                About Me
              </button>
            </li>
            <li>
              <button
                className={
                  selectedItem === "portfolio-linguagens" ? "active" : ""
                }
                onClick={() => handleMenuItemClick("portfolio-linguagens")}
              >
                Tech Stack
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className={`content ${
          selectedItem === "quem-sou-eu" || selectedItem === "portfolio-linguagens"
            ? "hide-content"
            : ""
        }`}
      >
        <div className="grid-container">
          <h1>
            Hey, I'm <span className="name">Ana Paiva</span>
          </h1>
          <div className="typing-animation">
            <p>From Classic to Code</p>
          </div>
        </div>
      </div>
      {selectedItem === "quem-sou-eu" && (
        <div className="about-me">
          <div className="photo">
            <img
              src={modeloImg}
              alt="Uma capa de disco branca com alguns borrões laranjas com a imagem da autora, uma mulher de camiseta, colar e cabelos lisos médios em tons de laranja sorrindo enquanto metade de um vinil gira."
            />
          </div>
          <div className="text">
            <div className="grid-about-me">
              <p>Hello World!_</p>
              <p>
                I'm Ana Paula Paiva, a passionate full-stack developer
                deeply immersed in the programming universe. After
                completing my studies as a Computer Technician at the
                Federal Institute of Southern Minas Gerais, I dived into the
                enchanting world of code and technology.
              </p>
              <p>
                Currently, I'm studying Telecommunications Engineering at
                the University of Campinas (Unicamp) to further expand my
                knowledge and explore new horizons in this exciting field. I
                have an insatiable thirst for learning and constantly seek
                opportunities to enhance my skills and stay up-to-date with
                the latest trends.
              </p>
              <p>
                My goal is to harness my passion and programming expertise
                to create innovative solutions that can make a positive
                impact in the world. Programming, to me, is more than just a
                technical skill; it's a form of creative expression that
                empowers us to transform ideas into reality.
              </p>
            </div>
          </div>
        </div>
      )}
      {selectedItem === "portfolio-linguagens" && (
        <div
          className={`tech-stack ${
            selectedItem !== "portfolio-linguagens" ? "hide-content" : ""
          }`}
        >
          {showSplash && (
            <div className="splash-screen">
              <div className="splash-content">
                <div className="typing-animation">
                  {splashParagraph === 1 && (
                    <p>
                      Caution! You are about to enter the room of golden
                      records! Remember, do not touch anything.
                    </p>
                  )}
                  {splashParagraph === 2 && (
                    <p>Ahh! Or touch, I don't care.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="grid-tech-stack">
            <div className="carousel">
              <div className="column">
                {images.slice(0, 4).map((item, index) => (
                  <img
                    key={index}
                    src={
                      selectedItems.includes(item.original)
                        ? selectedItems.includes(item.backTesteImg)
                          ? item.backTesteImg
                          : backTesteImg
                        : item.original
                    }
                    alt=""
                    onClick={() => handleImageClick(item.original)}
                    className={
                      (selectedItems.includes(item.original) && item.original !== item.backTesteImg)
                        || (isBackTesteImage(item.original) && item.original === item.backTesteImg)
                          ? "rotate-backteste-animation"
                          : "rotate-animation"
                    }
                  />
                ))}
              </div>
              <div className="column">
                {images.slice(4).map((item, index) => (
                  <img
                    key={index}
                    src={
                      selectedItems.includes(item.original)
                        ? selectedItems.includes(item.backTesteImg)
                          ? item.backTesteImg
                          : backTesteImg
                        : item.original
                    }
                    alt=""
                    onClick={() => handleImageClick(item.original)}
                    className={
                      (selectedItems.includes(item.original) && item.original !== item.backTesteImg)
                        || (isBackTesteImage(item.original) && item.original === item.backTesteImg)
                          ? "rotate-backteste-animation"
                          : "rotate-animation"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
