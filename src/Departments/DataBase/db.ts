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

export const Login = ( userType: CTS.UserTypes, username: string, password: string ) => {
    return new Promise ( (rs, rx) => {
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

export const Register = ( userData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        // .. chcek existence
        CheckEmailOrUserExists( userData )
        .then( () => {
            InsertNewUser( userData )
            .then( () => rs( "Registered" ) )
            .catch( err => rx(err) )
        } )
        .catch( msg => rx( msg ) )
    } );
}

// -- ======================================================================================

export const CheckEmailOrUserExists = ( userData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        // .. chcek existence
        const qry = `SELECT * FROM ${ CTS.UserTypes[ userData.userType ] }s
            WHERE username = '${ userData.username }' OR email = '${ userData.email }'`
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E003 " + err )
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

export const InsertNewUser = ( userData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        const subQry = `(email, username, password, firstName, lastName, birthDay, gender) VALUES 
        (
            ${userData.email ? "'" + userData.email + "'" : null},
            ${userData.username ? "'" + userData.username + "'" : null},
            '${userData.password}',
            ${userData.firstname ? "'" + userData.firstname + "'" : null},
            ${userData.lastname ? "'" + userData.lastname + "'" : null},
            ${userData.birthday ? "'" + userData.birthday + "'" : null},
            ${userData.gender ? "'" + userData.gender.toLowerCase() + "'" : null}
        )`
        // .. chcek existence
        const qry = `INSERT INTO ${ CTS.UserTypes[ userData.userType ] }s ${subQry}`
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E003 " + err )
            else rs( r.rows[0] )
        } )
    } );
}

// -- ======================================================================================

