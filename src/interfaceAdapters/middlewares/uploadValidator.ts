import { body } from 'express-validator';

export const uploadValidator = [
  body('customer_code')
    .notEmpty()
    .withMessage('The field customer_code is required'),
  body('measure_datetime')
    .notEmpty()
    .withMessage('The field measure_datetime is required'),
  body('measure_type')
    .notEmpty()
    .withMessage('The field measure_type is required')
    .isIn(['WATER', 'GAS'])
    .withMessage("The field measure_type must be 'WATER' or 'GAS'"),
  body('file')
    .notEmpty()
    .withMessage('The field file is required')
    .isBase64()
    .withMessage('The field file must be base64'),
];
