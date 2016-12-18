//var connectionStringmain = 'pg://teamcia:teamcia21@irispostgresqldev.crv1otzbekk9.us-east-1.rds.amazonaws.com:5432/ddb01udf';


// (old connctnString) var connectionStringmain = 'pg://eyecu:Welcome1@ddb01udf.crv1otzbekk9.us-east-1.rds.amazonaws.com:5432/ddb01udf';
var connectionStringmain = 'pg://postgres@localhost:5432/new_sample'; // my_db connection string
module.exports = connectionStringmain;
// 'pg://login_role_name@localhost:5432/database_name'

/* connection string explained:

/ pg://  --> standard syntax
postrres@localhost  --> login role name
5432  --> standard port number
new_sample  --> dabatase name 
*/
