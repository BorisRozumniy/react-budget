import React from 'react'
// import storage from './Test'

class Categories extends React.Component {

    // componentDidUpdate() {
    //     console.log("updated", this.props.categories)
    //     storage.categories = this.props.categories
    // }

    // componentWillReceiveProps(next) {
    //     console.log(next)
    // }

    // componentWiillUpdate()

    render () {
        const { categories: c, remove } = this.props 
        return (
            <div className="cate">
            <h2>Categories</h2>
            <ul>{
                        c.map((el, i, arr) => {
                            return el.isIncome
                            ? 
                            <li key={i} className="income">
                                {el.name}
                                <button onClick={remove.bind(this, el.name, arr)}>remove</button>
                            </li>
                            :
                            <li key={i} className="expense">
                                {el.name}
                                <button onClick={remove.bind(this, el.name, arr)}>remove</button>
                            </li>
                        })
                    }</ul>
                </div>
            )
        }
    }

export default Categories