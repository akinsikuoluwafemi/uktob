"use client";
import { LocalStateWrapper } from "@/context";
import { Provider } from "react-redux";
import { store } from "../store";
import { SnackbarProvider } from "notistack";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={2}>
        <LocalStateWrapper>{children}</LocalStateWrapper>
      </SnackbarProvider>
    </Provider>
  );
}
