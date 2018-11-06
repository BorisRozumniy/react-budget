import React from 'react'
import Edit from './Edit'



const History = props => {
    const {
        transactions: tr,
        showBalance,
        isOpen,
        editingTransaction,
        categories,
        handlerEdit,
        handleSaveEditedTransaction,
        handlerCloseEdit,
        openEditItem,
        remove
    } = props

    const showList = tr.map((t, i, arr) => {
        const { date, name, sum, category: { name: nCat, isIncome } } = t
        const className = isIncome ? "income history-item" : "expense history-item"

        return <tr key={date + i} className={className}>
                <Edit
                    isOpen={isOpen === date}
                    editingTransaction={editingTransaction}
                    categories={categories}
                    handlerEdit={handlerEdit}
                    handleSaveEditedTransaction={handleSaveEditedTransaction}
                    handlerClose={handlerCloseEdit}
                />
                <td> <span className="name-of-transaction-item">{name}</span></td>
                <td> <span className="name-of-transaction-item">{sum}грн</span></td>
                <td> <span className="name-of-transaction-item">{nCat}</span></td>
                <td> <span className="name-of-transaction-item">{date}</span></td>
                <td>
                    <button onClick={openEditItem.bind(this, date)} >edit</button>
                    <button onClick={remove.bind(this, date, arr)}>remove</button>
                </td>
        </tr>
    })

    return (
        <div className="hist">
            <h2>History</h2>
            <h3>Balance: {showBalance()} grn</h3>
            <table className="history-table">
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Сумма</td>
                        <td>Категория</td>
                        <td>Время</td>
                        <td>Кнопки</td>
                    </tr>
                </thead>
                <tbody>
                    {showList}
                </tbody>
            </table>
        </div>
    )
}

export default History