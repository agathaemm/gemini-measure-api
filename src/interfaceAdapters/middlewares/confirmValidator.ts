import { body } from 'express-validator';

export const confirmValidator = [
  body('measure_uuid')
    .notEmpty()
    .withMessage('The field customer_code is required')
    .isUUID()
    .withMessage('The field measure_uuid should be a uuid'),
  body('confirmed_value')
    .notEmpty()
    .withMessage('The field confirmed_value is required')
    .isInt()
    .withMessage('The field confirmed_value should be an integer'),
];
