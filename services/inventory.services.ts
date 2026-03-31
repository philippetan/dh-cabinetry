import { db } from "@/config/FirebaseConfig";
import { InventorySchema } from "@/schemas/inventory.schema";
import {
  Inventory,
  InventoryData,
  ProjectUsed,
  Purchase,
} from "@/types/inventory.types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ulid } from "ulid";

export const addMaterial = async (data: InventorySchema) => {
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

export const updateMaterial = async (id: string, data: InventorySchema) => {
  const cleanedData = {
    ...data,
    item_price: parseFloat(data.item_price?.replace(/,/g, "")).toFixed(2),
  };

  await updateDoc(doc(db, "inventory", id), {
    ...cleanedData,
    updated_at: serverTimestamp(),
  });
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await updateDoc(doc(db, "inventory", id), {
    deleted_at: serverTimestamp(),
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

export const getInventoryById = async (
  itemId: string,
): Promise<InventoryData | null> => {
  const inventoryDoc = await getDoc(doc(db, "inventory", itemId));
  if (!inventoryDoc.exists()) return null;
  return inventoryDoc.data() as InventoryData;
};

export const getPurchasesByInventoryId = async (
  itemId: string,
): Promise<Purchase[]> => {
  const q = query(
    collection(db, "purchases"),
    where("deleted_at", "==", null),
    orderBy("purchase_date", "desc"),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const matchedItem = data.items_purchased?.find(
        (item: any) => item.inventory_id === itemId,
      );
      if (!matchedItem) return null;
      return {
        id: doc.id,
        purchase_date: data.purchase_date,
        supplier_id: data.supplier_id,
        total_cost: data.total_cost,
        item_qty: matchedItem.item_qty,
        item_price: matchedItem.item_price,
      };
    })
    .filter(Boolean) as Purchase[];
};

export const getProjectsByInventoryId = async (
  itemId: string,
): Promise<ProjectUsed[]> => {
  const q = query(
    collection(db, "projects"),
    where("deleted_at", "==", null),
    orderBy("start_date", "desc"),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const matchedItem = data.materials_used?.find(
        (item: any) => item.inventory_id === itemId,
      );
      if (!matchedItem) return null;
      return {
        id: doc.id,
        project_name: data.project_name,
        start_date: data.start_date,
        item_qty: matchedItem.item_qty,
        item_price: matchedItem.item_price,
        item_name: matchedItem.item_name,
      };
    })
    .filter(Boolean) as ProjectUsed[];
};
