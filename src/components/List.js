import  React  from "react";

const List = ({rooms}) => <ul data-room-list>
    {rooms.map( (room,i) => <li key={i} data-room>{room.location_name}</li>)}
</ul>

export default List;