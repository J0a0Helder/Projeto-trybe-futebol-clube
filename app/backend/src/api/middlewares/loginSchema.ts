import * as Joi from 'joi';

const validateLoginObject = (input: object) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });
  return schema.validate(input);
};

export default validateLoginObject;
