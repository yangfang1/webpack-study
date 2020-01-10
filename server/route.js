module.exports=(app)=>{
  app.get("/api/test",(req,res)=>{
    const data={
      errorNum:0,
      retDataList:[
        "node",
        "js",
        "java"
      ]
    }
    res.json(data)
  })
}