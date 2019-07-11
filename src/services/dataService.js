import Firebase from "firebase";

class DataService {

    speakers = [];
    rooms = [];

    constructor() {
        let db = Firebase.database();
        let speakerRef = db.ref("mobforwards-aotb19/speakers");
        speakerRef.on("value", (snapshot) => this.speaker = snapshot.val());
        let roomRef = db.ref("mobforwards-aotb19/rooms");
        roomRef.on("value", (snapshot) => this.rooms = snapshot.val());
    }

    getSpeakers = () => {
        return this.speakers;
    }

    getRooms = () => {
        return this.rooms;
    }
}

export default DataService;

