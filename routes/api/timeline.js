const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');

const TimeLine = require("../../src/models/Timeline");

router.use(fileUpload());

router.get("/list", (req, res)=>{
  TimeLine.find({})
    .then( list => res.status(200).json(list))
    .catch( err => { throw err })
})

router.get("/info/:id", (req, res)=>{
  const { id } = req.params;
  TimeLine.findById(id)
    .then( info => res.json(info))
    .catch( err => { throw err })
})

router.post('/info', (req, res) => {
  const newTimeLine = new TimeLine({
    image: req.body.image,
    year: req.body.year, 
    chineseContent: req.body.chineseContent
  });

  newTimeLine.save()
    .then(res.send('Success'))
    .catch(err => { throw err })
})

router.put('/edit/image/:id', (req, res) => {
  const { id } = req.params;
  TimeLine.findById(id)
    .then(timeline => {
      const { image } = timeline;
      timeline.image = req.body.image;
      timeline.save()
        .then(()=>{
          try {
            fs.unlinkSync(`./images/timeline/${image}`)
          } catch(err) {
            res.json("Can't delete!!")
          }
          res.json('Success!')
        })
        .catch( err => res.status(400).send("Can't Delete the pic"))
    })
    .catch( err => res.status(400).send("Can't find this timeline info"))
})

router.put('/edit/:id', (req, res) => {
  const { id } = req.params;
  TimeLine.findById(id)
    .then(timeline => {
      const { image } = timeline;
      timeline.image = req.body.image;
      timeline.year = req.body.year;
      timeline.chineseContent = req.body.chineseContent;
      timeline.save()
        .then(()=>{
          if(image === req.body.image){
            return res.json('Success')
          } 
          else {
            try {
              fs.unlinkSync(`./images/timeline/${image}`)
            } catch(err) {
              return res.json("Can't delete!!")
            }
          }
          res.json('Success!')
        })
        .catch( err => res.status(400).send("Can't Delete the pic"))
    })
    .catch( err => res.status(400).send("Can't find this timeline info"))
})

router.post('/images', function (req, res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  var current_files = fs.readdirSync(`./images/timeline/`);
  let profilePic = req.files.selectedFile;
  let fileName = profilePic.name;

  if(current_files.includes(fileName)) return res.status(400).send({ message: "file already exist!!"});

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

router.delete('/:fileName', (req, res)=>{
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
