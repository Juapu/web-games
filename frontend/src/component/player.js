import React from "react";
import "../stylesheets/Player.css";
import xIMG from '../images/x.png';
import oIMG from '../images/o.png';

function Player({xIsNext, player, side}) {
    let icon;
    let playerLabel;

    if (player == "X") {
        icon = xIMG; 
    } else {
        icon = oIMG;
    }

    if (xIsNext && player == "X") {
        playerLabel = "active-player"
    } else if (!xIsNext && player == "O") {
        playerLabel = "active-player"
    } else {
        playerLabel = "waiting-player"
    }

   
    return (
        <>
        <div className={side}>
            <div className={playerLabel}>
                <span>Player {player}</span>
            </div>
            <img src={icon}></img>
        </div>



        </>
    );
}

export default Player;
