import React, { useState } from "react";

function BudgetSelector() {
  const [selectedBudget, setSelectedBudget] = useState("");

  const budgets = [
    { label: "Low", icon: "💸", value: "low" },
    { label: "Medium", icon: "💰", value: "medium" },
    { label: "High", icon: "💎", value: "high" },
  ];
  const handleSelect = (value) => {
    setSelectedBudget(value);
    if (onBudgetSelect) onBudgetSelect(value); 
  };
  return (
    <div className="flex justify-center gap-6 mt-6">
      {budgets.map((budget) => (
        <div
          key={budget.value}
          onClick={() => setSelectedBudget(budget.value)}
          className={`flex flex-col items-center border rounded-xl shadow-md p-4 w-28 cursor-pointer transition-transform 
            ${
              selectedBudget === budget.value
                ? "scale-105 shadow-lg border-red-500 bg-red-50 dark:bg-red-900/20"
                : "hover:scale-105 hover:shadow-lg bg-white dark:bg-card border-border"
            }`}
        >
          <span className="text-3xl mb-2">{budget.icon}</span>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {budget.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BudgetSelector;

