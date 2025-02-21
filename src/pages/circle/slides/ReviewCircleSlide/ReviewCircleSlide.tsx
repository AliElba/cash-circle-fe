import { IonButton } from "@ionic/react";
import "./ReviewCircleSlide.scss";
import { CircleForm, SLIDE_TITLES } from "../../Circle";
import SlideIndicator from "../SlideIndicator/SlideIndicator";
import CircleReview from "../../circle-review/CircleReview";
import { CirclePayload } from "../../../../app/generated/api";

export interface ReviewCircleSlideProps {
  form: CircleForm;
  swiper: any;
  handleSubmit: () => Promise<void>;
  handleDelete: () => Promise<void>;
}

const ReviewCircleSlide: React.FC<ReviewCircleSlideProps> = ({ form, swiper, handleSubmit, handleDelete }) => {
  return (
    <div className="review-circle-slide swiper__slide-container">
      <SlideIndicator swiper={swiper} activeIndex={4} slideTitles={SLIDE_TITLES} />
      {/* Scrollable Content */}
      <div className="swiper__slide-content">
        <CircleReview circle={form as CirclePayload} />

        <div className="delete-circle ion-margin">
          <IonButton color="danger" expand="block" fill="outline" onClick={handleDelete}>
            Delete Circle
          </IonButton>
        </div>
      </div>

      {/* Footer */}
      <div className="swiper__footer">
        <IonButton className="half-button" expand="block" fill="outline" onClick={() => swiper.slidePrev()}>
          Back
        </IonButton>

        <IonButton
          className="half-button"
          expand="block"
          disabled={!form.amount || form.amount < 1000 || form.amount > 10000 || !form.startDate}
          onClick={handleSubmit}>
          Submit Circle
        </IonButton>
      </div>
    </div>
  );
};

export default ReviewCircleSlide;
