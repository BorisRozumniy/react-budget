import React from 'react'

const CreateCategory = props => {
    const { handler, isIncome, save } = props
    const incomeOrExpense = isIncome ? "Income" : "Expense"
    return (
        <form className="create" onSubmit={save}>
            <h2>CreateCategory</h2>
            
            <input
                name="newCategoryName"
                type="text" 
                placeholder="name"
                onChange={handler}
                />
            
            <input
                name="isIncome"
                type="checkbox"
                onChange={handler}
            />
            
            <div>{incomeOrExpense}</div>
            
            <button className="save">Save</button>
        </form>
    )
}

export default CreateCategory