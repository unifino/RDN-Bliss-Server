import * as express                     from "express"
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
    .then( patients => res.json( { status: 200, scc: patients } ) )
    // .. report error
    .catch( err => res.json( { status: 500, err: err + "" } ) );

} );

// -- ============================================================ Get Patients List =======

app.post( '/logIn', async ( req: express.Request, res: express.Response ) => {

    // .. requests | assign requests from POST
    const userType = req.body.userType as CTS.UserTypes;
    const username = req.body.username as string;
    const password = req.body.password as string;
    
    // ! remove it
    await new Promise( _ => setTimeout( _, 1000 ) )

    // .. Process Request by DB Department
    db.logIn( userType, username, password )
    // .. everything is good
    .then( user => res.json( { status: 200, scc: user } ) )
    // .. report error
    .catch( err => res.json( { status: 500, err: err + "" } ) );

} );

// -- ============================================================ Listening on Port =======

app.listen( PORT, () => console.info( `running on ${ PORT } ...` ) ); 

// -- ========================================================================= FINE =======