import { Inventory } from "@/app/admin/inventory/components/columns";
import { db } from "@/config/FirebaseConfig";
import { InventorySchema } from "@/schemas/inventory.schema";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ulid } from "ulid";

export const addInventory = async (data: InventorySchema) => {
  const id = ulid();

  const cleanedData = {
    ...data,
    item_price: parseFloat(data.item_price?.replace(/,/g, "")).toFixed(2),
  };

  await setDoc(doc(db, "inventory", id), {
    ...cleanedData,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });
};

export const updateInventory = async (id: string, data: InventorySchema) => {
  const cleanedData = {
    ...data,
    item_price: parseFloat(data.item_price?.replace(/,/g, "")).toFixed(2),
  };

  await updateDoc(doc(db, "inventory", id), {
    ...cleanedData,
    updated_at: serverTimestamp(),
  });
};

export const subscribeToInventory = (callback: (data: Inventory[]) => void) => {
  const inventoryCollection = collection(db, "inventory");
  const q = query(
    inventoryCollection,
    where("deleted_at", "==", null),
    orderBy("created_at", "desc"),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Inventory[] = snapshot.docs.map((doc) => {
      const inventory = doc.data();

      return {
        id: doc.id,
        item_name: inventory.item_name,
        item_unit: inventory.item_unit,
        item_stock: inventory.item_stock,
      };
    });
    callback(data);
  });
  return unsubscribe;
};

export const fetchInventoryById = async (id: string) => {
  const inventoryDoc = await getDoc(doc(db, "inventory", id));
  if (!inventoryDoc.exists()) return null;

  return inventoryDoc.data();
};
