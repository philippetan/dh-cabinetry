import { db } from "@/config/FirebaseConfig";
import { ProjectSchema } from "@/schemas/project.schema";
import {
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ulid } from "ulid";

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

export const subscribeToInventory = (
  callback: (
    data: { id: string; name: string; quantity: number; price: string }[],
  ) => void,
) => {
  const q = query(
    collection(db, "inventory"),
    where("deleted_at", "==", null),
    where("item_stock", ">", 0),
    orderBy("item_name", "asc"),
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().item_name,
        quantity: doc.data().item_stock,
        price: doc.data().item_price,
      })),
    );
  });
};

export const addNewProject = async (data: ProjectSchema) => {
  const id = ulid();

  const cleanedData = {
    ...data,
    project_description: data.project_description ?? "",
    labor_cost: parseFloat(data.labor_cost.replace(/,/g, "")).toFixed(2),
    project_fee: parseFloat(data.project_fee.replace(/,/g, "")).toFixed(2),
    materials_used: data.materials_used.map((item) => ({
      ...item,
      item_price: parseFloat(item.item_price?.replace(/,/g, "")).toFixed(2),
    })),
  };

  await setDoc(doc(db, "projects", id), {
    ...cleanedData,
    endDate: null,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });

  await Promise.all(
    cleanedData.materials_used.map(async (item) => {
      const inventoryRef = doc(db, "inventory", item.inventory_id);

      await updateDoc(inventoryRef, {
        item_stock: increment(-parseFloat(item.item_qty)),
        updated_at: serverTimestamp(),
      });
    }),
  );
};
