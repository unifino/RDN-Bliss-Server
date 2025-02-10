import { db }                           from './Credit'
import * as CTS                         from '../../types/common'
import { hashPassword, salt }           from '../../mixins/Tools'
import * as Users                       from './Users'

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

export const Login = ( sentData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        Users.getUserByUserName( sentData )
        .then( usr => checkPassword( usr, sentData.password as string ) )
        .then( usr => rs( usr ) )
        .catch( err => rx( err ) )
    } );
}

// -- ======================================================================================

const checkPassword = ( userData: CTS.UserData, check: string ): Promise<CTS.UserData> => {

    return new Promise ( (rs, rx) => {

        const org = userData.password as CTS.HashedPass
        const check_hash = hashPassword( check, org.salt, org.iterations )

        // .. chcek password
        if ( org.hash === check_hash.hash ) rs( userData )
        else rx( "User Not Found: Password Error" )

    } );

}

// -- ======================================================================================

export const Register = ( userData: CTS.UserData ) => {
    return new Promise ( (rs, rx) => {
        // .. chcek existence
        Users.CheckEmailOrUserExists( userData )
        .then( () => {
            InsertNewUser( userData )
            .then( () => rs( "Registered" ) )
            .catch( err => rx(err) )
        } )
        .catch( msg => rx( msg ) )
    } );
}

// -- ======================================================================================

const InsertNewUser = async ( userData: CTS.UserData ) => {

    return new Promise ( (rs, rx) => {

        const hashData = hashPassword( userData.password as string, salt );

        const subQry = `( email, username, password, firstName, lastName, birthDay, gender )
        VALUES (
            ${userData.email ? "'" + userData.email + "'" : null},
            ${userData.username ? "'" + userData.username + "'" : null},
            '${ JSON.stringify( hashData ) }',
            ${userData.firstname ? "'" + userData.firstname + "'" : null},
            ${userData.lastname ? "'" + userData.lastname + "'" : null},
            ${userData.birthday ? "'" + userData.birthday + "'" : null},
            ${userData.gender ? "'" + userData.gender.toLowerCase() + "'" : null}
        )`

        // .. chcek existence
        const qry = `INSERT INTO "${ CTS.UserTypes[ userData.userType ] }s" ${subQry}`
        db.query( qry, ( err, r: Result ) => {
            if ( err ) rx( "E.L.01 " + err + "\n" + qry )
            else rs( r.rows[0] )
        } )

    } );

}

// -- ======================================================================================

