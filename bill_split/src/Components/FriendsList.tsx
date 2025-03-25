import Friend from "./Friend";
import { PropsFriend } from "./Model";

interface FriendsListProps {
  friends: PropsFriend[];
  onSelection: (friend: PropsFriend) => void;
  selectedFriend: PropsFriend | null;
}

function FriendsList({
  friends,
  onSelection,
  selectedFriend,
}: FriendsListProps) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          frObj={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

export default FriendsList;
