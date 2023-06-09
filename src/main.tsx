import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import GlobalStyle from "./styles/GlobalStyle";
import { queryClient } from "./settings/ReactQuery/ReactQuerySettings";
import { QueryClientProvider } from "react-query";
import ReduxToastrLib from "react-redux-toastr";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReduxToastrLib />
        <GlobalStyle>
          <App />
        </GlobalStyle>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
