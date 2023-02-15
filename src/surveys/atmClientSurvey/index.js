import React, { useCallback } from "react";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyData } from "./data";

StylesManager.applyTheme("modern");

function ATMClientSurvey() {
  const survey = new Model(surveyData);
  survey.focusFirstQuestionAutomatic = false;

  const alertResults = useCallback((sender) => {
    const results = JSON.stringify(sender.data);
    console.log("++++++++++++++++Result: ", results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default ATMClientSurvey;
