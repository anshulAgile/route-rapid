import Header from '../../../../components/layout/header';
import { AccountReview } from '../../../../components/svg';

import { Wrapper } from './style';

const ReviewAccount = () => {
  return (
    <Wrapper>
      <Header />
      <div className="container">
        <div className="review-account-wrap">
          <div className="review-account">
            <AccountReview />
            <h1>Account Under Review</h1>
            <p>
              Thank you for your submission! We're currently reviewing your account to ensure it
              meets all our criteria for approval. We appreciate your patience and will send you an
              email notification once your account has been approved.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReviewAccount;
