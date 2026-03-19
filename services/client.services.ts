import { Clients } from "@/app/admin/clients/components/columns";
import { db } from "@/config/FirebaseConfig";
import { ClientSchema } from "@/schemas/client.schema";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ulid } from "ulid";

export const subscribeToClients = (callback: (data: Clients[]) => void) => {
  const clientsCollection = collection(db, "clients");
  const q = query(clientsCollection, where("deleted_at", "==", null));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Clients[] = snapshot.docs.map((doc) => {
      const client = doc.data();

      return {
        id: doc.id,
        client_name: `${client.first_name} ${client.last_name}`,
        email_address: client.email_address,
        contact_number: client.contact_number,
        ongoing_projects: "",
        total_spent: "0",
      };
    });
    callback(data);
  });
  return unsubscribe;
};

export const fetchClientById = async (id: string) => {
  const clientDoc = await getDoc(doc(db, "clients", id));
  if (!clientDoc.exists()) return null;
  return clientDoc.data();
};

export const deleteClient = async (id: string): Promise<void> => {
  await updateDoc(doc(db, "clients", id), {
    deleted_at: serverTimestamp(),
  });
};

export const addClient = async (data: ClientSchema) => {
  const id = ulid();
  await setDoc(doc(db, "clients", id), {
    ...data,
    created_at: serverTimestamp(),
    updated_at: null,
    deleted_at: null,
  });
};

export const updateClient = async (id: string, data: ClientSchema) => {
  await updateDoc(doc(db, "clients", id), {
    ...data,
    updated_at: serverTimestamp(),
  });
};
