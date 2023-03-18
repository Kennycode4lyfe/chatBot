const joi = require("joi");

//validator for the items route before storing to database
const validateItemMiddleWare = async (req, res, next) => {
  const itemPayload = req.body;
  try {
    await itemValidator.validateAsync(itemPayload);
    next();
  } catch (error) {
    console.log(error);
    return res.status(406).send(error.details[0].message);
  }
};

const itemValidator = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
});

module.exports = validateItemMiddleWare;
