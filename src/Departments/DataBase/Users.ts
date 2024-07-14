import { db }                           from './Credit'
import * as CTS                         from '../../types/common'
import { hashPassword, salt }           from '../../mixins/Tools'

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
        db.query( qry, ( err, r: Result ) => err ? rx( "E.U.01 " + err ) : rs( r.rows ) );
    } );
}

// -- ======================================================================================

export const getUserByUserName = ( userData: CTS.UserData ): Promise<CTS.UserData> => {

    return new Promise ( (rs, rx) => {

        // .. chcek existence
        const qry = `SELECT * FROM ${ CTS.UserTypes[ userData.userType ] }s
            WHERE username = '${ userData.username }'`
        
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E.U.02 " + err )
            else if ( r.rows.length === 0 ) rx( "User Not Found: Username Error" )
            else if ( r.rows.length === 1 ) rs( r.rows[0] )
            else rx( "E.U.03: Duplicated User!" )
        } )

    } );

}

// -- ======================================================================================

export const CheckEmailOrUserExists = ( userData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        // .. chcek existence
        const qry = `SELECT * FROM ${ CTS.UserTypes[ userData.userType ] }s
            WHERE username = '${ userData.username }' OR email = '${ userData.email }'`
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E.U.04 " + err )
            else if ( r.rows.length === 0 ) rs( "User Not Found" )
            else {
                let msg = ""
                if ( r.rows[0].username === userData.username ) msg += "Username "
                if ( r.rows[0].email === userData.email ) msg += "Email "
                rx( msg + "Exists" )
            }
        } )
    } );
}

// -- ======================================================================================

