import { Purchases } from "@/app/admin/purchases/components/columns";
import { db } from "@/config/FirebaseConfig";
import { PurchaseSchema } from "@/schemas/purchase.schema";
import {
  collection,
  doc,
  getDoc,
  getDocs,
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

export const addNewPurchase = async (
  data: PurchaseSchema & { total_cost: string },
) => {
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
