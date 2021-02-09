import Express from "express";
import * as card from "./cards.js";
import _ from "lodash";
import cors from "cors";

const app = Express();
/* app.use(cors()); */
const port = 3000;

//GET, PUT, POST, DELETE


/* Path - Callback */
app.get("/cartas", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/pozo", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador1", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador2", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador3", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador4", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})



/*  */



app.listen(port, () => console.log("listening on port " + port))