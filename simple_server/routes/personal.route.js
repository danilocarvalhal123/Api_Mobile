const express = require('express');
const app = express();
const personalRoutes = express.Router();

let Personal = require('../model/Personal');

// api to add personal
personalRoutes.route('/add').post(function (req, res) {
  let personal = new Personal(req.body);
  personal.save()
  .then(personal => {
    res.status(200).json({'status': 'success','mssg': 'personal added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get personals
personalRoutes.route('/').get(function (req, res) {
  Personal.find(function (err, personals){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','personals': personals});
    }
  });
});

// api to get personal
personalRoutes.route('/personal/:id').get(function (req, res) {
  let id = req.params.id;
  Personal.findById(id, function (err, personal){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','personal': personal});
    }
  });
});

// api to update route
personalRoutes.route('/update/:id').put(function (req, res) {
    Personal.findById(req.params.id, function(err, personal) {
    if (!personal){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        personal.name = req.body.name;
        personal.email = req.body.email;
        personal.phone_number = req.body.phone_number;
        personal.desc = req.body.desc;

        personal.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
personalRoutes.route('/delete/:id').delete(function (req, res) {
  Personal.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = personalRoutes;