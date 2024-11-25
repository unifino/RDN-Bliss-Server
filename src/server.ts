import * as express                     from "express"
import * as CTS                         from './types/common'
import * as Login                       from './Departments/DataBase/Login'
import * as Users                       from './Departments/DataBase/Users'

// -- ========================================================================= INIT =======

const PORT = process.env.PORT || 5007;
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

app.post( CTS.Post.Register, async ( req: express.Request, res: express.Response ) => {

    // .. requests | assign requests from POST
    const userData: CTS.UserData = req.body
    
    // // .. Process Request by DB Department
    Login.Register( userData )
    // .. everything is good
    .then( user => res.json( { status: 200, scc: user } ) )
    // .. report error
    .catch( err => res.json( { status: 500, err: err + "" } ) );

} );

// -- ============================================================ Get Patients List =======

app.post( CTS.Post.Login, async ( req: express.Request, res: express.Response ) => {

    // .. requests | assign requests from POST
    const userData = req.body as CTS.UserData;
    
    // .. Process Request by DB Department
    Login.Login( userData )
    // .. everything is good
    .then( user => res.json( { status: 200, scc: user } ) )
    // .. report error
    .catch( err => res.json( { status: 500, err: err + "" } ) );

} );

// -- ============================================================ Get Patients List =======

app.get( CTS.Get.getPatients, ( req: express.Request, res: express.Response ) => {

    // .. requests | assign requests from POST
    const email = req.body.e as string;
    
    // .. Process Request by DB Department
    Users.getPatients()
    // .. everything is good
    .then( patients => res.json( { status: 200, scc: patients } ) )
    // .. report error
    .catch( err => res.json( { status: 500, err: err + "" } ) );

} );

// -- ============================================================ Listening on Port =======

app.listen( PORT, () => {
    console.clear()
    console.info( `running on ${ PORT } ...` )
} ); 

// -- ========================================================================= FINE =======