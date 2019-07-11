import dataService from './dataService';


describe("dataServiceTest", () => {
    it("gets the rooms", () => {
        expect(dataService.rooms()).toHaveLength(11);
    });

    it("returns the rooms in alphatical order", ()=>{
        var rooms = dataService.rooms();
        expect(rooms[0].location_name).toBe("Food Vendors");
    });

});