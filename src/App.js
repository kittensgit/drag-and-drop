import { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: 'card 3' },
    { id: 2, order: 1, text: 'card 1' },
    { id: 3, order: 2, text: 'card 2' },
    { id: 4, order: 4, text: 'card 4' }
  ])

  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (e, card) => {
    setCurrentCard(card)
  }
  const dragEndHandler = (e) => {
    e.target.style.background = 'white'
  }
  const dragOverHandler = (e) => {
    e.preventDefault()
    e.target.style.background = 'lightgray'
  }
  const dropHandler = (e, card) => {
    e.preventDefault()
    setCardList(cardList.map((c) => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      if (c.id === card.id) {
        return { ...c, order: card.order }
      }
      return c;
    }))
    e.target.style.background = 'white'
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="app">
      {cardList.sort(sortCards).map(card =>
        <div
          onDragStart={(e) => dragStartHandler(e, card)} //срабатывает в тот момент когда мы взяли карточку
          onDragLeave={(e) => dragEndHandler(e)} // срабатывает если мы вышли за пределы другой карточки
          onDragEnd={(e) => dragEndHandler(e)} //если мы отпустили карточку
          onDragOver={(e) => dragOverHandler(e)} // если мы находимя над другим объектом
          onDrop={(e) => dropHandler(e, card)} // если мы отпустили карточку 
          draggable
          className='card'>
          {card.text}
        </div>
      )}
    </div>
  );
}

export default App;
