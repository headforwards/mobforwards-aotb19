import dataService from "./dataService";
import Firebase from "firebase";
import { exportAllDeclaration } from "@babel/types";

let mockData = [];

jest.mock("firebase", () => {

  return {
    initializeApp : jest.fn(),

    database:() => {
      return {
        ref :() => {
          return {
            on : jest.fn().mockImplementation((value, func) => {
              var snapshot = {
                val: () => mockData
              };
                func(snapshot);
            })
          }
        }
      }
    }
  }
});

describe("dataServiceTest", () => {
/*   it("gets the rooms", () => {
    expect(dataService.rooms()).toHaveLength(11);
  });

  it("returns the rooms in alphatical order", () => {
    var rooms = dataService.rooms();
    expect(rooms[0].location_name).toBe("Food Vendors");
  });

  it("get rooms from the database", async () => {
    var expectedRooms = [
      {
        location_name: "Studio F"
      },
      {
        location_name: "Studio G"
      },
      {
        location_name: "Studio L"
      },
      {
        location_name: "Roof Garden"
      },
      {
        location_name: "Gyllyngvase Beach"
      },
      {
        location_name: "Studio K"
      },
      {
        location_name: "Studio A"
      },
      {
        location_name: "Studio E"
      },
      {
        location_name: "Prince of Wales Pier"
      },
      {
        location_name: "Registration"
      },
      {
        location_name: "Food Vendors"
      }
    ];
    dataService.getRooms.mockReturnValueOnce(expectedRooms);
    var rooms = await dataService.getRooms();
    expect(rooms).toEqual(expectedRooms);
  });
 */
  it("gets the data from firebase", async () => {
    mockData = {
      rooms: [],
      speakers: [],
      events: []
    };

    var data = await dataService.getData();
    expect(data).toEqual(mockData);
  });
});
