import mongoose from 'mongoose';

// Function to set up MongoDB change stream
export async function notifications(req, res) {
  try {
    const db = mongoose.connection;
    let collectionName = ''; // Variable to store the collection name
    let changeType = ''; // Variable to store the change operation type
    let documentId = ''; // Variable to store the document ID
    let updatedFields = {}; // Variable to store the updated fields

    const collections = await db.db.listCollections().toArray(); // Fetch collections once

    collections.forEach(collection => {
      // Watch for changes in each collection
      const changeStream = db.collection(collection.name).watch();
      changeStream.on('change', async (change) => {
        // Update variables with change details
        collectionName = collection.name;
        changeType = change.operationType;
        documentId = change.documentKey ? change.documentKey._id.toString() : ''; // Convert ObjectId to string if document exists
        
        // Handle different types of changes
        switch (changeType) {
          case 'insert':
            console.log('New document inserted in collection:', collectionName);
            console.log('Document ID:', documentId);
            console.log('Add document:', change.fullDocument);
            break;
          case 'update':
            console.log('Document updated in collection:', collectionName);
            console.log('Document ID:', documentId);
            console.log('Full document before update:', await getDocumentBeforeUpdate(collectionName, documentId));
            console.log('Updated fields:', change.updateDescription.updatedFields);
            break;
          case 'delete':
            console.log('Document deleted in collection:', collectionName);
            console.log('Deleted document:', await getDeletedDocument(collectionName, documentId));
            console.log('Document ID:', documentId);
            break;
          default:
            console.log('Unsupported operation:', changeType);
        }
      });
    });

    console.log('MongoDB change stream setup complete');
    res.status(200).json({
      message: 'MongoDB change stream setup complete'
    });
  } catch (error) {
    console.error('Error setting up MongoDB change stream:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get the document before update
async function getDocumentBeforeUpdate(collectionName, documentId) {
  try {
    const db = mongoose.connection;
    return await db.collection(collectionName).findOne({ _id: new mongoose.Types.ObjectId(documentId) });
  } catch (error) {
    console.error('Error fetching document before update:', error);
    return null;
  }
}

// Function to get the deleted document
async function getDeletedDocument(collectionName, documentId) {
  try {
    const db = mongoose.connection;
    return await db.collection(collectionName).findOne({ _id: new mongoose.Types.ObjectId(documentId) });
  } catch (error) {
    console.error('Error fetching deleted document:', error);
    return null;
  }
}
