import { db } from "@/config/FirebaseConfig";
import { InventorySchema } from "@/schemas/inventory.schema";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ulid } from "ulid";

export const addInventory = async (data: InventorySchema) => {
  const id = ulid();

  await setDoc(doc(db, "inventory", id), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });
};
