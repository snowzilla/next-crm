'use client'

import {JSX, useState} from "react";

import Auth from "./Auth";
import Registration from "./Registration";

type ComponentType = 'auth' | 'registration';

export default function AuthPage() {
  const [component, setComponent] = useState<ComponentType>("auth")

  const components: { [key in ComponentType]: JSX.Element }  = {
    auth: <Auth goToRegister={() => setComponent("registration")} />,
    registration: <Registration goToAuth={() => setComponent("auth")} />
  };

  return components[component] || null;
}

