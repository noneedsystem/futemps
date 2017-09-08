const express   = require('express');
const router    = express.Router();
const poinouter = require('../../poinouter');

router.get('/:path?', get);
router.patch('/:id', patch);

module.exports = router;
exports.get = get;
exports.patch = patch;

function get(req, res){
  res.send(poinouter.poinject(req.params.path));
}

function patch(req, res){
  if(!req.params.id)
    return res.status(400)
      .json({ ok: false, msg: 'id is not specified' });

  if(!req.body || req.body && !req.body.value)
    return res.status(400)
      .json({ ok: false, msg: 'value is not specified' });

  let opts = poinouter.editPoinjectValueById(req.params.id, req.body.value);

  if(!opts)
    return res.status(400)
      .json({ ok: false, msg: `ID: ${req.params.id} is not valid` });

  return res.status(200)
    .json({ ok: true, msg: `value of the ${req.params.id} has been changed`, opts});
}
