import { db } from "@/config/FirebaseConfig";
import { SupplierSchema } from "@/schemas/supplier.schema";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ulid } from "ulid";

export const addSupplier = async (data: SupplierSchema) => {
  const id = ulid();
  await setDoc(doc(db, "suppliers", id), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });
};
