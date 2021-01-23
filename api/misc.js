import firebase from 'firebase/app'
import {db} from './auth'

const screens = ['Home', 'Dashboard', 'Expenses', 'Income', 'Goals', 'Log Out']
const dashScreens = ['Expenses', 'Income', 'Goals']

// const userId = firebase.auth().currentUser.uid
// const expenseRef = db.collection(`users/${userId}/expenses`)

const expensesEffect = async (userId) => {
    // const userId = firebase.auth().currentUser.uid
    const expenseRef = db.collection(`users/${userId}/expenses`)

     await expenseRef.onSnapshot((querySnapshot) => {
        const expenseList = []
        querySnapshot.forEach(doc => {
            const {category, name, amount, recurring} = doc.data()
            expenseList.push({
                expenseId: doc.id,
                category,
                name,   
                amount,
                recurring
            })
        })
    })
    return expenseList
}

 export {screens, dashScreens, expensesEffect}