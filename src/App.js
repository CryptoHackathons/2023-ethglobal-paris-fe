import React from 'react';
import './App.css';
import Layout from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { LotteryPage } from './pages';

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lottery" element={<LotteryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
