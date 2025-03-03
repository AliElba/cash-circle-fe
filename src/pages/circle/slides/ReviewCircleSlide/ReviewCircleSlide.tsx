import { IonButton } from "@ionic/react";
import "./ReviewCircleSlide.scss";
import { CircleForm, SLIDE_TITLES } from "../../Circle";
import SlideIndicator from "../SlideIndicator/SlideIndicator";
import CircleReview from "../../circle-review/CircleReview";
import { CirclePayload } from "../../../../app/generated/api";
import useCurrentUser from "../../../../app/hooks/useCurrentUser";

export interface ReviewCircleSlideProps {
  form: CircleForm;
  swiper: any;
  handleSubmit: () => Promise<void>;
  handleDelete: () => Promise<void>;
}

const ReviewCircleSlide: React.FC<ReviewCircleSlideProps> = ({ form, swiper, handleSubmit, handleDelete }) => {
  const currentUser = useCurrentUser();
  return (
    <div className="review-circle-slide swiper__slide-container">
      <SlideIndicator swiper={swiper} activeIndex={4} slideTitles={SLIDE_TITLES} />
      {/* Scrollable Content */}
      <div className="swiper__slide-content">
        <CircleReview circle={form as CirclePayload} />
      </div>

      {/* Footer */}
      <div className="swiper__footer">
        {form.id && form.ownerId === currentUser?.id && (
          <IonButton className="delete-circle" color="danger" expand="block" fill="outline" onClick={handleDelete}>
            Delete Circle
          </IonButton>
        )}

        <div className="action-buttons">
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
    </div>
  );
};

export default ReviewCircleSlide;
