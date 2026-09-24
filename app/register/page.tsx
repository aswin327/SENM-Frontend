"use client";

import React, { useState } from "react";
import styles from "./register.module.css";
import { RoleSelect } from "./components/RoleSelect";
import { ClientForm } from "./components/ClientForm";
import { EngineerConfirm } from "./components/EngineerConfirm";
import { EngineerWizard } from "./components/EngineerWizard";

type ViewState =
  | "roleSelect"
  | "clientForm"
  | "engineerWizard"
  | "engineerConfirm";

export default function Register() {
  const [view, setView] = useState<ViewState>("roleSelect");

  const handleRoleSelect = (role: "client" | "engineer") => {
    if (role === "client") {
      setView("clientForm");
    } else {
      setView("engineerWizard");
    }
  };

  return (
    <div className={styles.container}>
      {/* ROLE SELECT VIEW */}
      {view === "roleSelect" && (
        <RoleSelect onSelectRole={handleRoleSelect} />
      )}

      {/* CLIENT FORM VIEW */}
      {view === "clientForm" && (
        <ClientForm onBack={() => setView("roleSelect")} />
      )}

      {/* ENGINEER WIZARD VIEW */}
      {view === "engineerWizard" && (
        <EngineerWizard
          onBack={() => setView("roleSelect")}
          onComplete={() => setView("engineerConfirm")}
        />
      )}

      {/* ENGINEER CONFIRM VIEW */}
      {view === "engineerConfirm" && <EngineerConfirm />}
    </div>
  );
}
