export interface PropsFriend {
  id: number | string;
  name: string;
  image: string;
  balance: number;
}

export interface FriendsListProps {
  friends: PropsFriend[];
}
