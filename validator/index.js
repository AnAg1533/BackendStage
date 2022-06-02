const req = require("express/lib/request");

exportss.userSignUpValidator = (req,res,next) =>
{
    req.check("name","Name is required").notEmpty()
    req.check("email","Email must be between 3 and 32")
    .matches(/.+\@.+\..+/)
    .isLength({
        min:4,
        max:32
    });

    req.check("password","password is required").notEmpty();
    req.check("password")
        .isLength({min:6})
        .withMessage("Password must contain a number");
    const errors = req.validationErrors()
    if(errors)
    {
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({error:firstError});
    }
    next();
}