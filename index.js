const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const { join } = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));


app.use(express.static(path.join(__dirname, '/public')));


app.get("/api/users", async (req, res) => {
   try {
      let users = await fs.readFileSync(path.join(__dirname, '/data/users'), {encoding: "utf-8"});
      users = JSON.parse(users);
      res.setHeader("statusCode", 200);
      res.setHeader("content-type", "text/json");
      res.json({users, error: false, "message": "Usuarios obtenidos"});
   }catch(err) {
      res.setHeader("statusCode", 500);
      res.setHeader("content-type", "text/json");
      res.json({
         "message": "Hubo un error"
      });
   }
});

app.post("/api/users/create", async (req, res) => {

   try {
      let users = await fs.readFileSync(path.join(__dirname, '/data/users'), {
         encoding: "utf-8"
      })

      users = JSON.parse(users);
      users.push(req.body.user)
      await fs.writeFileSync(path.join(__dirname, '/data/users'), JSON.stringify(users));

      res.setHeader("statusCode", 200);
      res.setHeader("content-type", "text/json");
      res.json({
         users,
         error: false,
         "message": "Usuario agregado correctamente"
      });

   } catch (error) {
      console.log(error)
      res.setHeader("statusCode", 500);
      res.setHeader("content-type", "text/json");
      res.json({
         "message": "Hubo un error"
      });
   }
});


app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`)
});
