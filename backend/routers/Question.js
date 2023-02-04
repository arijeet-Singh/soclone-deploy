const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const QuestionDB = require("../models/Question");
router.post("/", async (req, res) => {
  const questionData = new QuestionDB({
    title: req.body.title,
    body: req.body.body,
    tags: req.body.tag,
    user: req.body.user,
  });
  await questionData
    .save()
    .then((doc) => {
      res.status(201).send({
        status: true,
        data: doc,
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: false,
        message: "Error Adding Question",
      });
    });
});

router.get("/:id", async (req, res) => {
  try {
    QuestionDB.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "answers",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                user: 1,
                answer: 1,
                // created_at: 1,
                question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "answerDetails",
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { question_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$question_id", "$$question_id"],
                },
              },
            },
            {
              $project: {
                _id: 1,
                question_id: 1,
                user: 1,
                comment: 1,
                // created_at: 1,
                // question_id: 1,
                created_at: 1,
              },
            },
          ],
          as: "comments",
        },
      },
      // {
      //   $unwind: {
      //     path: "$answerDetails",
      //     preserveNullAndEmptyArrays: true,
      //   },
      // },
      {
        $project: {
          __v: 0,
          // _id: "$_id",
          // answerDetails: { $first: "$answerDetails" },
        },
      },
    ])
      .exec()
      .then((questionDetails) => {
        res.status(200).send(questionDetails);
      })
      .catch((e) => {
        console.log("Error: ", e);
        res.status(400).send(error);
      });
  } catch (err) {
    res.status(400).send({
      message: "Question not found",
    });
  }
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving questions",
    error: "Bad request",
  };

  QuestionDB.aggregate([
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              comment: 1,
              created_at: 1,
              // question_id: 1,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              // answer: 1,
              // created_at: 1,
              // question_id: 1,
              // created_at: 1,
            },
          },
        ],
        as: "answerDetails",
      },
    },
    // {
    //   $unwind: {
    //     path: "$answerDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $project: {
        __v: 0,
        // _id: "$_id",
        // answerDetails: { $first: "$answerDetails" },
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
      res.status(200).send(questionDetails);
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(400).send(error);
    });
});

//like a post

router.put("/:id/upvote", async (req, res) => {
  try {
    const ques = await QuestionDB.findById(req.params.id);
    if (ques.downvote.includes(req.body.userId)) {
      await ques.updateOne({ $pull: { downvote: req.body.userId } });
      res.status(200).json("downvote removed");
    } else {
      if (!ques.upvote.includes(req.body.userId)) {
        await ques.updateOne({ $push: { upvote: req.body.userId } });
        res.status(200).json("the post has been upvoted");
      } else {
        res.status(403).json("upvote only once");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/downvote", async (req, res) => {
  try {
    const ques = await QuestionDB.findById(req.params.id);
    if (ques.upvote.includes(req.body.userId)) {
      await ques.updateOne({ $pull: { upvote: req.body.userId } });
      res.status(200).json("upvote removed");
    } else {
      if (!ques.downvote.includes(req.body.userId)) {
        await ques.updateOne({ $push: { downvote: req.body.userId } });
        res.status(200).json("the post has been downvoted");
      } else {
        res.status(403).json("downvote only once");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const ques = await QuestionDB.findById(req.params.id);
    await ques.deleteOne();
    res.status(200).json("the post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
