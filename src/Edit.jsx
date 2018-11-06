import React from 'react'
import SelectCategory from './SelectCategory'

const Edit = props => {
	const { 
		isOpen,
		editingTransaction: {
			name, sum, category
		},
		categories,
		handlerEdit,
		handleSaveEditedTransaction,
		handlerClose,
	} = props
	
	const content =
		<td className="popupWindow">
			<h2>Edit</h2>
			<input
				name="editName"
				type="text"
				defaultValue={name}
				onChange={handlerEdit}
			/>
			<input
				name="editSum"
				type="number"
				defaultValue={sum}
				onChange={handlerEdit}
			/>
			<SelectCategory
				categories={categories}
				handlerEdit={handlerEdit}
				category={category}
			/>
			<button className="save" onClick={handleSaveEditedTransaction}>Save</button>
			<input type="button" onClick={handlerClose.bind(this)} value="Close" />
			{props.children}
		</td >
	
	return isOpen ? content : null
}

export default Edit