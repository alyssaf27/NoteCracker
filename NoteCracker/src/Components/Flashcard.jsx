import { useState } from "react";
import '../App.css'

function FlashCard({ front, back }) {
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="cardContainer" onClick={flipCard}>
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <div className="cardFront">
                    <h2>{front}</h2>
                </div>
                <div className="cardBack">
                    <h2>{back}</h2>
                </div>
            </div>
        </div>
    );
}

export default FlashCard;