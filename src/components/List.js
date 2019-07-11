import React from "react";

const List = ({ rooms }) => (
  <ul data-room-list>
    {rooms.length &&
      rooms.length > 0 &&
      rooms.map((room, i) => (
        <li key={i} data-room style={{ listStyle: "none" }}>
          {room.location_name}
        </li>
      ))}
  </ul>
);

export default List;
