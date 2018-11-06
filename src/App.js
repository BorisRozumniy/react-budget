import React, { Component } from 'react'
import Header from './Header'
import Transactions from './Transactions'
import History from './History'
import Categories from './Categories'
import CreateCategory from './CreateCategory'
import './style.css';

class App extends Component {
  state = {
    categories: [
      {
        isIncome: false,
        name: "without name"
      },
      {
        isIncome: false,
        name: "food"
      },
      {
        isIncome: true,
        name: "scholarship"
      },
      {
        isIncome: true,
        name: "salary"
      },
      {
        isIncome: false,
        name: "travel"
      },
    ],
    transactions: [
      {
        category: {
          isIncome: false,
          name: "travel"
        },
        date: "11.09.2018, 13:07:23",
        name: "fare",
        sum: "5"
      },
      {
        category: {
          isIncome: true,
          name: "salary"
        },
        date: "11.09.2018, 13:07:25",
        name: "advance",
        sum: "505"
      },
    ],
    editingTransaction: {
      name: '',
      sum: 0,
      category: {
        isIncome: false,
        name: "without name"
      },
      date: ''
    },

    editName: 'без имени',
    editSum: 0,
    editCategory: {
      isIncome: false,
      name: "without name"
    },

    newCategoryName: '',
    isIncome: false,
  }


  
  /////CreateCategory////

  handlerCreateCategory = e => {
    const { name, value } = e.target
    
    if (name === 'newCategoryName') {
      this.setState({ newCategoryName: value})
    }
    else {
      this.setState({ isIncome: !this.state.isIncome})
    }
  }

  handleSaveCategory = e => {
    const { categories, newCategoryName, isIncome } = this.state
    const oldCat = categories
    const category = {
      name: newCategoryName,
      isIncome: isIncome
    }
    oldCat.push(category)
    this.setState({ 
      categories: oldCat,
      newCategoryName: '',
      // isIncome: false
    })
    e.target.children[1].value = ''
    console.dir(e.target.children[2])
    e.preventDefault();
  }

  /////Transactions/////

  addTransaction = e => {
    const { editName, editSum, editCategory, /* categories, selectedCategory: s, */ transactions } = this.state
    e.preventDefault()

    let transaction = {
      sum: editSum,
      name: editName,
      category: editCategory,
      date: new Date().toLocaleString()
    }

    let oldCategories = transactions
    oldCategories.push(transaction)
    this.setState({ transactions: oldCategories })
  }

  /////History/////

  showBalance = () => {
    const { transactions: tr } = this.state
    if (tr.length > 0) {
      let allSumArey = tr.map(t =>
        t.category.isIncome ? t.sum : -t.sum
      )
      let added = allSumArey.reduce((a, b) => a * 1 + b * 1)
      return added
    } else {
      return 0
    }
  }

  openEditItem = id => {
    this.state.transactions.map(tn => {
      return (tn.date === id) && this.setState({ 
        editingTransaction: tn,
        editCategory: tn.category,
        editName: tn.name,
        editSum: tn.sum
      })
    })
  }

  remove = (curent, arr) => {
    const {transactions, categories} = this.state
    let index
    let isTransactions = arr.every(a=>a.category) ? transactions : categories
    isTransactions.map((el,i) => {
      if (el.date === curent) {

        return index = i
      }
      if (el.name === curent)
      return index = i
      return false
    })
    let copy = isTransactions.slice()
    copy.splice(index, 1)
    if (isTransactions[index].category) {
      this.setState({transactions: copy})
    } else {

      this.setState({categories: copy})
    }

  }

  
  /////Edit/////
  /////EditTransaction///////


  handlerEdit = e => {
    const name = e.target.name
    const value = e.target.value

    const { categories } = this.state
    let index
    categories.forEach((cat, i) => {
      if (cat.name === e.target.value)
        index = i
    })
    if (name === 'editCategory') {
      this.setState({ [name]: categories[index] })
    } else {
      this.setState({[name]: value})
    }

  }
  
  handleSaveEditedTransaction = e => {
    const { transactions, editingTransaction, editName, editSum, editCategory} = this.state
    let editing = editingTransaction
        this.setState({
          editingTransaction: {
            name: editName,
            sum: editSum,
            category: editCategory,
            date: editing.date,
          }
        })

    const oldTs = transactions
    
    let index
    transactions.map((tn, i) => {
      if (tn.date === editing.date)
      return index = i
      return false
    })
    
    oldTs[index] = {
      name: editName,
      sum: editSum,
      category: editCategory,
      date: editing.date,
    }
    
        
    this.setState({
      transactions: oldTs,

      editName: 'без имени',
      editSum: 0,
      editCategory: {
        isIncome: false,
        name: "without name"
      },
    })
    
  }
  
  handlerCloseEdit = (e) => {
    let copy = this.state.editingTransaction
    copy = {
      name: '',
      sum: 0,
      category: {
        isIncome: false,
        name: "without name"
      },
      date: ''
    }
    this.setState({
      editingTransaction: copy,
      editName: 'без имени',
      editSum: 0,
      editCategory: {
        isIncome: false,
        name: "without name"
      },
     })
  }

  
  
  
  componentWillMount = () => {
    if (localStorage.getItem('budget')) {
      const storage  = JSON.parse(localStorage.getItem('budget'))
      this.setState({
      categories: storage.categories,
      transactions: storage.transactions
      })
      console.log("'if' block.", "storage:", storage.categories )
    
      } else {
      console.log("'else' block")
      const data = {
        transactions: this.state.categories,
        categories: this.state.transactions
      }
      const str = JSON.stringify(data)
      localStorage.setItem('budget', str)
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    
    const data = {
      categories: nextState.categories,
      transactions: nextState.transactions
    }
    console.log('will update', "nextState:", data, "this.state:", this.state.categories, this.state.transactions)
    const str = JSON.stringify(data)
    localStorage.setItem('budget', str)
  }
  
  
  render() {
    const { categories, transactions, editingTransaction, isIncome } = this.state
    
    return (
      <div className="main">
        <Header/>
        <Transactions
            defaultTrans={editingTransaction}
            handler={this.handlerEdit}
          save={this.addTransaction}
          categories={categories}
        />
        <Categories
          categories={categories}
          remove={this.remove}
        />
        <CreateCategory
          handler={this.handlerCreateCategory}
          isIncome={isIncome}
          save={this.handleSaveCategory}
        />
        <History 
          categories={categories}
          transactions={transactions}
          showBalance={this.showBalance}
          handleSaveEditedTransaction={this.handleSaveEditedTransaction}
          openEditItem={this.openEditItem}
          isOpen={editingTransaction.date}
          editingTransaction={editingTransaction}
          handlerCloseEdit={this.handlerCloseEdit}
          handlerEdit={this.handlerEdit}
          remove={this.remove}
        />
      </div>
    )
  }

}

export default App;



