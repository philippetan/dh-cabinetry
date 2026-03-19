import { db } from "@/config/FirebaseConfig";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const deleteClient = async (id: string): Promise<void> => {
  await updateDoc(doc(db, "clients", id), {
    deleted_at: serverTimestamp(),
  });
};
