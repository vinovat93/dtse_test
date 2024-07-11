import React from 'react';
import Container from 'react-bootstrap/Container';
import './App.css';
import {
    RouterProvider,
} from "react-router-dom";
import {routes} from "./routes";
import AppAuthProvider from "./jwt-auth";
function App() {
  return (
    <div className="App">
        <Container>
            <AppAuthProvider>
                <React.StrictMode>
                    <RouterProvider router={routes} />
                </React.StrictMode>
            </AppAuthProvider>
        </Container>
    </div>
  );
}

export default App;
