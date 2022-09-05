import { Fragment, useEffect } from "react";
import plane from "../../assets/img/planehd.png";
import cloud2 from "../../assets/img/cloud2.png";
import star from "../../assets/img/star2d.png";
const StartHome = () => {
  useEffect(() => {
    let constrain = 20;
    let mouseOverContainer = document.getElementById("ex1");
    let ex1Layer = document.getElementById("ex1-layer");
    // let ex2Layer = document.getElementById("s2-fg-h1");

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    //ex1Layer.onmousedown = dragMouseDown;
    ex1Layer.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (e.target === ex1Layer) {
        e.target.style.top = e.target.offsetTop - pos2 + "px";
        e.target.style.left = e.target.offsetLeft - pos1 + "px";
      }
    }
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function transforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - box.height / 2) / constrain;
      let calcY = (x - box.x - box.width / 2) / constrain;

      return (
        "perspective(100vw) " +
        "   rotateX(" +
        calcX +
        "deg) " +
        "   rotateY(" +
        calcY +
        "deg) "
      );
    }

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }

    mouseOverContainer.onmousemove = function (e) {
      let xy = [e.clientX, e.clientY];
      let position = xy.concat([ex1Layer]);

      window.requestAnimationFrame(function () {
        transformElement(ex1Layer, position);
      });
    };
  });

  const scrollControl = () => {
    const s1 = document.getElementById("s1");
    const s2 = document.getElementById("s2");
    // const s3 = document.getElementById("s3");
    const h1 = document.getElementById("s1-mg-h1");
    const star = document.getElementById("s1-mg-h2");
    const starTwo = document.getElementById("s1-mg-h3");
    const starThree = document.getElementById("s1-mg-h4");
    const bgW1 = document.getElementById("s1-bg-cover-w1");
    const bgW1opacity = document.getElementById("bg-w1-opacity");
    const bgW3 = document.getElementById("s1-bg-cover-w3");
    // const s2BgWrapper = document.getElementById("s2-fg-wrapper");
    // const s2BgH1 = document.getElementById("s2-fg-h1");
    const randomColor = Math.floor(Math.random() * 4);

    if (window.scrollY >= 80) {
      h1.style.top = "80%";
      star.style.bottom = "80%";
      starTwo.style.bottom = "80%";
      starThree.style.bottom = "80%";
      bgW3.style.right = "60%";
      bgW1.style.top = "65%";
      bgW1opacity.style.animation = "opacity 3s forwards";
      // if (window.scrollY >= 360) {
      //   s2BgWrapper.style.transform = `rotate(${window.scrollY - 360}deg)`;
      //   s2BgH1.style.transform = `rotate(-${window.scrollY - 360}deg)`;
      // }
    } else {
      h1.style.top = `${window.scrollY}%`;
      bgW1.style.top = `20%`;
      bgW3.style.right = `${window.scrollY}%`;
      bgW1opacity.style.animation = "none";

      // s2BgWrapper.style.transform = `rotate(${window.scrollY}deg)`;
      // s2BgH1.style.transform = `rotate(-${window.scrollY}deg)`;
      if (window.scrollY >= 18) {
        bgW1.style.top = `${window.scrollY}%`;
        // bgW1opacity.style.animation = "reverse-opacity 2s forwards";
        star.style.bottom = `${window.scrollY}%`;
        starTwo.style.bottom = `${window.scrollY}%`;
        starThree.style.bottom = `${window.scrollY}%`;
      } else {
        star.style.bottom = "18%";
        starTwo.style.bottom = "18%";
        starThree.style.bottom = "18%";
      }
    }

    const setPropertyNight = (scene) => {
      scene.style.setProperty("--one", "#dadff0");
      scene.style.setProperty("--two", "#ebeefc");
      scene.style.setProperty("--three", "#bac2e4");
      scene.style.setProperty("--four", "#201c57");
      scene.style.setProperty("--five", "#0a0641");
      scene.style.setProperty("--six", "#bbb7e7");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertySunset = (scene) => {
      scene.style.setProperty("--one", "#ffd57b");
      scene.style.setProperty("--two", "#ffce64");
      scene.style.setProperty("--three", "#fd872d");
      scene.style.setProperty("--four", "#d01d51");
      scene.style.setProperty("--five", "#a3002f");
      scene.style.setProperty("--six", "#ffc0d2");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertyMorning = (scene) => {
      scene.style.setProperty("--one", "#fffed5");
      scene.style.setProperty("--two", "#fffeeb");
      scene.style.setProperty("--three", "#fff7d0");
      scene.style.setProperty("--four", "#f0feff");
      scene.style.setProperty("--five", "#a5f7ff");
      scene.style.setProperty("--six", "#d7fbff");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertyAfternoon = (scene) => {
      scene.style.setProperty("--one", "#ffffff");
      scene.style.setProperty("--two", "#ffffff");
      scene.style.setProperty("--three", "#fcffd1");
      scene.style.setProperty("--four", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--five", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--six", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertyNightPlanet = (scene) => {
      scene.style.setProperty("--one", "#dadff0");
      scene.style.setProperty("--two", "#ebeefc");
      scene.style.setProperty("--three", "#bac2e4");
      scene.style.setProperty("--four", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--five", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--six", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertySunsetPlanet = (scene) => {
      scene.style.setProperty("--one", "#ffd57b");
      scene.style.setProperty("--two", "#ffce64");
      scene.style.setProperty("--three", "#fd872d");
      scene.style.setProperty("--four", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--five", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--six", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertyMorningPlanet = (scene) => {
      scene.style.setProperty("--one", "#fffed5");
      scene.style.setProperty("--two", "#fffeeb");
      scene.style.setProperty("--three", "#fff7d0");
      scene.style.setProperty("--four", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--five", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--six", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    const setPropertyAfternoonPlanet = (scene) => {
      scene.style.setProperty("--one", "#ffffff");
      scene.style.setProperty("--two", "#ffffff");
      scene.style.setProperty("--three", "#fcffd1");
      scene.style.setProperty("--four", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--five", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--six", "rgba(255, 255, 255, 0)");
      scene.style.setProperty("--seven", "rgba(255, 255, 255, 0)");
    };

    //console.log(s1.hasOwnProperty("--c"));
    switch (randomColor) {
      case 0:
        setPropertyNight(s1);
        setPropertySunsetPlanet(s2);
        // setPropertyMorning(s3);
        break;
      case 1:
        setPropertyMorning(s1);
        setPropertyNightPlanet(s2);
        // setPropertySunset(s3);
        break;
      case 2:
        setPropertySunset(s1);
        setPropertyMorningPlanet(s2);
        // setPropertyNight(s3);
        break;
      case 3:
        setPropertyAfternoon(s1);
        setPropertyAfternoonPlanet(s2);
        // setPropertyAfternoon(s3);
        break;
      default:
        break;
    }

    // console.log(s2BgWrapper.style.height);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollControl);

    return () => window.removeEventListener("scroll", scrollControl);
  });

  return (
    <Fragment>
      <article className="startHome">
        <section className="s1" id="s1">
          {/*s1 = scene one*/}
          <div className="s1-bg" id="s1-bg">
            {/* bg, mg, fg = background, middleground, foreground */}
            <div className="s1-bg-wrapper" id="s1-bg-wrapper">
              <div className="s1-bg-h1" id="s1-bg-h1">
                <img alt="big cloud" src={cloud2} width="50%"></img>
              </div>
            </div>
          </div>
          <div className="s1-bg-cover" id="s1-bg-cover">
            <div className="s1-bg-cover-w1" id="s1-bg-cover-w1">
              <h1>
                Deliver
                <span className="bg-w1-opacity" id="bg-w1-opacity">
                  ed
                </span>
              </h1>
            </div>
            <div className="s1-bg-cover-w2" id="s1-bg-cover-w2">
              <h1>With</h1>
            </div>
            <div className="s1-bg-cover-w3" id="s1-bg-cover-w3">
              <h1>Quality</h1>
            </div>
          </div>

          <div className="s1-mg" id="s1-mg">
            <div className="s1-mg-wrapper" id="s1-mg-wrapper">
              <div className="s1-mg-h1" id="s1-mg-h1">
                <img alt="plane" src={plane} width="100%"></img>
              </div>
              <div className="s1-mg-h2" id="s1-mg-h2">
                <img alt="star" src={star} width="40%"></img>
              </div>
              <div className="s1-mg-h3" id="s1-mg-h3">
                <img alt="star" src={star} width="40%"></img>
              </div>
              <div className="s1-mg-h4" id="s1-mg-h4">
                <img alt="star" src={star} width="40%"></img>
              </div>
            </div>
          </div>
          <div className="s1-fg" id="s1-fg">
            <div className="s1-fg-wrapper" id="s1-fg-wrapper">
              <div className="s1-fg-h1" id="s1-fg-h1">
                <img alt="white cloud" src={cloud2} width="90%"></img>
              </div>
              <div className="s1-fg-h2" id="s1-fg-h2">
                <img alt="white cloud" src={cloud2} width="70%"></img>
              </div>
            </div>
          </div>
        </section>
        <section className="s2" id="s2">
          <div className="s2-mg" id="s2-mg">
            <div id="ex1" className="ex1">
              <div id="ex1-layer" className="ex1-layer">
                {/* <div className="s2-fg-h1" id="s2-fg-h1">
                  <div className="animated-pic">
                    <img alt="DoanPic" src={doanPic} width="80%"></img>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>
        {/* <section className="s3" id="s3"></section> */}
      </article>
    </Fragment>
  );
};

export default StartHome;
