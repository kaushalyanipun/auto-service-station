import React, { useState } from 'react';

const FeedbackView = () => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState('General Service');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter a brief description of your experience.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="animated-view" style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.8rem', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, color: '#ffffff' }}>
          Customer Feedback & Reviews 💬
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px' }}>
          We value your experience. Help us improve our auto service quality!
        </p>
      </div>

      {submitted ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h3 style={{ fontSize: '1.5rem', color: '#00e676', margin: '0 0 10px 0' }}>
            Thank You for Your Feedback!
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
            Your rating and comments have been recorded. We continuously strive to give you the best workshop experience.
          </p>
          <button
            className="glow-btn"
            style={{ width: 'auto', padding: '0.8rem 2rem' }}
            onClick={() => {
              setSubmitted(false);
              setComment('');
              setRating(5);
            }}
          >
            Submit Another Feedback
          </button>
        </div>
      ) : (
        <div className="glass-card">
          <form onSubmit={handleSubmit}>
            
            {/* Star Rating Section */}
            <div className="form-group" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <label className="form-label" style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                Overall Experience Rating
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    style={{
                      fontSize: '2.5rem',
                      cursor: 'pointer',
                      color: star <= (hoverRating || rating) ? '#ffab00' : '#1e293b',
                      transition: 'color 0.15s ease, transform 0.1s ease',
                      transform: star <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#00d2ff', fontWeight: '700', marginTop: '6px' }}>
                {rating === 5 && 'Outstanding! 🌟'}
                {rating === 4 && 'Very Good! 👍'}
                {rating === 3 && 'Average / Satisfactory 🙂'}
                {rating === 2 && 'Needs Improvement ⚠️'}
                {rating === 1 && 'Poor Experience 👎'}
              </div>
            </div>

            {/* Service Category */}
            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="form-label">Service Category</label>
              <select
                className="dark-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General Service">Periodic Full Maintenance</option>
                <option value="Mechanical Repairs">Mechanical / Engine Repairs</option>
                <option value="Electrical Scan">OBD Computerized Scanning & Diagnosis</option>
                <option value="Body Wash & Detailing">Body Wash & Detailing</option>
                <option value="Customer Support">Customer Service & Lounge</option>
              </select>
            </div>

            {/* Comment Box */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Your Detailed Review / Suggestions</label>
              <textarea
                className="dark-input"
                rows="4"
                placeholder="Tell us about the service quality, mechanic response, or room for improvement..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <button type="submit" className="glow-btn">
              SUBMIT FEEDBACK 🚀
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FeedbackView;