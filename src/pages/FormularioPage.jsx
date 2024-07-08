import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserDataComponent from '../myComponents/UserDataComponent';
import ResultsComponent from '../myComponents/ResultsComponent';
import PreguntasComponent from '../myComponents/PreguntasComponent';

const FormularioPage = () => {
  const universityId = 1;

  const [step, setStep] = useState(0);
  const [results, setResults] = useState(null);
  const [userData, setUserData] = useState('');
  const [surveyData, setSurveyData] = useState(null);

  const nextSection = () => {
    setStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const mergeData = () => ({
    userData: userData,
    surveyData: surveyData
  });

  useEffect(() => {
    if (step === 2 && !results) {
      const request = mergeData();
      axios.post('http://localhost:8080/api/v1/formulario', request)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching results:', error);
        });
    }
  }, [step, results]);

  return (
    <>
      {step === 0 &&
        <PreguntasComponent nextSection={nextSection} setSurveyData={setSurveyData} universityId={universityId} />
      }
      {step === 1 &&
        <UserDataComponent nextSection={nextSection} setUserData={setUserData} universityId={universityId} />
      }
      {step === 2 && (
        results ?
          <ResultsComponent results={results} />
          : <Spinner />
      )}
    </>
  );
};

export default FormularioPage;

export const Spinner = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span>
    </div>
  )
}


