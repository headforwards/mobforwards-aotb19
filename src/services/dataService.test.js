import dataService from "./dataService";
import Firebase from "firebase";
import { exportAllDeclaration } from "@babel/types";

let mockData = [];

jest.mock("firebase", () => {
  return {
    initializeApp: jest.fn(),

    database: () => {
      return {
        ref: () => {
          return {
            on: jest.fn().mockImplementation((value, func) => {
              var snapshot = {
                val: () => mockData
              };
              func(snapshot);
            })
          };
        }
      };
    }
  };
});

describe("dataServiceTest", () => {
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
