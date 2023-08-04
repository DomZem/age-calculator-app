import * as yup from 'yup';

export const schema = yup.object().shape({
  day: yup
    .number()
    .min(1, 'Must be a valid day')
    .max(31, 'Must be a valid day')
    .test('valid-day', 'Must be in the past', function (value) {
      const { month, year } = this.parent;
      if (!value || !month || !year) return true;

      const currentDate = new Date();
      const selectedDate = new Date(year, month - 1, value);
      return selectedDate < currentDate;
    })
    .typeError('This field is required'),
  month: yup
    .number()
    .min(1, 'Must be a valid month')
    .max(12, 'Must be a valid month')
    .typeError('This field is required'),
  year: yup
    .number()
    .max(new Date().getFullYear(), 'Must be in the past')
    .typeError('This field is required'),
});
