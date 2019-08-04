const app = require('../index')
const syncDB = require('./sync-db')

syncDB().then(_=>{
    console.log('Sync DB!')
    app.listen(3000, () => {
        console.log('running on 3000 port..')
    })
})
