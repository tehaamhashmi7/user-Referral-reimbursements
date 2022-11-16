const User = require("../models/user");
const express = require("express");

const router = express.Router();

//Separation of concerns

//Registering the user
router.post("/register", async (req, res) => {
  const { name, email, referredUser, isPaymentMade, totalEarnings } = req.body;

  let newUser = new User({
    name,
    email,
    referredUser,
    isPaymentMade,
    totalEarnings,
  });

  await newUser.save();
  res.status(201).json({ newUser });
});


//Making payment and reimbursing the referred User
router.post(`/:id`, async (req, res) => {
  let ourUser = await User.findOne({ name: "A" });
  let referredUser = await User.findById(req.params.id);

  try {
    //Finding the user to make payment
    const pay = await User.findByIdAndUpdate(referredUser._id, {
      $set: {referredUser: ourUser._id , isPaymentMade: true },
    });

    if (pay) {
      //Finding the user to reimburse him 10 rupees  
      const reimbursed = await User.findByIdAndUpdate(ourUser._id, {
        $set: { totalEarnings: ourUser.totalEarnings + 10 },
      });

      if (reimbursed) {
        //If successfully reimbursed, sending a response
        ourUser = await User.findOne({ name: "A" });
        referredUser = await User.findById(req.params.id);

        res.status(201).json({ a: ourUser, b: referredUser });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
