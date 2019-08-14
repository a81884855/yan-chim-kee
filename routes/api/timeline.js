const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');

const TimeLine = require("../../src/models/TimeLine");

router.use(fileUpload());

router.get("/list", (req, res)=>{
  TimeLine.find({})
    .then( list => res.status(200).json(list))
    .catch( err => { throw err })
})

router.post('/upload/timeline', function (req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  var current_files = fs.readdirSync(`./images/timeline/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  if(current_files.includes(fileName)) res.status(400).send({ message: "file already exist!!"});

  let send_filePath = `./images/timeline/` + fileName;

  profilePic.mv(send_filePath, function (err) {

    if (err) return res.status(500).send(err);

    const res_dataObj = {
      "newFileName": fileName
    }

    const newTimeLine = new TimeLine({
      image: profilePic.name,
    });

    newTimeLine.save()
      .then(res.send(res_dataObj))
      .catch(err => { throw err })

  });

});

router.delete('/timeline/:fileName', (req, res)=>{
  const { fileName } = req.params;
  try {
    fs.unlinkSync(`./images/timeline/${fileName}`)
  } catch(err) {
    throw err
  }

  TimeLine.remove({ image: fileName })
    .then(res.send('success delete'))
    .catch(err => { throw err })
})

module.exports = router;
