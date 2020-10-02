window.onload = () => {fetch("http://localhost:3000/api/users/create", {
   method: "POST",
   cache: "no-cache",
   body: {
      "id": 3,
      "name": "Diana Arceo Suarez",
      "country": "México",
      "salary": 100000,
      "bornYear": 1999
   }
})}

