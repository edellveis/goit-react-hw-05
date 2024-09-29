import React, { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';
import Options from './components/Options/Options';

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const updateFeedback = (feedbackType) => {
    setFeedback((prevState) => {
      const updatedFeedback = {
        ...prevState,
        [feedbackType]: prevState[feedbackType] + 1,
      };
      console.log('Updated Feedback:', updatedFeedback); // Додано лог
      return updatedFeedback;
    });
  };

  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  // Local Storage
  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, []);

  useEffect(() => {
    console.log('Saving to localStorage:', feedback); // Додано лог
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} resetFeedback={resetFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          totalFeedback={totalFeedback}
          positivePercentage={positivePercentage}
          feedback={feedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;