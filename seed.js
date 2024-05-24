const mongoose = require('mongoose')
require('dotenv').config();

const Status = require('./models/status.js')

async function seed() {
    console.log('seed has begun')

    mongoose.connect(process.env.MONGODB_URI)
    console.log('connection successful')

    const comment = await Status.create({
        story: 'Today i had an amazing day',
        
    })

    console.log(comment);
    
    mongoose.disconnect()
    
}

seed()