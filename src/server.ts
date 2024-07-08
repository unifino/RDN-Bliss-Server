import * as express                     from "express"
import * as TS                          from './types/types'
import * as CTS                         from './types/common'
import * as db                          from './Departments/DataBase/db'

// -- ========================================================================= INIT =======

const PORT = process.env.PORT || 5000;
const app = express();

const bodyParser = require( 'body-parser' );
const cors = require('cors')

// -- ======================================================================== SETUP =======

app.use( cors() ) 
app.use( bodyParser.json( { limit: '50mb' } ) );
app.use( bodyParser.urlencoded( {
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
} ) );

// app.use( '/public', express.static('public') );

// -- ============================================================ Get Patients List =======

app.get( '/getPatients', ( req: express.Request, res: express.Response ) => {

    // .. requests | assign requests from POST
    const email = req.body.e as string;
    
    // .. Process Request by DB Department
    db.getPatients()
    // .. everything is good
    .then( patients => res.json( { status: 200, answer: patients } ) )
    // .. report error
    .catch( err => res.json( { status: 500, reason: err + "" } ) );

} );

// -- ============================================================ Listening on Port =======

app.listen( PORT, () => console.info( `running on ${ PORT } ...` ) ); 

// -- ========================================================================= FINE =======