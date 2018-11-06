import React from 'react'

const SelectCategory = props => {
	
	const { categories, handlerEdit, category } = props
	return (
		<label htmlFor="to-select-the-category-of-the-transaction">
			<h3>Выбрать категорию</h3>
		

		<select
			id="to-select-the-category-of-the-transaction"
			name="editCategory"
			multiple={false}
			defaultValue={category.name || "без категории"}
			onChange={handlerEdit}
		>
			{categories.map(category =>
				<option key={category.name} >{category.name}</option>
			)}
		</select>
		</label>
	)

}

export default SelectCategory