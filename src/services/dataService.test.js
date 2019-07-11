import DataService from './dataService';
jest.mock('firebase', () => {
    return {
        initializeApp: jest.fn(),
        database: () => {
            return {
                ref: () => {
                    return {
                        on: jest.fn()
                    }
                }
            };
        }
    };
});


describe("dataServiceTest", () => {
    let dataService = undefined;
    beforeEach( ()=> {
        dataService = new DataService();
    });
    it("gets the rooms", () => {
        dataService.rooms = [1, 2, 3]
        expect(dataService.getRooms()).toHaveLength(3);
    });

    it("returns the rooms in alphatical order", ()=>{
        dataService.rooms = [{location_name: "Food Vendors"}]
        var rooms = dataService.getRooms();
        expect(rooms[0].location_name).toBe("Food Vendors");
    });

});