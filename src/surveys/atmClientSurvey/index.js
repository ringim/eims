import React, { useCallback } from "react";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyData } from "./data";
import { useUserAuth } from "src/context";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";
StylesManager.applyTheme("modern");

function ATMClientSurvey(props) {
  const { name, startedAt, surveyId, isEditing = false } = props;
  // check if there's internet
  const isOnline = navigator.onLine;
  const { db } = useUserAuth();
  const survey = new Model(surveyData);
  survey.focusFirstQuestionAutomatic = false;

  const { userInfo, setLoadSurveys, surveys } = useStore(
    (state) => ({
      userInfo: state?.userInfo,
      setLoadSurveys: state?.setLoadSurveys,
      surveys: state?.surveys,
    }),
    shallow
  );

  let surveyDetails = {};
  if (isEditing) {
    surveyDetails = surveys?.find((item) => item?.id === surveyId);
    survey.data = JSON.parse(surveyDetails?.data);
  }

  const createSurvey = async (data) => {
    const { survey } = data;
    try {
      if (isOnline) {
        if (isEditing) {
          const docRef = doc(db, userInfo?.name, surveyId);
          await updateDoc(docRef, {
            name,
            startedAt: surveyDetails?.startedAt,
            submittedAt: new Date().toISOString(),
            status: "Preview",
            data: survey,
          });
        } else {
          await addDoc(collection(db, userInfo?.name), {
            name,
            startedAt,
            submittedAt: new Date().toISOString(),
            status: "Preview",
            data: survey,
          });
        }
      } else {
        // save into localDB
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const alertResults = useCallback((sender) => {
    const survey = JSON.stringify(sender.data);
    createSurvey({ survey }).then(() => {
      setLoadSurveys();
    });
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default ATMClientSurvey;
