import { useState } from "react";
import FlashCard from "./Flashcard";

function FlashCardDeck({ cards }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function nextCard() {//what the buttons will do when clicked
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    }

    function prevCard() {//what the buttons will do when clicked
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }

    if (!cards || cards.length === 0) {
        return <p id="Status">No flashcards yet. Generate some!</p>;
    }

    return (
        <div className="deckContainer">
            <p className="cardCounter">{currentIndex + 1} / {cards.length}</p>
            
            <FlashCard
                key={currentIndex}
                front={cards[currentIndex].front}
                back={cards[currentIndex].back}
            />

            <div className="deckButtons">
                <button onClick={prevCard} disabled={cards.length <= 1}>← Prev</button>
                <button onClick={nextCard} disabled={cards.length <= 1}>Next →</button>
            </div>
        </div>
    );
}

export default FlashCardDeck;