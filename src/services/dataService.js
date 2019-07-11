import Firebase from "firebase";
import FirebaseConfig from "../config";
Firebase.initializeApp(FirebaseConfig);

const dataService = {
  getRooms: () => {
    return Firebase.database().ref("/");
  }
};

export default dataService;
