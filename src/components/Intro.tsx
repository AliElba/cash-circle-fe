import React from "react";
import "swiper/scss";
import "@ionic/react/css/ionic-swiper.css";
import { IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./Intro.scss";

interface ComponentProps {
  onFinish: () => void;
}

const SwiperNextButton = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>;
};
const SwiperPrevButton = ({ children }: any) => {
  const swiper = useSwiper();
  return <IonButton onClick={() => swiper.slidePrev()}>{children}</IonButton>;
};

const Intro: React.FC<ComponentProps> = ({ onFinish }) => {
  return (
    <IonPage>
      <IonContent>
        <Swiper>
          <SwiperSlide>
            <img src="/assets/intro/1.svg" alt="Intro 1" />
            <IonText>
              <h3>Build awesome apps with Ionic UI components!</h3>
            </IonText>
            <div className="d-flex">
              <SwiperPrevButton>Back</SwiperPrevButton>
              <SwiperNextButton>Next</SwiperNextButton>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img src="/assets/intro/2.svg" alt="Intro 2" />
            <IonText>
              <h3>Create powerful native apps with Capacitor.</h3>
            </IonText>
            <div className="d-flex">
              <SwiperPrevButton>Back</SwiperPrevButton>
              <SwiperNextButton>Next</SwiperNextButton>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img src="/assets/intro/3.svg" alt="Intro 3" />
            <IonText>
              <h3>Enjoy learning to code!</h3>
            </IonText>
            <div className="d-flex">
              <SwiperPrevButton>Back</SwiperPrevButton>
              <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </div>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Intro;
