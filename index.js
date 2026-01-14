const express = require("express")
const app = express();
app.use(express.json());


const bookRoutes = require("./routes/booksRouter");
app.use("/api",bookRoutes);


//route simple 
app.get('/', (req, res) => {
  res.send('Hello Express 🚀');
});

app.get("/health", (req,res)=>res.json({status:"ok"}));

const Port = 3000 ; 
app.listen(Port,()=>{
    console.log(`Serveur lancé sur http://localhost:${Port}`);
});
