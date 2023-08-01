"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`lexend`}>{children}</body>
      </Provider>
    </html>
  );
}
