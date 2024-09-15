'use client'
import { useState, useEffect } from 'react';
import SetUp1 from './new/setUp1';
import SetUp2 from './new/setUp2';
import SetUp3 from './new/setUp3';
import AniPhone from './AniPhone';

interface SetUpProps {
  onStart: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const setupComponents: React.FC<SetUpProps>[] = [SetUp1, SetUp2, SetUp3, AniPhone];

export default function Home() {
  const [turnOn, setTurnOn] = useState(false);
  const [setUp, setSetUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTurnOn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setSetUp(true);
    }, 3000);
    return () => clearTimeout(timer2);
  }, []);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, setupComponents.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const CurrentSetupComponent = setupComponents[currentStep];

  return (
    <>
      {!setUp && (
        <div className="bg-black h-screen flex items-center justify-center">
          <h1 className="text-white font-[600] text-4xl">{turnOn ? 'AniPhone' : ''}</h1>
        </div>
      )}
      {setUp && (
        <CurrentSetupComponent
          onStart={handleNext}
          onPrevious={handlePrevious}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === setupComponents.length - 1}
        />
      )}
    </>
  );
}
