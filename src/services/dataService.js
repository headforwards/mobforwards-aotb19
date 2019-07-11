import Firebase from "firebase";
import FirebaseConfig from "../config";
Firebase.initializeApp(FirebaseConfig);

const dataService = {
  getData: () => {
    var p = new Promise((resolve) => {
      Firebase.database().ref("/").on("value", snapshot => {
        resolve(snapshot.val());
      });
    });

    return p;
  }
};

export default dataService;
