const dataService = {




    rooms: () =>{
        let data =[{
        location_name: "Studio F",
    },
    {
        location_name: "Studio G",
    },
    {
        location_name: "Studio L",
    },
    {
        location_name: "Roof Garden",
    },
    {
        location_name: "Gyllyngvase Beach",
    },
    {
        location_name: "Studio K",
    },
    {
        location_name: "Studio A",
    },
    {
        location_name: "Studio E",
    },
    {
        location_name: "Prince of Wales Pier",
    },
    {
        location_name: "Registration",
    },
    {
        location_name: "Food Vendors",
    }];
    return data.sort((a,b)=>a.location_name.localeCompare(b.location_name)); 

}
};

export default dataService;

