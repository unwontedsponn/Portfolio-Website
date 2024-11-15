"use client";
import React from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { GlobalProvider } from '../contexts/GlobalContext';
import ScoringApp from './ScoringApp';

const Scoring: React.FC = () => {
  return (
    <GlobalProvider>
      <main className="background-light flex justify-center">
        <Header />
        <ScoringApp id="scoringApp" />
        <Footer />
      </main>
    </GlobalProvider>
  );
};

export default Scoring;
