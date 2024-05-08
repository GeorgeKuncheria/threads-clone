import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';

const  initializeRoutes = (app) => {
    app.use('/api/users',userRoutes);
    app.use('/api/posts',postRoutes);
}

export default initializeRoutes;