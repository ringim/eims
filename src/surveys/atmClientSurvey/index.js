import React, { useCallback } from "react";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyData } from "./data";
import { useUserAuth } from "src/context";
import { collection, addDoc } from "firebase/firestore";
StylesManager.applyTheme("modern");

function ATMClientSurvey(props) {
  const { name } = props;
  // check if there's internet
  const isOnline = navigator.onLine;
  const { db } = useUserAuth();
  const survey = new Model(surveyData);
  survey.focusFirstQuestionAutomatic = false;

  const createSurvey = async (data) => {
    const { startedAt, survey } = data;
    try {
      if (isOnline) {
        await addDoc(collection(db, "survey"), {
          name,
          startedAt,
          submittedAt: startedAt,
          status: "pending",
          data: survey,
        });
      } else {
        // save into localDB
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const alertResults = useCallback((sender) => {
    const survey = JSON.stringify(sender.data);
    const startedAt = new Date().toISOString();
    createSurvey({ startedAt, survey });
    console.log("++++++++++++++++Result: ", survey);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default ATMClientSurvey;
