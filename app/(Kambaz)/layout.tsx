"use client";
import { ReactNode, useEffect } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import Session from "./Account/Session";
import FinalProjectInfoButton from "./FinalProjectInfoButton";

export default function KambazLayout(
  { children }: Readonly<{ children: ReactNode }>
): React.JSX.Element {
  useEffect(() => {
    document.title = "Kambaz - CS4500";
  }, []);

  return (
    <Provider store={store}>
      <Session>
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
      <div className="wd-main-content-offset p-3 flex-fill">
        {children}
      </div>
    </div>
    <FinalProjectInfoButton />
    </div>
      </Session>
    </Provider>
  );
}