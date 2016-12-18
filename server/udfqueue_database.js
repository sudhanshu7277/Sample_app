var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionstring = require('./config/database');
var connectionStringmain = require('./config/databaseNew');


router.get("/udfqueue", function(req, res) {

    var results = [];

    pg.connect(connectionStringmain, function(err, client, done) {

        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query 

        var query = client.query('Select udf_id, userid , supervisor, Orig_Queued_On, Queue_name, Account_no, form_name, dept_name from dudf.udf_fn_get_udfqueue($1)', ['Q']);
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});

router.get('/depts', function(req, res) {

    var results = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query for Depts

        var query = client.query('select dept_name from dudf.udf_fn_get_depts1()');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        };

    });
});

// added by UZR188 - Select reroute from PGSQL
router.get('/queues', function(req, res) {

    var results = [];

    pg.connect(connectionstring, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query for Queues

        var query = client.query('SELECT queue_name from udf_fn_reroute()');

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        };

    });
});

// created by vls189 -- roles data
router.get('/UDFadminRoles', function(req, res) { // linked to adminController.js

    var udfRolesResults = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query('SELECT role_id, role_name, role_desc, created_on, created_by FROM dudf.udf_t_roles ORDER BY role_id ASC');
        query.on('row', function(row) {
            udfRolesResults.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfRolesResults);
        });

        if (err) {
            console.log(err);
        };

    });
});


router.get('/udfFormlayout', function(req, res) {

    var udfFields = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query for Depts
        var query = client.query('Select * from dudf.udf_fn_get_dynamic_page_json($1)', [16456050]);

        query.on('row', function(row) {
            udfFields.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfFields);
        });

        if (err) {
            console.log(err);
        };

    });

});

router.get('/searchUDFForms', function(req, res) {
    var udfsearchforms = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        //SQL Query for Depts
        var query = client.query('SELECT form_id,form_name,form_desc FROM dudf.udf_t_forms');

        query.on('row', function(row) {
            udfsearchforms.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfsearchforms);
        });

        if (err) {
            console.log(err);
        };

    });

});

// created by vls189 -- udfAdminQueues data
router.get('/UDFadminQueues', function(req, res) { // linked to adminController.js

    var udfQueueResults = []; // results for udfQueue

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query('SELECT queue_id, queue_name, queue_desc, created_on, created_by FROM dudf.udf_t_queues');
        query.on('row', function(row) {
            udfQueueResults.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfQueueResults);
        });

        if (err) {
            console.log(err);
        }

    });
});

// created by vls189 -- udfAdmin CRUD Roles departments data
router.get('/UDFadminDepts', function(req, res) { // linked to adminController.js

    var udfDeptsResults = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query('SELECT dept_id, dept_name, dept_desc, created_on, created_by, deactivated_on, deactivated_by FROM dudf.udf_t_depts');
        query.on('row', function(row) {
            udfDeptsResults.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfDeptsResults);
        });

        if (err) {
            console.log(err);
        }

    });
});

// created by vls189 -- udfAdmin CRUD Workers data
router.get('/UDFadminWorkers', function(req, res) { // linked to adminController.js

    var udfWorkerResults = [];

    pg.connect(connectionStringmain, function(err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query('SELECT user_id, user_name, dept_id, created_on, created_by, deactivated_on, deactivated_by FROM dudf.udf_t_users');
        query.on('row', function(row) {
            udfWorkerResults.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(udfWorkerResults);
        });

        if (err) {
            console.log(err);
        }

    });
});


/** This function is for submitting the form data to postgres. */
router.post('/pgsave', function (req, res) {
  var results = [];
  var body = JSON.stringify(req.body).replace(/{"udf_fn_get_dynamic_page_json":{/g,'{');
  var dbjson = body.replace(/}}/g,'}');

console.log(dbjson);
    pg.connect(connectionStringmain, function (err, client, done) {
       
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        var query = client.query('Select * from dudf.udf_fn_insertformdata($1)', [dbjson]);
        var query = client.query("SELECT * FROM dudf.udf_t_test");
        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
});

module.exports = router;