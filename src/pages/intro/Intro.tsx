import React from "react";
import "swiper/scss";
import "@ionic/react/css/ionic-swiper.css";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./Intro.scss";
import { RouteConstants, StorageConstants } from "../../constants/constants";
import { Preferences } from "@capacitor/preferences";
import { useHistory } from "react-router";

/**
 * This component renders a swiper with 3 slides.
 * The first two slides are meant to be steps in an intro, and the third slide is a finish slide.
 * The onFinish function is called when the user clicks the "Finish" button in the third slide.
 */

// This slice component is a custom button that can be used to navigate to the next slide in the swiper.
const SwiperNextButton = ({ children }: any) => {
  const swiper = useSwiper();
  return (
    <IonButton className="btn btn-primary w-100" onClick={() => swiper.slideNext()}>
      {children}
    </IonButton>
  );
};

// This component renders the intro.
const Intro: React.FC = () => {
  console.log("[Intro] rendered");
  const history = useHistory();

  const slidesData = [
    {
      title: "Welcome to CashCircle",
      description1: "Join Saving Circles Easily",
      description2: "Connect with friends and family to create saving circles effortlessly and securely.",
      image: "/assets/intro/slide1.png",
      buttonText: "Get Started",
    },
    {
      title: "How It Works",
      description1: "Simple & Transparent",
      description2: "Contribute monthly, take turns receiving the pool, and manage everything in one place.",
      image: "/assets/intro/slide2.png",
      buttonText: "Learn More",
    },
    {
      title: "Why Choose Us",
      description1: "Secure & Reliable",
      description2: "Track contributions, set reminders, and enjoy a stress-free saving experience.",
      image: "/assets/intro/slide3.png",
      buttonText: "Start Saving Now",
    },
  ];

  /**
   * When the user has finished the intro slider, we store a preference in the native app's storage.
   * This is done via the Capacitor Preferences plugin, which uses the native app's storage
   * to store the preference. This means that even if the user closes the app,
   * the preference will still be there when they open it again.
   * On a normal web browser, this preference is stored in the browser's local storage.
   * This is how we keep track of whether the user has seen the intro or not.
   */
  const onFinish = (event: any) => {
    event.preventDefault();
    console.log("Navigating to login...");
    Preferences.set({ key: StorageConstants.isIntroPageVisited, value: "true" }).then(() => {
      console.log("Preference saved.");
      history.push(RouteConstants.loginRelative);
      console.log("Navigation attempted.");
    });
  };

  return (
    <IonPage>
      <IonContent>
        <Swiper>
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-slide-container">
                <IonText>
                  <h1 className="fw-bold mb-3">{slide.title}</h1>
                  <p className="mb-2">{slide.description1}</p>
                  <p className="mb-4 slide-description">{slide.description2}</p>
                </IonText>

                <div className="slide-image-container">
                  <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image img-fluid" />
                </div>
                {index === slidesData.length - 1 ? (
                  <IonButton onClick={onFinish} className="btn btn-primary w-100">
                    {slide.buttonText}
                  </IonButton>
                ) : (
                  <SwiperNextButton>{slide.buttonText}</SwiperNextButton>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Intro;
