import * as CTS                         from '../types/common'

const myCrypto = require('crypto');

// -- =====================================================================================

// .. Generate a salt
export const salt = myCrypto.randomBytes(16).toString('hex')

export const hashPassword = ( password: string, salt: string, iterations = 10000 ): CTS.HashedPass => {

    const hashBytes = 64
    const digest = 'sha512'

    const hash = myCrypto.pbkdf2Sync( password, salt, iterations, hashBytes, digest )

    return {
        hash: hash.toString('hex'),
        salt: salt,
        iterations: iterations
    }

}

// -- =====================================================================================