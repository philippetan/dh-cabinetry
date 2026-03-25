import { Purchases } from "@/app/admin/purchases/components/columns";
import { db } from "@/config/FirebaseConfig";
import { PurchaseSchema } from "@/schemas/purchase.schema";
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

export const subscribeToSuppliers = (
  callback: (data: { id: string; name: string }[]) => void,
) => {
  const q = query(collection(db, "suppliers"), where("deleted_at", "==", null));
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name })),
    );
  });
};

export const subscribeToInventory = (
  callback: (data: { id: string; name: string }[]) => void,
) => {
  const q = query(collection(db, "inventory"), where("deleted_at", "==", null));
  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().item_name })),
    );
  });
};

export const addNewPurchase = async (
  data: PurchaseSchema & { total_cost: string },
) => {
  const id = ulid();

  const cleanedData = {
    ...data,
    items_purchased: data.items_purchased.map((item) => ({
      ...item,
      item_price: parseFloat(item.item_price?.replace(/,/g, "")).toFixed(2),
    })),
  };

  await setDoc(doc(db, "purchases", id), {
    ...cleanedData,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });

  await Promise.all(
    cleanedData.items_purchased.map((item) =>
      updateDoc(doc(db, "inventory", item.inventory_id), {
        item_stock: increment(parseFloat(item.item_qty)),
        updated_at: serverTimestamp(),
      }),
    ),
  );
};

export const subscribeToPurchases = (callback: (data: Purchases[]) => void) => {
  const purchasesCollection = collection(db, "purchases");
  const q = query(
    purchasesCollection,
    where("deleted_at", "==", null),
    orderBy("purchase_date", "desc"),
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const data: Purchases[] = await Promise.all(
      snapshot.docs.map(async (document) => {
        const purchase = document.data();

        // Fetch supplier name using supplier_id
        const supplierSnap = await getDoc(
          doc(db, "suppliers", purchase.supplier_id),
        );
        const supplierName = supplierSnap.exists()
          ? supplierSnap.data().name
          : "Unknown";

        return {
          id: document.id,
          supplier_name: supplierName,
          purchase_date: purchase.purchase_date,
          total_cost: purchase.total_cost,
        };
      }),
    );

    callback(data);
  });

  return unsubscribe;
};
