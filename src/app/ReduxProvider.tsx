'use client';

import React from 'react'
import { store } from "@/store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
}

function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ReduxProvider