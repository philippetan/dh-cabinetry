import { Project } from "@/app/admin/projects/components/columns";
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

// For new projects — only show items with stock
export const subscribeToInventoryInStock = (
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

// For editing projects — show all items including out-of-stock
export const subscribeToInventory = (
  callback: (
    data: { id: string; name: string; quantity: number; price: string }[],
  ) => void,
) => {
  const q = query(
    collection(db, "inventory"),
    where("deleted_at", "==", null),
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
    end_date: null,
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

export const subscribeToProjects = (callback: (data: Project[]) => void) => {
  const q = query(
    collection(db, "projects"),
    where("deleted_at", "==", null),
    orderBy("start_date", "desc"),
  );
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[],
    );
  });
};

export const getProjectById = async (
  id: string,
): Promise<ProjectSchema | null> => {
  const projectDoc = await getDoc(doc(db, "projects", id));
  if (!projectDoc.exists()) return null;

  const data = projectDoc.data();
  return {
    project_name: data.project_name,
    project_description: data.project_description,
    client_id: data.client_id,
    start_date: data.start_date?.toDate(),
    materials_used: data.materials_used,
    labor_cost: data.labor_cost,
    project_fee: data.project_fee,
  };
};

export const updateProject = async (
  id: string,
  data: ProjectSchema,
  originalData: ProjectSchema,
) => {
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

  await updateDoc(doc(db, "projects", id), {
    ...cleanedData,
    updated_at: serverTimestamp(),
  });

  // Reconcile inventory stock changes
  await Promise.all(
    cleanedData.materials_used.map(async (newItem) => {
      const originalItem = originalData.materials_used.find(
        (o) => o.inventory_id === newItem.inventory_id,
      );

      const newQty = parseFloat(newItem.item_qty);
      const originalQty = originalItem ? parseFloat(originalItem.item_qty) : 0;
      const diff = originalQty - newQty; // positive = stock returned, negative = more consumed

      if (diff === 0) return;

      await updateDoc(doc(db, "inventory", newItem.inventory_id), {
        item_stock: increment(diff),
        updated_at: serverTimestamp(),
      });
    }),
  );

  // Restore stock for items that were removed from the project
  const removedItems = originalData.materials_used.filter(
    (o) =>
      !cleanedData.materials_used.find(
        (n) => n.inventory_id === o.inventory_id,
      ),
  );

  await Promise.all(
    removedItems.map(async (item) => {
      await updateDoc(doc(db, "inventory", item.inventory_id), {
        item_stock: increment(parseFloat(item.item_qty)),
        updated_at: serverTimestamp(),
      });
    }),
  );

  // Deduct stock for newly added items
  const addedItems = cleanedData.materials_used.filter(
    (n) =>
      !originalData.materials_used.find(
        (o) => o.inventory_id === n.inventory_id,
      ),
  );

  await Promise.all(
    addedItems.map(async (item) => {
      await updateDoc(doc(db, "inventory", item.inventory_id), {
        item_stock: increment(-parseFloat(item.item_qty)),
        updated_at: serverTimestamp(),
      });
    }),
  );
};

export const completeProject = async (id: string) => {
  const projectRef = doc(db, "projects", id);

  await updateDoc(projectRef, {
    end_date: serverTimestamp(),
    updated_at: serverTimestamp(),
  });
};

export const deleteProject = async (id: string) => {
  const projectDoc = await getDoc(doc(db, "projects", id));
  if (!projectDoc.exists()) return;

  const data = projectDoc.data();
  const isCompleted = data.end_date !== null;

  await updateDoc(doc(db, "projects", id), {
    deleted_at: serverTimestamp(),
  });

  if (!isCompleted) {
    await Promise.all(
      data.materials_used.map(async (item: any) => {
        await updateDoc(doc(db, "inventory", item.inventory_id), {
          item_stock: increment(parseFloat(item.item_qty)),
          updated_at: serverTimestamp(),
        });
      }),
    );
  }
};
