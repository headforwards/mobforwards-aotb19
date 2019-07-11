import dataService from "./dataService";
jest.mock("./dataService", () => {
  return {
    getRooms: jest.fn(() => Promise.resolve()),
    rooms: jest.fn(() =>
      [
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
      ].sort((a, b) => a.location_name.localeCompare(b.location_name))
    )
  };
});

describe("dataServiceTest", () => {
  it("gets the rooms", () => {
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
});
