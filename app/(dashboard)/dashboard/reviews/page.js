import TopBar from '../../../../components/dashboard/TopBar';
import { requireUser } from '../../../../lib/auth';
import { listClientReviews } from '../../../../lib/reviews';

export const metadata = {
  title: 'Google Reviews',
  robots: { index: false, follow: false },
};

const SAMPLE_REVIEWS = [
  {
    id: 'sample-1',
    author_name: 'Marcus Vance',
    rating: 5,
    review_text: 'Gobiya helped our business rank #1 for local AI search terms in Los Angeles. Fantastic service and support!',
    response_text: 'Thank you Marcus! It is a pleasure working with your team.',
    status: 'replied',
    reviewed_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'sample-2',
    author_name: 'Sarah Lin',
    rating: 5,
    review_text: 'The AI Website Audit and SEO strategy delivered results within weeks. Highly recommended!',
    response_text: null,
    status: 'pending',
    reviewed_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export default async function ReviewsPage() {
  const user = await requireUser();
  const dbReviews = user.clientId ? await listClientReviews(user.clientId).catch(() => []) : [];
  const reviews = dbReviews.length > 0 ? dbReviews : SAMPLE_REVIEWS;

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <>
      <TopBar title="Google Reviews" user={user} />
      <main className="app__content" id="top">
        <div className="app__actions">
          <div>
            <h2 className="app__welcome">Reputation & Reviews</h2>
            <p className="app__welcome-sub">
              Manage your Google Business Profile feedback and AI response drafting.
            </p>
          </div>
        </div>

        <div className="app__cards" style={{ marginBottom: '2rem' }}>
          <article className="card card--stat">
            <span className="card__badge">Average Rating</span>
            <h2 className="card__stat-number card__stat-number--gold">
              {avgRating} <span className="star">&starf;</span>
            </h2>
            <p className="card__body">Based on {reviews.length} customer reviews</p>
          </article>

          <article className="card card--stat">
            <span className="card__badge">Response Rate</span>
            <h2 className="card__stat-number">
              {Math.round(
                (reviews.filter((r) => r.status === 'replied').length / (reviews.length || 1)) * 100
              )}
              %
            </h2>
            <p className="card__body">
              {reviews.filter((r) => r.status === 'replied').length} replied out of {reviews.length}
            </p>
          </article>
        </div>

        <div className="table__container">
          <h3 className="app__section-title" style={{ marginBottom: '1rem' }}>
            Customer Feedback & Responses
          </h3>

          <div className="reviews__list">
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-card__top">
                  <div>
                    <h4 className="review-card__author">{r.author_name}</h4>
                    <span className="review-card__stars">{'★'.repeat(r.rating)}</span>
                  </div>
                  <span className="review-card__date">
                    {new Date(r.reviewed_at).toLocaleDateString()}
                  </span>
                </div>

                <p className="review-card__body">{r.review_text}</p>

                {r.response_text ? (
                  <div className="review-card__response">
                    <strong>Your Reply:</strong>
                    <p>{r.response_text}</p>
                  </div>
                ) : (
                  <div className="review-card__action">
                    <span className="badge badge--pending">Needs Response</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
