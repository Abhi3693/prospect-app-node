module.exports = (err, req, res, next) => {
  if (err.name == 'ValidationError')
    return (err = handleValidationError(err, res));
  if (err.name == 'CastError')
    return res.status(400).json({ error: 'Bad request' });
  if (err.name == 'TypeError')
    return res.status(400).json({ error: 'Prospect not found' });

  res.status(500).json({ error: 'An unknown error occurred.' });
};

// handle field formats
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).reduce((prev, curr) => {
    prev[curr.path] = curr.message;
    return prev;
  }, {});

  res.status(400).json({ errors: errors });
};
