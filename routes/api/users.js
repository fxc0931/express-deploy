// login & register
const express = require('express')
const router = express.Router()

// $route GET api/users/test
// @desc  return the data required
// @access public
router.get("/test", (req,res) => {
    res.json({msg: 'login works'})
})

module.exports = router
