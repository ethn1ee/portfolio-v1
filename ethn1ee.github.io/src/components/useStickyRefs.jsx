"use client"

import React, { createContext, useContext, useState } from 'react';

const StickyRefsContext = createContext();

export const StickyRefsProvider = ({ children }) => {
  const [stickyElements, setStickyElements] = useState([]);

  const addStickyElement = (elementRef) => {
    setStickyElements((prevElements) => [...prevElements, elementRef]);
  };

  const removeStickyElement = (elementRef) => {
    setStickyElements((prevElements) =>
      prevElements.filter((ref) => ref.current !== elementRef.current)
    );
  };

  const value = { stickyElements, addStickyElement, removeStickyElement };

  return (
    <StickyRefsContext.Provider value={value}>
      {children}
    </StickyRefsContext.Provider>
  );
};

export const useStickyRefs = () => {
  const context = useContext(StickyRefsContext);
  if (context === undefined) {
    throw new Error('useStickyRefs must be used within a StickyRefsProvider');
  }
  return context;
};