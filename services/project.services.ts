import { db } from "@/config/FirebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const subscribeToClients = (
  callback: (data: { id: string; name: string }[]) => void,
) => {
  const q = query(
    collection(db, "clients"),
    where("deleted_at", "==", null),
    orderBy("first_name", "asc"),
  );
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        name: `${doc.data().first_name} ${doc.data().last_name}`,
      })),
    );
  });
};
