const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false }));

app.get("/get", (req, res) =>{
    console.log("Get 请求参数：");
    console.log(req.query);

    res.send("get 请求成功！");
})

app.post("/post", (req, res) =>{
    console.log("Post 请求参数：");
    console.log(req.body);

    res.send("get 请求成功！");
})

app.listen(8080, () => {
    console.log("服务器启动成功！");
})