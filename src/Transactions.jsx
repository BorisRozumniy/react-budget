import React from 'react'
import SelectCategory from './SelectCategory'

const Transactions = props => {
    const { categories, defaultTrans: { name, sum, category }, handler, save} = props
    return (
        <form className="trans" onSubmit={save}>
            <h2>Добавить транзакцию</h2>
            <label htmlFor="new-trans-name">
                <h3>Название транзакции</h3>
            </label>
            <input
                id="new-trans-name"
                name="editName"
                type="text" 
                placeholder="transaction name"
                defaultValue={name}
                onChange={handler} 
            />

            <label htmlFor="new-trans-sum">
                <h3>Сумма транзакции</h3>
            </label>
            <input
                id="new-trans-sum"
                name="editSum"
                type="number"
                placeholder="sum"
                defaultValue={sum}
                onChange={handler}
            />
            
            <SelectCategory
                categories={categories}
                handlerEdit={handler}
                category={category}
            />
            <button className="save">Save</button>
        </form>
    )
}

export default Transactions