import React, { useCallback } from "react";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyData } from "./data";
import { useUserAuth } from "src/context";
import { collection, addDoc } from "firebase/firestore";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";
StylesManager.applyTheme("modern");

function ATMClientSurvey(props) {
  const { name, startedAt, surveyId } = props;
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

  if (surveyId) {
    survey.mode = "display";
  }
  function loadState(survey) {
    //Here should be the code to load the data from your database
    const surveyData = surveys?.find((survey) => survey?.id === surveyId);

    let res = {};
    if (surveyData) res = surveyData;
    //Create the survey state for the demo. This line should be deleted in the real app.
    // else res = { currentPageNo: 1, data: { "satisfaction":"4","Quality":{"does what it claims":"1"},"recommend friends":"3","price to competitors":"More expensive","price":"correct","pricelimit":{"mostamount":""}} };

    //Set the loaded data into the survey.
    if (res.currentPageNo) survey.currentPageNo = res.currentPageNo;
    if (res.data) survey.data = res.data;
  }

  loadState(survey);
  const createSurvey = async (data) => {
    const { survey } = data;
    try {
      if (isOnline) {
        await addDoc(collection(db, userInfo?.name), {
          name,
          startedAt,
          submittedAt: new Date().toISOString(),
          status: "Preview",
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
    createSurvey({ startedAt, survey }).then(() => setLoadSurveys());
    console.log("++++++++++++++++Result: ", survey);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default ATMClientSurvey;
