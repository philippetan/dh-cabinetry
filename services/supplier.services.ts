import { db } from "@/config/FirebaseConfig";
import { SupplierSchema } from "@/schemas/supplier.schema";
import { Suppliers } from "@/types/supplier.types";
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

export const subscribeToSuppliers = (callback: (data: Suppliers[]) => void) => {
  const suppliersCollection = collection(db, "suppliers");
  const q = query(
    suppliersCollection,
    where("deleted_at", "==", null),
    orderBy("created_at", "desc"),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Suppliers[] = snapshot.docs.map((doc) => {
      const supplier = doc.data();

      return {
        id: doc.id,
        supplier_name: supplier.name,
        email_address: supplier.email_address,
        contact_number: supplier.contact_number,
      };
    });
    callback(data);
  });
  return unsubscribe;
};

export const fetchSupplierById = async (id: string) => {
  const supplierDoc = await getDoc(doc(db, "suppliers", id));
  if (!supplierDoc.exists()) return null;
  return supplierDoc.data();
};

export const deleteSupplier = async (id: string): Promise<void> => {
  await updateDoc(doc(db, "suppliers", id), {
    deleted_at: serverTimestamp(),
  });
};

export const addSupplier = async (data: SupplierSchema) => {
  const id = ulid();
  
  await setDoc(doc(db, "suppliers", id), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });
};

export const updateSupplier = async (id: string, data: SupplierSchema) => {
  await updateDoc(doc(db, "suppliers", id), {
    ...data,
    updated_at: serverTimestamp(),
  });
};
