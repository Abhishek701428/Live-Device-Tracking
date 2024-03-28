import mongoose from 'mongoose';
// import {listenForDatabaseChanges} from '../modules/search/notification'
const connectToDatabase = async () => {
    try {
        const options: any = {  
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // strictQuery: false,
        };

        await mongoose.connect(process.env.DATABASE_URL, options);
        console.log('Connected to the database');
        // listenForDatabaseChanges();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

export default connectToDatabase;