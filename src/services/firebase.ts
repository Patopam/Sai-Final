import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { users } from '../types/users-sign';
import { imgs } from '../types/img-post';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const firebaseConfig = {
	apiKey: 'AIzaSyDgAJvGH4dhqzoRVxqP7xB48nCS9HspO4g',
	authDomain: 'sai-project-9c598.firebaseapp.com',
	projectId: 'sai-project-9c598',
	storageBucket: 'sai-project-9c598.appspot.com',
	messagingSenderId: '133078057541',
	appId: '1:133078057541:web:c94d6d0fb1f2648dd0992c',
	measurementId: 'G-XSVD4VFKFS',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

//signin//

export const createUser = async (
	email: string,
	password: string,
	name: string,
	username: string,
	confirmPass: string
) => {
	if (password !== confirmPass) {
		throw new Error('Passwords do not match');
	}

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		await addDoc(collection(db, 'users2'), {
			uid: user.uid,
			email: user.email,
			name: name,
			username: username,
			password: password,
		});
		console.log('User created and added to Firestore with ID: ', user.uid);
	} catch (error: unknown) {
		if (error instanceof Error) {
			const errorCode = (error as any).code;
			const errorMessage = error.message;
			console.error('Error creating user: ', errorCode, errorMessage);
		} else {
			console.error('Unknown error', error);
		}
	}
};
//login//

export const signInUser = async (email: string, password: string) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		const querySnapshot = await getDocs(query(collection(db, 'users2'), where('uid', '==', user.uid)));
		if (querySnapshot.empty) {
			throw new Error('User not found in Firestore');
		}
		console.log('User signed in: ', user.uid);
		return user; // Asegúrate de retornar el usuario si la autenticación es exitosa
	} catch (error: unknown) {
		if (error instanceof Error) {
			const errorCode = (error as any).code;
			const errorMessage = error.message;
			console.error('Error signing in user: ', errorCode, errorMessage);
			throw error; // Vuelve a lanzar el error para que pueda ser capturado en el componente
		} else {
			console.error('Unknown error', error);
			throw new Error('Unknown error');
		}
	}
};

//signout//

export const signOutUser = async () => {
	try {
		await signOut(auth);
		console.log('User signed out successfully');
	} catch (error: unknown) {
		if (error instanceof Error) {
			const errorCode = (error as any).code;
			const errorMessage = error.message;
			console.error('Error signing out user: ', errorCode, errorMessage);
			throw error;
		} else {
			console.error('Unknown error', error);
			throw new Error('Unknown error');
		}
	}
};

// Obtener la información del usuario autenticado
export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const querySnapshot = await getDocs(query(collection(db, 'users2'), where('uid', '==', user.uid)));
				if (!querySnapshot.empty) {
					const userData = querySnapshot.docs[0].data();
					resolve(userData);
				} else {
					reject('User not found in Firestore');
				}
			} else {
				reject('No user is signed in');
			}
		});
	});
};

export const addUser = async (formData: Omit<users, 'id'>) => {
	try {
		const docRef = await addDoc(collection(db, 'users2'), formData);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const addPost = async (formDataImg: Omit<imgs, 'id'>) => {
	if (!formDataImg.user) {
		return;
	}
	try {
		const docRef = await addDoc(collection(db, 'posts'), formDataImg);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getPost = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));
	const arrayPost: Array<imgs> = [];

	querySnapshot.forEach((doc: any) => {
		const data = doc.data() as any;
		arrayPost.push({ id: doc.id, ...data });
	});
	console.log('get', arrayPost);
	return arrayPost;
};

export const uploadfile = async (file: File) => {
	const storageRef = ref(storage, 'imagesPost/' + file.name);
	uploadBytes(storageRef, file).then((snapshot) => {
		localStorage.setItem('imagesPost', file.name);
		console.log('Uploaded a blob or file!');
	});
};

export const getfile = async () => {
	const routeName = localStorage.getItem('imagesPost');
	const storageRef = ref(storage, 'imagesPost/' + routeName);
	const urlImg = await getDownloadURL(ref(storageRef))
		.then((url) => {
			return url;
		})
		.catch((error) => {
			console.log(error);
		});
	return urlImg;
};

export const getpostsListener = (cb: (docs: imgs[]) => void) => {
	const ref = collection(db, 'posts');
	onSnapshot(ref, (collection) => {
		const docs: imgs[] = collection.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		})) as imgs[];
		cb(docs);
	});
};
