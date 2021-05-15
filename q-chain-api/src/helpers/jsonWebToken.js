const jwt = require('jsonwebtoken');

const {
    SECRET,
    TOKEN_LIFETIME
} = process.env;

exports.generateToken = user => new Promise(resolve => {
    delete user.password;
    const token = jwt.sign({ user },
        SECRET, { expiresIn: TOKEN_LIFETIME }
    );
    resolve(token);
});

exports.validateToken = token => new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return reject(err);
        }
        return resolve(decoded.user);
    });
});
