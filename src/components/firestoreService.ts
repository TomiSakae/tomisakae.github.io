// firestoreService.ts
import { collection, addDoc, getDocs, query, orderBy, limit, doc, updateDoc, increment, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Data {
    id: string;
    subscribe: number;
}

// Hàm để thêm dữ liệu
export const addData = async (): Promise<string | null> => {
    try {
        const subCollection = collection(db, "sub");

        // Lấy document mới nhất để lấy giá trị subscribe hiện tại
        const q = query(subCollection, orderBy("subscribe", "desc"), limit(1));
        const querySnapshot = await getDocs(q);

        let newSubscribeValue = 1;

        if (!querySnapshot.empty) {
            const latestDoc = querySnapshot.docs[0];
            const latestData = latestDoc.data() as Data;
            newSubscribeValue = latestData.subscribe + 1;
        }

        // Thêm document mới với giá trị subscribe tăng lên 1
        const docRef = await addDoc(subCollection, { subscribe: newSubscribeValue });

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

// Hàm để lấy dữ liệu
export const fetchData = async (): Promise<Data[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "sub"));
        const dataList: Data[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Data[];
        return dataList;
    } catch (e) {
        console.error("Error fetching documents: ", e);
        return [];
    }
};
