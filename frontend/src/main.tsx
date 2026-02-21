
import { createRoot } from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App.tsx";

if (import.meta.env.DEV) {
    import('@axe-core/react').then(({ default: axe}) => {
        axe(React, ReactDOM, 1000);
    });
}
createRoot(document.getElementById('root')!).render(

    <App />

)
