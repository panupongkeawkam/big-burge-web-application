const pool = require('../config');

async function isLoggedIn(req, res, next) {
    let authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Roti' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [tokens, field2] = await conn.query(
            `SELECT * FROM token
            WHERE token = ?`,
            [part2]
        )
        const token = tokens[0]
        if (!token) {
            return res.status(401).send('You are not logged in')
        }
        if (new Date() > token.end_date) {
            const [row1, field1] = await conn.query(
                `DELETE FROM token
                WHERE token_id = ?`,
                [token.token_id]
            )
            await conn.commit()
            return res.json({account: null})
        }
        const [user, field3] = await conn.query(
            `SELECT *
            FROM account
            WHERE account_id = ?`,
            [token.account_id]
        )
        req.user = user[0]
        await conn.commit()
        next()
    }
    catch (err) {
        await conn.rollback()
        res.status(500).send(err)
    }
    finally {
        conn.release()
    }
}

module.exports = {
    isLoggedIn
}