const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');

const SlideShow = require("../../src/models/Slideshow");

router.use(fileUpload());

router.get("/list", (req, res)=>{
  SlideShow.find({})
    .then( list => res.status(200).json(list))
    .catch( err => { throw err })
})

router.post('/upload', function (req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  var current_files = fs.readdirSync(`./images/slideshow/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  console.log(fileName)
  if(current_files.includes(fileName)) res.status(400).send({ message: "file already exist!!"});

  let send_filePath = `./images/slideshow/` + fileName;

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

router.delete('/slideshow/:fileName', (req, res)=>{
  const { fileName } = req.params;
  try {
    fs.unlinkSync(`./images/slideshow/${fileName}`)
  } catch(err) {
    throw err
  }

  SlideShow.remove({ image: fileName })
    .then(res.send('success delete'))
    .catch(err => { throw err })
})

module.exports = router;
