import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygonMumbai } from 'wagmi/chains';
// import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// import 'bootstrap/dist/css/bootstrap.min.css';

// stylesheets
import './assets/scss/hope-ui.scss';
import './assets/scss/custom.scss';
import './assets/scss/dark.scss';
import './assets/scss/rtl.scss';
import './assets/scss/customizer.scss';
import '@rainbow-me/rainbowkit/styles.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const { chains, publicClient } = configureChains(
  [mainnet, polygonMumbai],
  // [publicProvider()]
  [
    jsonRpcProvider({
      rpc: () => ({
        // polygonMumbai PRC
        http: 'https://polygon-testnet.public.blastapi.io',
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
