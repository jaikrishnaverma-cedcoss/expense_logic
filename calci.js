const transaction = [
  {
    id: 26,
    user_id: 37,
    amount: "10323",
    expense_detail: "room",
    paid: "false",
    expense_time: "Sun 25-Feb-2024 10:39 AM",
    each_share: 1,
    self: 0,
    created_at: "2024-02-25 10:40:07",
    collaborators: [
      {
        id: "32",
        name: "sdgsdg 7",
        approved: "false",
        transaction_type: "Dr",
        shared_amount: "3441",
      },
      {
        id: "38",
        name: "radhesh tiwari",
        approved: "true",
        transaction_type: "Dr",
        shared_amount: "3441",
      },
      {
        id: "37",
        name: "jai verma",
        approved: "false",
        transaction_type: "Cr",
        shared_amount: "3441",
      },
    ],
  },
  {
    id: 27,
    user_id: 38,
    amount: "10000",
    expense_detail: "room",
    paid: "false",
    expense_time: "Sun 25-Feb-2024 10:39 AM",
    each_share: 1,
    self: 0,
    created_at: "2024-02-25 10:40:07",
    collaborators: [
      {
        id: "32",
        name: "sdgsdg 7",
        approved: "false",
        transaction_type: "Dr",
        shared_amount: "3000",
      },
      {
        id: "38",
        name: "radhesh tiwari",
        approved: "true",
        transaction_type: "Cr",
        shared_amount: "4000",
      },
      {
        id: "37",
        name: "jai verma",
        approved: "false",
        transaction_type: "Dr",
        shared_amount: "3000",
      },
    ],
  },
  {
    id: 28,
    user_id: 32,
    amount: "12000",
    expense_detail: "room",
    paid: "false",
    expense_time: "Sun 25-Feb-2024 10:39 AM",
    each_share: 1,
    self: 0,
    created_at: "2024-02-25 10:40:07",
    collaborators: [
      {
        id: "32",
        name: "sdgsdg 7",
        approved: "false",
        transaction_type: "Cr",
        shared_amount: "8000",
      },
      {
        id: "38",
        name: "radhesh tiwari",
        approved: "true",
        transaction_type: "Dr",
        shared_amount: "1000",
      },
      {
        id: "37",
        name: "jai verma",
        approved: "false",
        transaction_type: "Dr",
        shared_amount: "3000",
      },
    ],
  },
];

const calci = (transaction) => {
  const replaceAll = (str, from, to) => str.split(from).join(to);
  const result = {
    contributers:[],
    pending_payments: {},
    created_payments: {},
    grand_total_expenses: 0,
  };
  transaction.forEach((tr) => {
    const { id: payer_id, name: payer_spaced_name } = tr.collaborators.find(
      (user) => tr.user_id == user.id
    );
    result.grand_total_expenses += parseFloat(tr.amount);
    const payer_name = replaceAll(payer_spaced_name, " ", "_");
    tr.collaborators.forEach((collab) => {
      const { id, name: spacedName, approved, transaction_type } = collab;
      const name = replaceAll(spacedName, " ", "_");
      const shared_amount = parseFloat(collab.shared_amount);
       if(result.created_payments?.[`${id}#${name}`]===undefined)
       result.created_payments[`${id}#${name}`]={
      total_paid:0,
      spend_on_self:0
      }
      if(!result.contributers.find(item=>item===`${id}#${name}`))
      result.contributers.push(`${id}#${name}`)
      if (transaction_type == "Cr") {
        result.created_payments[`${id}#${name}`].total_paid =
          (result.created_payments?.[`${id}#${name}`]?.total_paid ?? 0) +
          parseFloat(tr.amount);
        result.created_payments[`${id}#${name}`].spend_on_self=
          (result.created_payments?.[`${id}#${name}`]?.spend_on_self ?? 0) + parseFloat(tr.amount);
      } else if (transaction_type == "Dr") {
        result.created_payments[`${id}#${name}`].spend_on_self=
        (result.created_payments?.[`${id}#${name}`]?.spend_on_self ?? 0)  - shared_amount;
        // to send calculation
        const from_to = `${id}#${name}-to-${payer_id}#${payer_name}`;
        const to_from = `${payer_id}#${payer_name}-to-${id}#${name}`;
        result.pending_payments[from_to] =
          (result.pending_payments?.[from_to] ?? 0) + shared_amount;

        // normalize logic
        if (result.pending_payments?.[to_from]) {
          // mai dunga 10
          const user_amount = result.pending_payments?.[from_to];
          //wo dega 15
          const other_user_amount = result.pending_payments?.[to_from];
          if (user_amount > other_user_amount) {
            result.pending_payments[from_to] =
              result.pending_payments[from_to] - result.pending_payments[to_from];
              result.pending_payments[to_from]=0
          } else if (other_user_amount > user_amount) {
            result.pending_payments[to_from] =
              result.pending_payments[to_from] - result.pending_payments[from_to];
              result.pending_payments[from_to]=0
          } else if(other_user_amount == user_amount) {
            result.pending_payments[from_to] = 0;
            result.pending_payments[to_from] = 0;
          }
        }
      }
    });
  });
  return result;
};
console.log("result:", calci(transaction));
