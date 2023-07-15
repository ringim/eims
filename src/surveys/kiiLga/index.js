import React, { useCallback } from "react";
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyData } from "./data";
import { useUserAuth } from "src/context";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useStore } from "src/store";
import { shallow } from "zustand/shallow";