const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const SlideShow = require("../../src/models/Slideshow");

router.use(fileUpload());

router.get("/imagesList/:folder", (req, res)=>{
  if(req.params.folder === "slideshow"){
    SlideShow.find({})
      .then( list => res.status(200).json(list))
      .catch( err => { throw err })
  }
})

router.get('/:folder/:file', function (req, res) {

  const file_name = req.params.file;
  const get_file = path.resolve(`./images/${req.params.folder}/` + req.params.file);
  const current_files = fs.readdirSync(`./images/${req.params.folder}/`);
  const fileExists = current_files.includes(file_name);

  if (fileExists) {
    res.status(200).sendFile(get_file);
  } else {
    res.status(404).send('No File Found!');
  }
});

router.post('/upload/:folderName', function (req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  const { folderName } = req.params;

  var current_files = fs.readdirSync(`./images/${folderName}/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  if(current_files.includes(fileName)) res.status(400).send({ message: "file already exist!!"});

  let send_filePath = `./images/${folderName}/` + fileName;

  profilePic.mv(send_filePath, function (err) {

    if (err) return res.status(500).send(err);

    const res_dataObj = {
      "newFileName": fileName
    }

    const newSlideShow = new SlideShow({
      image: profilePic.name,
    });

    newSlideShow.save()
      .then(res.send(res_dataObj))
      .catch(err => { throw err })

  });

});

router.delete('/:folderName/:fileName', (req, res)=>{
  const { folderName, fileName } = req.params;
  try {
    fs.unlinkSync(`./images/${folderName}/${fileName}`)
  } catch(err) {
    throw err
  }

  SlideShow.remove({ image: fileName })
    .then(res.send('success delete'))
    .catch(err => { throw err })
})

module.exports = router;
