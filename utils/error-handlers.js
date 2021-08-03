const messageForSystemError = "System Error. Please use `heroku logs --tail --app=express-postgres` to get information."

const handleError = (err, req, res, next) => {
  console.log(err);

  err.statusCode = err.statusCode || 500;

  if (err.statusCode === 500)
    err.message = messageForSystemError;

  res.status(err.statusCode).send(err.message);
};

export default handleError;