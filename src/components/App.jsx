import React from "react";
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import { Notification } from "./Notification/Notification";
import { useState } from "react";
import PropTypes from 'prop-types'

export function App()  {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = option => {
    const feedbackObject = {
      good: setGood,
      neutral: setNeutral,
      bad: setBad,
    };

    if (option in feedbackObject) {
      feedbackObject[option](prevState => prevState + 1)
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const totalFeedback = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
  };

      return (
        <div className="container">
          <Section title="Please leave feedback">
            <FeedbackOptions options={['good', 'neutral', 'bad' ]} onLeaveFeedback={handleFeedback} />
  
          </Section>
  
          <Section title="Statistics">
            {totalFeedback === 0 ? (
              <Notification message="There is no feedback" />
            ) : (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={countTotalFeedback()}
                positivePercentage={countPositiveFeedbackPercentage()}
              />
            )}
          </Section>
        </div>
      );
    }
  
  App.propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    handleFeedback: PropTypes.func,
  };
