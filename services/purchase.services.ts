import { db } from "@/config/FirebaseConfig";
import { PurchaseSchema } from "@/schemas/purchase.schema";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ulid } from "ulid";

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

export const addNewPurchase = async (data: PurchaseSchema) => {
  const id = ulid();

  await setDoc(doc(db, "purchases", id), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });

  await Promise.all(
    data.items_purchased.map((item) =>
      updateDoc(doc(db, "inventory", item.inventory_id), {
        item_stock: increment(parseFloat(item.item_qty)),
      }),
    ),
  );
};
