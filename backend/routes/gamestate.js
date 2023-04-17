const express = require("express");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require('uuid');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/auth')

const User = require("../models/Gamestate");
const Gamestate = require("../models/Gamestate");

/**
 * @method - PUT
 * @param - /create
 * @description - Create new GameState
 */
router.put("/create", 
    [check("gamestate", "Please input a gamestate").not().isEmpty()],
    async (req, res) => {
        // Validates proper JSON input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        // Check if gameid not exists, create a new one
        const gamename = req.body.gamename;
        const gameid = uuidv4();
        // Serialize gameState
        const gameState = req.body.gameState;
        const serializedgame = JSON.stringify(gameState); // OK since no functions serialized
        try {
            let game = await Gamestate.findOne({
                gameid,
            });
            if (game) {
                return res.status(400).json({
                    message: "Game already exists",
                });
            }

            game = new Gamestate({
                gamename,
                serializedgame,
                gameid
            });
            await game.save();

            res.status(201).send("Gamestate created");

        } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in creating gamestate");
        }
    }
);

/**
 * @method - POST
 * @param - /update
 * @description - Update gamestate using its gameid
 */
router.post("/update", [], 
    async (req, res) => {

        const gamename = req.body.gamename;
        const gameid = req.body.gameid;
        const gameState = req.body.gameState;
        const serializedgame = JSON.stringify(gameState);

        try {
            const updatedGameState = {
                $set: {
                    gamename: gamename,
                    serializedgame: serializedgame,
                    gameid: gameid,
                }
            };
            const response = await Gamestate.updateOne(req.body.gameid, updatedGameState);
            res.json(response);

        } catch (err) {
            res.send({ message: "Error with updating gamestate"});
        }
    }
);

/**
 * @method - GET
 * @param - /get
 * @description - Fetch a gamestate from its gameid, returns gameState
 */
router.get("/get", [check("gameid").not().isEmpty()],
    async (req, res) => {

        // gameid is a URL parameter and not part of the JSON body
        const gameid = req.query.gameid;
        try {
            let game = await Gamestate.findOne({gameid});
            if (!game) {
                return res.status(400).json({ message: "Game does not exist"});
            }
            // Deserialize game into readable game for frontend
            const gameState = JSON.parse(game);
            // Send gameid and gameState
            res.status(200).json({
                gameState: gameState,
                gameid: gameid,
            });

        } catch {
            console.error(e);
            res.status(500).json({ message: "Server error"});
        }
    }
);

module.exports = router;