import { useState } from "react";
import Button from "./Button";
import { PropsFriend } from "./Model";

interface PropsBill {
  selectedFriend: PropsFriend;
  onSplitBill: (value: number) => void;
}

function FormSplitBill({ selectedFriend, onSplitBill }: PropsBill) {
  const [bill, setBill] = useState<number | "">("");
  const [paidByUser, setPaidByUser] = useState<number | "">("");
  const paidByFriend =
    typeof bill === "number" && typeof paidByUser === "number"
      ? bill - paidByUser
      : 0;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    if (typeof bill !== "number" || typeof paidByUser !== "number") return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💸 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🤵 Your expense</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            typeof bill === "number" && Number(e.target.value) > bill
              ? paidByUser
              : Number(e.target.value)
          )
        }
      />
      <label>🤼 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

export default FormSplitBill;
