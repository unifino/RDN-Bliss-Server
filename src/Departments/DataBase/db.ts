import { db }                           from './Credit'
import * as CTS                         from '../../types/common'

// -- ======================================================================================

type Result = {
    rowCount: number,
    rows: CTS.Patients[],
    // command: ,
    // oid: ,
    // fields: ,
    // _parsers: ,
    // _types: ,
    // RowCtor: ,
    // rowAsArray:
};

// -- ======================================================================================

export const getPatients = () => {
    return new Promise ( (rs, rx) => {
        const qry = `SELECT * FROM Patients`;
        // WHERE email = '${email}'
        db.query( qry, ( err, r: Result ) => err ? rx( "E001 " + err ) : rs( r.rows ) );
    } );
}

// -- ======================================================================================

export const logIn = ( userType: CTS.UserTypes, username: string, password: string ) => {
    return new Promise ( (rs, rx) => {
        // ! Consider it
        const qry = `SELECT * FROM ${ CTS.UserTypes[ userType ] }s
            WHERE username = '${username}' AND password = '${password}'`
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E001 " + err )
            else if ( r.rows.length === 0 ) rx( "User Not Found" )
            else if ( r.rows.length === 1 ) rs( r.rows[0] )
            else rx( "E002 : Duplicated Users!" )
        } )
    } );
}

// -- ======================================================================================
