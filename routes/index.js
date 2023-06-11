const { createDiffieHellmanGroup } = require('crypto');
var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  var filedup=[];
  fs.readdir("./uploads",{withFileTypes:true},function(err,file){
   // console.log(file[0].isDirectory());
   file.forEach(function(dirent){
    filedup.push({name:dirent.name,folderhai:dirent.isDirectory()})
   })
   //console.log(filedup)
   res.render('index',{file:filedup})
   
  })
router.get("/createfile",function(req,res){
  fs.writeFile(`./uploads/${req.query.fileName}`," ",function(err,file){
    if(err) console.log(err);
    else(res.redirect("/"))
  })
})


router.get("/createfolder",function(req,res){

  fs.mkdir(`./uploads/${req.query.FolderName}`, function(err,folder) {
    if (err) console.log(err)
    else(res.redirect("/")) 
  })
})
});
router.get("/files/:name",function(req,res){
  var filedup=[];
  fs.readdir("./uploads",{withFileTypes:true},function(err,file){
   // console.log(file[0].isDirectory());
   file.forEach(function(dirent){
    filedup.push({name:dirent.name,folderhai:dirent.isDirectory()})
   })
   fs.readFile(`.uploads/${req.params.name}`,"utf-8",function(err,data){
    res.render('fileopned',{file:filedup,filename:req.params.name,filedata:data})
   
   })
   //console.log(filedup)
  })
 
})
router.get('/delete/file/:filename', (req, res) => {

  fs.unlink(`./uploads/${req.params.filename}`, (err) => {
    if (err) { console.log(err) }
    res.redirect('/')
  })
})


router.get('/delete/folder/:foldername',(req,res)=>{
  fs.rmdir(`./uploads/${req.params.foldername}`,(err)=>{
    if(err){console.log(err)} 
    res.redirect('/')
  })
})

router.post('/save', (req, res) => {
  fs.writeFile(`./uploads/${req.body.file}`, req.body.data, {}, (err) => {
    if(err){console.log(err)} 
    res.json({"success":true})

  })
})


module.exports = router;
