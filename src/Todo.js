import React, { useState } from 'react'
import './Todo.css'

const Todo = () => {

    const [boards, setBoards] = useState([
        {
            id: 1, title: 'to do', items: [
                { id: 1, title: 'go to store' },
                { id: 2, title: 'throw out the trash' },
                { id: 3, title: 'walk the dog' }
            ]
        },
        {
            id: 2, title: 'to check', items: [
                { id: 4, title: 'linkedin' },
                { id: 5, title: 'github' },
                { id: 6, title: 'gmail message' }
            ]
        },
        {
            id: 3, title: 'done', items: [
                { id: 7, title: 'go to pharmacy' },
                { id: 8, title: 'clean the room' },
                { id: 9, title: 'wash the dishes' }
            ]
        }
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    const dragStartHandler = (e, item, board) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }
    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }
    const dropHandler = (e, item, board) => {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1) // delete from current board
        const dropIndex = board.items.indexOf(item) // индекс элемента над которым мы держим карточку
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }


    return (
        <div className='app'>
            {boards.map(board =>
                <div className='board'>
                    <div className='board__title'>{board.title}</div>
                    {board.items.map(item =>
                        <div
                            onDragStart={(e) => dragStartHandler(e, item, board)} //срабатывает в тот момент когда мы взяли карточку
                            onDragLeave={(e) => dragLeaveHandler(e)} // срабатывает если мы вышли за пределы другой карточки
                            onDragEnd={(e) => dragEndHandler(e)} //если мы отпустили карточку
                            onDragOver={(e) => dragOverHandler(e)} // если мы находимя над другим объектом
                            onDrop={(e) => dropHandler(e, item, board)} // если мы отпустили карточку 
                            draggable
                            className='item'>{item.title}</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Todo