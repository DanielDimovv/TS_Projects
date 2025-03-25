import Button from "./Button";
import { PropsFriend } from "./Model";

interface FriendProps {
  frObj: PropsFriend;
  onSelection: (friend: PropsFriend) => void;
  selectedFriend: PropsFriend | null;
}

function Friend({ frObj, onSelection, selectedFriend }: FriendProps) {
  const isSlelected = selectedFriend?.id === frObj.id;
  return (
    <li className={isSlelected ? "selected" : ""}>
      <img src={frObj.image} alt={frObj.name} />
      <h3>{frObj.name}</h3>

      {frObj.balance < 0 && (
        <p className="red">
          You owe {frObj.name} {Math.abs(frObj.balance)}$
        </p>
      )}
      {frObj.balance > 0 && (
        <p className="green">
          {frObj.name} ows you {Math.abs(frObj.balance)}$
        </p>
      )}
      {frObj.balance === 0 && <p>You and {frObj.name} are even</p>}
      <Button onClick={() => onSelection(frObj)}>
        {isSlelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

export default Friend;
