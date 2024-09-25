import { createContext, useState } from "react";

export const CurrentExperienceContext = createContext();

export const CurrentExperienceProvider = ({ children }) => {
  const [currentExperience, setCurrentExperience] = useState(-1);

  return (
    <CurrentExperienceContext.Provider value={{ currentExperience, setCurrentExperience }}>
      {children}
    </CurrentExperienceContext.Provider>
  );
};