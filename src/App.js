import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AddLotteryPage, HomePage, LotteryPage } from './pages';
import { MePage } from './pages/Me';

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lottery/:lotteryID" element={<LotteryPage />} />
          <Route path="/add/*" element={<AddLotteryPage />} />
          <Route path="/me/*" element={<MePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
