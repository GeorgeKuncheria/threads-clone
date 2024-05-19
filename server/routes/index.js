import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import messageRoutes from './messageRoutes.js'

const  initializeRoutes = (app) => {
    app.use('/api/users',userRoutes);
    app.use('/api/posts',postRoutes);
    app.use('/api/messages',messageRoutes)
}

export default initializeRoutes;