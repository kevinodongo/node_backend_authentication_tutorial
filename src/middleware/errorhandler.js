/**
 * Error handler
*/
const errorhandler = (err, req, res, next) => {
    //console.error(err.stack)
    return res.status(500).json(err.stack)
}

module.exports = errorhandler