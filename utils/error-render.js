const errorRender = (res, description) => {
    return res.render('error', {
        description,
      });
}

module.exports = {
    errorRender,
}