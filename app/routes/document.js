/**
 * Created by InFo on 16/12/2016.
 */
var fs = require('fs');
var Document = require('../models/document');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

module.exports = function(router){

    /**
     * Gets the list of all files from the database
     */
    router.get('/document', function (req, res, next) {
        Document.find({},  function (err, uploads) {
            if (err) next(err);
            else {
                res.send(uploads);
            }
        });
    });

    /**
     * Gets a file from the hard drive based on the unique ID and the filename
     */
    router.get('/document/:uuid/:filename', function (req, res, next) {
        console.log(req.params);
        Document.findOne({
            'file.filename': req.params.uuid,
            'file.originalname': req.params.filename
        }, function (err, upload) {

            if (err) next(err);
            else {
                res.set({
                    "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
                    "Content-Type": upload.file.mimetype
                });
                fs.createReadStream(upload.file.path).pipe(res);
            }
        });
    });

    /**
     * Create's the file in the database
     */
    router.post('/document', upload.single('file'), function (req, res, next) {
        console.log(req.body);
        console.log(req.file);
        var newUpload = {
            nom: req.body.nom,
            projet: req.body.projet,
            dateCreation : Date.now(),
            file: req.file
        };
        Document.create(newUpload, function (err, next) {
            if (err) {
                next(err);
            } else {
                res.send(newUpload);
            }
        });
    });

    /**
     * Delete the File with id
     */
    router.delete('/document/:id',function (req,res) {
        Document.remove({_id : req.params.id},function (err) {
            if(err){
                res.send(err);
            }else{
                res.json({ success: true, message: 'Document supprimé'});
            }
        })
    });


    //Get File by id
    //http://localhost:3000/api/document/:id
    router.get('/document/:id',function (req,res) {
        //res.send('testing get all route');
        Document.findOne({_id : req.params.id},function (err,document) {
            if(err) throw err;
            if(!document){
                res.json({success:false, message: 'Aucun document trouvé'});
            }
            else if(document){
                res.json({success:true, message: 'document trouvé', document: document});
            }
        })
    });

    //Get Documents of a Projet
    router.get('/documentsProjet',function (req,res) {
        Document.find({projet : req.query["projet"]},function (err,documents) {
              console.log(req.query["projet"]);
            if(err) throw err;
            if(documents.length==0){
                res.json({success:false, message: 'Aucun document trouvé'});
            }
            else{
                res.json({success:true, message: 'documents trouvés', documents: documents});
            }
        })
    });
    

    return router;
};