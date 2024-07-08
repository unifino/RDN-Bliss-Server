import * as express                     from "express"
import * as TS                          from './types/types'
import * as CTS                         from './types/common'

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

    const data: CTS.userData[] = [
        { id: 0, sex:"male",   name: "Hatef" },
        { id: 0, sex:"male",   name: "Ali" },
        { id: 0, sex:"male",   name: "Rasul" },
        { id: 0, sex:"female", name: "Fatemeh" },
        { id: 0, sex:"female", name: "Sara" },
        { id: 0, sex:"male",   name: "Farid" },
        { id: 0, sex:"male",   name: "Javad" },
        { id: 0, sex:"male",   name: "Saeed" },
        { id: 0, sex:"female", name: "Leyla" },
        { id: 0, sex:"male",   name: "HamidReza" },
        { id: 0, sex:"male",   name: "Mohaddese" },
        { id: 0, sex:"male",   name: "Karim" },
        { id: 0, sex:"female", name: "Sima" },
    ]

    // .. Process Request by Users Department
    // userActions._battery_status( email )
    // .. everything is good
    // .then( chargeValue => res.json( { status: 200, answer: chargeValue } ) )
    // .. report error
    // .catch( err => res.json( { status: 500, reason: err + "" } ) );

    res.json( { status: 200, answer: data } )

} );

// -- ============================================================ Listening on Port =======

app.listen( PORT, () => console.info( `running on ${ PORT } ...` ) ); 

// -- ========================================================================= FINE =======