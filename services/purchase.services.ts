import { db } from "@/config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchSuppliers = async (): Promise<
  { id: string; name: string }[]
> => {
  const snapshot = await getDocs(
    query(collection(db, "suppliers"), where("deleted_at", "==", null)),
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};

export const fetchInventory = async (): Promise<
  { id: string; name: string }[]
> => {
  const snapshot = await getDocs(
    query(collection(db, "inventory"), where("deleted_at", "==", null)),
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().item_name,
  }));
};
