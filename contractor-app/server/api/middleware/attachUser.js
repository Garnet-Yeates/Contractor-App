module.exports = function (req, res, next) {
    const nonSecurePaths = ['/', '/register', '/login'];
    if (nonSecurePaths.includes(req.path)) return next();

    let { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send("No authorization token specified")
    jwt.verify(authorization.split(' ')[1], process.env.JWT_KEY, (err, verifiedToken) => {
        if (err)
            return res.status(401).json({ tokenError: "Invalid or expired JWT token" });
        req.userID = verifiedToken.userID;
        next();
    })
}