import React from 'react';
import './App.css'; // Import your CSS file

const App = () => {
  const data = {
    "contributers": [
      "32#sdgsdg_7",
      "38#radhesh_tiwari",
      "37#jai_verma"
    ],
    "pending_payments": {
      "32#sdgsdg_7-to-37#jai_verma": 441,
      "38#radhesh_tiwari-to-37#jai_verma": 441,
      "32#sdgsdg_7-to-38#radhesh_tiwari": 2000,
      "37#jai_verma-to-38#radhesh_tiwari": 0,
      "38#radhesh_tiwari-to-32#sdgsdg_7": 0,
      "37#jai_verma-to-32#sdgsdg_7": 0
    },
    "created_payments": {
      "32#sdgsdg_7": {
        "total_spent": 12000,
        "spent_on_self": 5559
      },
      "38#radhesh_tiwari": {
        "total_spent": 10000,
        "spent_on_self": 5559
      },
      "37#jai_verma": {
        "total_spent": 20646,
        "spent_on_self": 14646
      }
    },
    "grand_total_expenses": 42646
  };

  return (
    <div className="app">
      <header>
        <h1>Expense Summary</h1>
      </header>

      <section className="contributors">
        <h2>Contributors:</h2>
        <ul>
          {data.contributers.map((contributor, index) => (
            <li key={index}>{contributor}</li>
          ))}
        </ul>
      </section>

      <section className="pending-payments">
        <h2>Pending Payments:</h2>
        <ul>
          {Object.entries(data.pending_payments).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </section>

      <section className="created-payments">
        <h2>Created Payments:</h2>
        <ul>
          {Object.entries(data.created_payments).map(([contributor, payment]) => (
            <li key={contributor}>
              {`${contributor}: Total Spent - ${payment.total_spent}, Spent on Self - ${payment.spent_on_self}`}
            </li>
          ))}
        </ul>
      </section>

      <section className="grand-total">
        <h2>Grand Total Expenses:</h2>
        <p>{data.grand_total_expenses}</p>
      </section>
    </div>
  );
};

export default App;
