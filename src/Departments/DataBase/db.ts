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
        db.query( qry, ( err, r: Result ) => err ? rx(err) : rs( r.rows ) );
    } );
}

// -- ======================================================================================
