import { collection, addDoc, getDoc, getDocs, query, orderBy, limit, doc, updateDoc, increment, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
interface Data {
    id: string;
    subscribe: number;
}

// Hàm để thêm dữ liệu
export const addData = async (): Promise<string | null> => {
    try {
        const docRef = doc(db, "sub", "TomiSakae");

        // Kiểm tra xem document với ID "TomiSakae" có tồn tại không
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Nếu document đã tồn tại, cập nhật giá trị subscribe tăng lên 1
            await updateDoc(docRef, {
                subscribe: increment(1)
            });
        } else {
            // Nếu document chưa tồn tại, tạo mới với giá trị subscribe ban đầu là 1
            await setDoc(docRef, {
                subscribe: 1
            });
        }

        return docRef.id;
    } catch (e) {
        console.error("Error adding or updating document: ", e);
        return null;
    }
};

// Hàm để lấy dữ liệu từ document với ID "TomiSakae"
export const fetchData = async (): Promise<number> => {
    try {
        const docRef = doc(db, "sub", "TomiSakae");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as Data;
            return data.subscribe;
        } else {
            return 0; // Nếu document không tồn tại, trả về 0
        }
    } catch (e) {
        console.error("Error fetching document: ", e);
        return 0;
    }
};